#!/bin/bash

# Linking the project
ln -s /vagrant /home/vagrant/datashield

apt-get -y update
apt-get -y install curl git-core python-software-properties software-properties-common

# Installation configuration
PROJECT_NAME=datashield
VIRTUALENV_NAME=$PROJECT_NAME
PROJECT_DIR=/home/vagrant/$PROJECT_NAME
DJANGO_DIR=$PROJECT_DIR/$PROJECT_NAME
# End of Installation configuration
PGSQL_VERSION='9.3'

# Script to set up a Django project on Vagrant.
if [ -z "$DB_NAME" ]; then 
    echo "DJANGO_SETTINGS_MODULE=datashield.datashield.settings" >> /etc/environment
    echo "DB_NAME='datashield'" >> /etc/environment
    echo "DB_USER_NAME='datagurdian'" >> /etc/environment
    echo "DB_HOST=localhost" >> /etc/environment
    echo "DB_PASSWORD='123456'" >> /etc/environment
    echo "DB_PORT=5432" >> /etc/environment
    echo "SECRET_KEY='s1kwb!&oy3l3(nzl&_=g7cd9-6yj&w*#jblh@*(dgo#x1j#r%d]'" >> /etc/environment
    echo "DJANGO_TEMPLATE_DEBUG='true'" >> /etc/environment
    echo "DJANGO_DEBUG='true'" >> /etc/environment
    echo 'sysctl vm.overcommit_memory=1' >> /etc/sysctl.conf
    echo "PROJECT_PATH=$PROJECT_DIR" >> /etc/environment
fi 
source /etc/environment

chown vagrant:vagrant /home/vagrant -R

# Need to fix locale so that Postgres creates databases in UTF-8
locale-gen en_GB.UTF-8
dpkg-reconfigure locales

export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

apt-get -y install curl

# Adding all apt-get urls before updating
# Nodejs
curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
# Java 8
# add-apt-repository -y ppa:webupd8team/java

# Install essential packages from Apt
apt-get -y update
sleep 20

# Git (we'd rather avoid people keeping credentials for git commits in the repo,
# but sometimes we need it for pip requirements that aren't in PyPI)
apt-get install -y git

# Git (we'd rather avoid people keeping credentials for git commits in the repo,
# but sometimes we need it for pip requirements that aren't in PyPI)
sudo apt-get remove apache2-mpm-prefork
sudo apt-get remove apache2-mpm-worker
sudo apt-get remove apache2
apt-get -y install git
sudo add-apt-repository ppa:nginx/stable
sudo apt-get -y update
sudo apt-get -y install nginx
sudo service start nginx

# Python dev packages
# Dependencies for image processing with Pillow (drop-in replacement for PIL)
# supporting: jpeg, tiff, png, freetype, littlecms
# (pip install pillow to get pillow itself, it is not in requirements.txt)
apt-get -y install libpq-dev libjpeg-dev libpng12-dev libfreetype6-dev python \
zlib1g-dev liblcms2-dev libxml2-dev libxslt-dev redis-server memcached \
build-essential libssl-dev libffi-dev python-dev

sed -i 's/bind.*127.0.0.1/bind 0.0.0.0/g' /etc/redis/redis.conf
service redis-server restart

# Installing Java 8
# Set Agreement = True, Seen = True
#echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections
#echo debconf shared/accepted-oracle-license-v1-1 seen true | debconf-set-selections
#apt-get -y install oracle-java8-installer

# python-setuptools being installed manually
which easy_install || wget https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py -O - | python

# Postgresql
# Visit https://wiki.postgresql.org/wiki/PostgreSQL_For_Development_With_Vagrant
add-apt-repository ppa:pitti/postgresql
apt-get -y update
apt-get -y install postgresql-$PGSQL_VERSION libpq-dev
cp $PROJECT_DIR/setup/pg_hba.conf /etc/postgresql/$PGSQL_VERSION/main/
cp $PROJECT_DIR/setup/postgresql.conf /etc/postgresql/$PGSQL_VERSION/main/
/etc/init.d/postgresql reload

# Enable nginx to load files
chown :www-data $PROJECT_DIR -R

# copy nginx configuration
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak2
cp $PROJECT_DIR/setup/nginx.conf /etc/nginx/nginx.conf
nginx -s reload

# Dev tools
apt-get -y install ipython tmux python-sphinx nmap

# virtualenv global setup
which pip || easy_install -U pip

# bash environment global setup
source /home/vagrant/.bashrc
if [ -z $WORKON_HOME ]; then
    echo 'export PIP_DOWNLOAD_CACHE=$HOME/.pip_download_cache' >> /home/vagrant/.bashrc
    su - vagrant -c "source /home/vagrant/.bashrc"
    su - vagrant -c "mkdir -p /home/vagrant/.pip_download_cache"
fi

# Node.js, CoffeeScript and LESS
add-apt-repository ppa:chris-lea/node.js
apt-get -y update
apt-get -y install nodejs
npm install -g bower grunt-cli pm2

# postgresql setup for project
# createuser -w $DB_USER_NAME 
psql -Upostgres -c "CREATE USER $DB_USER_NAME WITH PASSWORD '$DB_PASSWORD';"
psql -Upostgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER_NAME";
# For Unit Testing we should allow him to create DB
psql -Upostgres -c "ALTER USER $DB_USER_NAME CREATEDB;"
psql -Upostgres -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME to $DB_USER_NAME;"


pip install -r $PROJECT_DIR/requirements.txt

# Install celery executable
pip install celery

# Set execute permissions on manage.py, as they get lost if we build from a zip file
chmod a+x $DJANGO_DIR/manage.py

# Set no interactive for bower
su - vagrant -c "echo '{ \"interactive\": false }' > ~/.bowerrc"
echo '{ \"interactive\": false }' > ~/.bowerrc

# Django project setup
cd $PROJECT_DIR
DJANGO_SETTINGS_MODULE=datashield.settings $DJANGO_DIR/manage.py makemigrations
DJANGO_SETTINGS_MODULE=datashield.settings $DJANGO_DIR/manage.py migrate
cd -

function piper() {
    # Run servers PM2
    # source $WORKON_HOME/$VIRTUALENV_NAME/bin/activate && \
    # cd $PROJECT_DIR && $@"
    cd $PROJECT_DIR && $@
}

# Run servers PM2
piper "node run.js"
# FIXME its not working properly
env PATH=$PATH:/usr/local/bin:/usr/bin pm2 startup ubuntu -u vagrant
chmod +x /etc/init.d/pm2-init.sh && update-rc.d pm2-init.sh defaults
sed -i 's:/root/.pm2:/home/vagrant/.pm2:g' /etc/init.d/pm2-init.sh
mkdir -p /home/vagrant/.pm2
chown vagrant:vagrant /home/vagrant/.pm2 -R
piper "pm2 save"

service nginx stop
service nginx start
