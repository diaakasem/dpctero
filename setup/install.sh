#!/bin/bash

# Script to set up a Django project on Vagrant.

if [ -z "$DB_NAME" ]; then 
    echo "DJANGO_SETTINGS_MODULE='datasheild.settings' " >> /etc/environment
    echo "DB_NAME='datasheild'" >> /etc/environment
    echo "DB_USERNAME='datagurdian'" >> /etc/environment
    echo "DB_PASSWORD='123456'" >> /etc/environment
fi 
source /etc/environment

# Installation configuration
PROJECT_NAME=datasheild
VIRTUALENV_NAME=$PROJECT_NAME
PROJECT_DIR=/home/vagrant/$PROJECT_NAME
DJANGO_DIR=/home/vagrant/$PROJECT_NAME/datasheild
VIRTUALENV_DIR=/home/vagrant/.virtualenvs/$PROJECT_NAME
# End of Installation configuration
PGSQL_VERSION='9.3'

# Need to fix locale so that Postgres creates databases in UTF-8
locale-gen en_GB.UTF-8
dpkg-reconfigure locales

export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# Install essential packages from Apt
apt-get update -y
# Git (we'd rather avoid people keeping credentials for git commits in the repo,
# but sometimes we need it for pip requirements that aren't in PyPI)
apt-get install -y git

# Python dev packages
# Dependencies for image processing with Pillow (drop-in replacement for PIL)
# supporting: jpeg, tiff, png, freetype, littlecms
# (pip install pillow to get pillow itself, it is not in requirements.txt)
apt-get install libffi-dev python-dev libpq-dev libjpeg-dev libpng12-dev \
libfreetype6-dev libssl-dev build-essential python zlib1g-dev liblcms2-dev \
nginx -y
# python-setuptools being installed manually
wget https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py -O - | python

# Postgresql
apt-get install -y postgresql-$PGSQL_VERSION libpq-dev
cp $PROJECT_DIR/setup/pg_hba.conf /etc/postgresql/$PGSQL_VERSION/main/
/etc/init.d/postgresql reload

# copy nginx configuration
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak2
cp $PROJECT_DIR/setup/nginx.conf /etc/nginx/nginx.conf
nginx -s reload

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

su - vagrant "cd $PROJECT_DIR && bower install && npm install"

# Dev tools
apt-get install -y ipython tmux

# virtualenv global setup
if ! command -v pip; then
    easy_install -U pip
fi

if [[ ! -f /usr/local/bin/virtualenv ]]; then
    pip install virtualenv virtualenvwrapper stevedore virtualenv-clone
fi

# bash environment global setup
if [ -z $WORKON_HOME ]; then
    echo 'export WORKON_HOME=$HOME/.virtualenvs' >> /home/vagrant/.bashrc
    echo 'export PIP_DOWNLOAD_CACHE=$HOME/.pip_download_cache' >> /home/vagrant/.bashrc
    echo 'source /usr/local/bin/virtualenvwrapper.sh' >> /home/vagrant/.bashrc
    echo "workon $VIRTUALENV_NAME" >> /home/vagrant/.bashrc
    su - vagrant -c "mkdir -p /home/vagrant/.pip_download_cache"
fi

# Node.js, CoffeeScript and LESS
npm install -g coffee-script less

# ---

# postgresql setup for project
createuser -dlrs -Upostgres datasheild
psql -Upostgres -c "CREATE USER $DB_USERNAME WITH PASSWORD '$DB_PASSWORD';"
createdb -U$DB_USERNAME $DB_NAME

# virtualenv setup for project
su - vagrant -c "/usr/local/bin/virtualenv $VIRTUALENV_DIR && \
    echo $PROJECT_DIR > $VIRTUALENV_DIR/.project && \
    $VIRTUALENV_DIR/bin/pip install -r $PROJECT_DIR/requirements.txt"

# Set execute permissions on manage.py, as they get lost if we build from a zip file
chmod a+x $DJANGO_DIR/manage.py

# Django project setup
su - vagrant -c "source $VIRTUALENV_DIR/bin/activate && \
    cd $DJANGO_DIR && \
    ./manage.py makemigrations && \
    ./manage.py migrate && \
    node run.js"
