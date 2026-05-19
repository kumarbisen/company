hosted on: https://company-va2k.vercel.app/
n8n deploy :- 

mkdir -p ~/.ssh
cp /mnt/c/Users/viv96/Downloads/azurekey/n8n_key.pem ~/.ssh/
chmod 400 ~/.ssh/n8n_key.pem
ssh -i ~/.ssh/n8n_key.pem azureuser@57.159.31.234



# Update package lists
sudo apt update && sudo apt upgrade -y

# Install Docker dependencies
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker’s official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Set up the stable repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine and Docker Compose plugin
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start and enable Docker service
sudo systemctl enable --now docker

# Check if docker is working (should print version)
docker compose version


2. configure azure firewall and add port 80 and port 443

3.mkdir ~/n8n-docker && cd ~/n8n-docker

4. nano .env
5.# The domain or subdomain you want to use (e.g., n8n.yourdomain.com or an Azure public IP/DNS)
DOMAIN_NAME=n8n.bisenx.in

# The email address used for SSL registration warnings
SSL_EMAIL=your-email@example.com

# Timezone for your workflows
GENERIC_TIMEZONE=Asia/Kolkata

6.nano docker-compose.yml


7.version: '3.8'

volumes:
  caddy_data:
  caddy_config:
  n8n_data:

services:
  caddy:
    image: caddy:latest
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - caddy_data:/data
      - caddy_config:/config
    environment:
      - DOMAIN_NAME=${DOMAIN_NAME}
    command: caddy reverse-proxy --from ${DOMAIN_NAME} --to n8n:5678

  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    restart: unless-stopped
    ports:
      - "127.0.0.1:5678:5678"
    volumes:
      - n8n_data:/home/node/.n8n
    environment:
      - N8N_HOST=${DOMAIN_NAME}
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - NODE_ENV=production
      - WEBHOOK_URL=https://${DOMAIN_NAME}/
      - GENERIC_TIMEZONE=${GENERIC_TIMEZONE}

      for exit :- ctrl + o ,enter, ctrl +x


      8.sudo docker compose up -d

      9.sudo docker compose ps

      10. sudo docker compose logs -f n8n



      Step 6: Point Your Domain to Azure (If not done already)
Go to your DNS provider (where you manage your domain like bisenx.in):

Create an A Record (e.g., n8n.bisenx.in or @).

Point the value to your Azure VM Public IP address (57.159.31.234).

Once the DNS propagates, Caddy will automatically talk to Let's Encrypt, issue an SSL certificate, and secure your site.

Open your browser and head over to [https://n8n.yourdomain.com](https://n8n.yourdomain.com). You'll be greeted by the n8n setup wizard to create your admin account and start building workflows!