#!/bin/bash

# Install git
sudo apt-get install git

# Install nodejs
sudo apt-get update -y
sudo apt-get install build-essential libssl-dev curl -y
sudo apt-get install software-properties-common python-software-properties -y
echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
sudo apt-add-repository ppa:chris-lea/node.js
sudo apt-get update -y
sudo apt-get install nodejs -y
sudo apt-get install npm -y
sudo apt-get autoremove


# install nginx
sudo apt-get install nginx -y
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak2
sudo cp /home/vagrant/datashield/setup/nginx.conf /etc/nginx/nginx.conf
sudo service nginx restart

