$ErrorActionPreference = "Continue"

if (Test-Path "aws_summary.txt") {
    Write-Host "Step 1: aws_summary.txt already exists. Reusing existing AWS infrastructure..."
} else {
    Write-Host "Step 1: Running setup_aws.ps1 to provision AWS infrastructure..."
    $oldErrorPreference = $ErrorActionPreference
    $ErrorActionPreference = "Stop"
    .\setup_aws.ps1
    $ErrorActionPreference = $oldErrorPreference
}

if (-not (Test-Path "aws_summary.txt")) {
    Write-Error "aws_summary.txt was not created. Setup failed."
    exit 1
}

Write-Host "Step 2: Parsing aws_summary.txt for details..."
$summary = Get-Content aws_summary.txt -Raw

$s3BucketName = ""
$s3WebsiteUrl = ""
$publicIp = ""
$pemFile = ""

if ($summary -match "S3 Bucket Name:\s+(\S+)") {
    $s3BucketName = $Matches[1]
}
if ($summary -match "S3 Bucket URL:\s+(\S+)") {
    $s3WebsiteUrl = $Matches[1]
}
if ($summary -match "Public IP:\s+(\S+)") {
    $publicIp = $Matches[1]
}
if ($summary -match "ssh -i (\S+) ubuntu") {
    $pemFile = $Matches[1]
}

if (-not $s3BucketName -or -not $s3WebsiteUrl -or -not $publicIp -or -not $pemFile) {
    Write-Error "Failed to parse required parameters from aws_summary.txt."
    exit 1
}

Write-Host "S3 Bucket Name: $s3BucketName"
Write-Host "S3 Website URL: $s3WebsiteUrl"
Write-Host "EC2 Public IP:  $publicIp"
Write-Host "PEM Private Key: $pemFile"

Write-Host "Step 3: Restricting permissions on private key $pemFile for Windows OpenSSH..."
# Reset permissions to writeable first so we can modify it if we are re-running
if (Test-Path $pemFile) {
    icacls.exe $pemFile /reset
}
# Re-encode PEM file to ASCII to satisfy OpenSSH format requirements
$pemContent = Get-Content $pemFile
$pemContent | Set-Content $pemFile -Encoding ascii

icacls.exe $pemFile /inheritance:r
icacls.exe $pemFile /grant:r "$($env:USERNAME):(R)"

Write-Host "Step 4: Updating server/.env ALLOWED_ORIGINS to point to S3 Website URL..."
if (-not (Test-Path "server/.env")) {
    Write-Error "server/.env file is missing."
    exit 1
}
$envContent = Get-Content "server/.env"
$newEnv = @()
$foundAllowedOrigins = $false
foreach ($line in $envContent) {
    if ($line -like "ALLOWED_ORIGINS=*") {
        $newEnv += "ALLOWED_ORIGINS=$s3WebsiteUrl"
        $foundAllowedOrigins = $true
    } else {
        $newEnv += $line
    }
}
if (-not $foundAllowedOrigins) {
    $newEnv += "ALLOWED_ORIGINS=$s3WebsiteUrl"
}
$newEnv | Set-Content "server/.env"

Write-Host "Step 5: Packaging server source code into a tar.gz archive..."
if (Test-Path "server.tar.gz") {
    Remove-Item "server.tar.gz" -Force
}
tar -czf server.tar.gz -C server src package.json package-lock.json tsconfig.json .env

Write-Host "Step 6: Waiting for EC2 user-data installation (PM2) to complete..."
$installed = $false
for ($i = 1; $i -le 15; $i++) {
    Write-Host "Testing SSH connection & checking PM2 presence (attempt $i/15)..."
    $pm2Check = ssh -i $pemFile -o StrictHostKeyChecking=no -o LogLevel=ERROR -o ConnectTimeout=10 ubuntu@$publicIp "which pm2"
    if ($LASTEXITCODE -eq 0 -and $pm2Check -like "*pm2*") {
        $installed = $true
        Write-Host "PM2 is installed and ready on EC2!"
        break
    }
    Start-Sleep -Seconds 15
}

if (-not $installed) {
    Write-Error "PM2 installation on EC2 timed out. The server might still be initializing."
    exit 1
}

Write-Host "Step 7: Copying server archive to EC2 instance..."
scp -i $pemFile -o StrictHostKeyChecking=no -o LogLevel=ERROR server.tar.gz "ubuntu@${publicIp}:/home/ubuntu/"
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to copy server archive to EC2."
    exit 1
}

Write-Host "Step 8: Extracting server and running npm install & build on EC2..."
ssh -i $pemFile -o StrictHostKeyChecking=no -o LogLevel=ERROR ubuntu@$publicIp @"
  mkdir -p ~/server
  tar -xzf ~/server.tar.gz -C ~/server
  cd ~/server
  npm install
  npm run build
  pm2 delete kunalconnects-server 2>/dev/null || true
  pm2 start dist/src/index.js --name 'kunalconnects-server'
  pm2 save
"@
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to set up and run server on EC2."
    exit 1
}

Write-Host "Step 9: Building client locally pointing to EC2 IP: http://${publicIp}:4000..."
# Set env variable for the vite build process
$oldEnvApi = $env:VITE_API_BASE_URL
$env:VITE_API_BASE_URL = "http://${publicIp}:4000"

cd client
npm install
npm run build
cd ..

# Restore old env just in case
$env:VITE_API_BASE_URL = $oldEnvApi

Write-Host "Step 10: Uploading client assets to S3..."
aws s3 sync client/dist s3://$s3BucketName --delete

Write-Host "`n======================================================="
Write-Host "DEPLOYMENT COMPLETE!"
Write-Host "Client URL (S3 Website): $s3WebsiteUrl"
Write-Host "Server Health Check:     http://${publicIp}:4000/health"
Write-Host "======================================================="
