#!/bin/bash
set -e

echo "Installing Certbot and Nginx plugin..."
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

echo "Requesting SSL certificate from Let's Encrypt..."
sudo certbot --nginx -d api.kunalconnects.com --non-interactive --agree-tos --register-unsafely-without-email

echo "Testing Nginx configuration and restarting..."
sudo nginx -t
sudo systemctl restart nginx

echo "SSL installation complete for api.kunalconnects.com!"
