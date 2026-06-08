#!/bin/bash
set -e

echo "Installing Nginx..."
sudo apt-get update
sudo apt-get install -y nginx

echo "Creating Nginx configuration for api.kunalconnects.com..."
cat << 'EOF' | sudo tee /etc/nginx/sites-available/kunalconnects > /dev/null
server {
    listen 80;
    server_name api.kunalconnects.com;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

echo "Enabling site and restarting Nginx..."
sudo ln -sf /etc/nginx/sites-available/kunalconnects /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default || true

sudo nginx -t
sudo systemctl restart nginx

echo "Nginx reverse proxy setup complete!"
