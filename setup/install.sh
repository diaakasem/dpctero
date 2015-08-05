#!/bin/bash

# Install git
sudo apt-get install git

# Install nodejs
sudo apt-get update -y
sudo apt-get install build-essential libssl-dev curl -y
sudo apt-get install software-properties-common python-software-properties -y
echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
sudo apt-get update -y
sudo apt-get install nodejs -y
sudo apt-get autoremove


# install nginx
sudo apt-get install nginx -y
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak2
sudo cp /home/vagrant/datashield/setup/nginx.conf /etc/nginx/nginx.conf
sudo service nginx restart

