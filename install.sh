#!/bin/bash

echo -n "Hello, I will create a vitual host in your apache server with your desired name [yourdomain.dev]"
read ans
if [ ! -z "$ans" ]; then
    echo "please wait while we create $ans and enter your password if prompted"
    sudo mkdir -p /var/www/$ans/public_html
    sudo chown -R $USER:$USER /var/www/$ans/public_html
    sudo usermod -aG www-data $USER
    sudo chmod -R 755 /var/www

    sudo bash -c 'cat << EOF > /etc/apache2/sites-available/'$ans'.conf
<VirtualHost *:80>
ServerAdmin admin@'$ans'
ServerName '$ans'
ServerAlias www.'$ans'
DocumentRoot /var/www/'$ans'/public_html
ErrorLog \${APACHE_LOG_DIR}/error.log
CustomLog \${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
EOF'
    sudo a2ensite $ans.conf
    sudo service apache2 restart
    ip_address="127.0.0.1"

    # find existing instances in the host file and save the line numbers
    matches_in_hosts="$(grep -n $ans /etc/hosts | cut -f1 -d:)"
    host_entry="${ip_address} ${ans}"

    echo -n "Updating hosts file... "

    if [ ! -z "$matches_in_hosts" ]
    then
        echo -n "Host entry exists...! "
    else
        echo -n "Adding new hosts entry."
        echo "$host_entry" | sudo tee -a /etc/hosts > /dev/null
    fi
    fi
    # Start installing Wordpress
    echo -n "Your virtual host is ready, do you want to install Wordpress + React? (y/n)? "
    read answer
    if [ "$answer" != "${answer#[Yy]}" ] ;then
    frontDir=$(pwd)
    cd /var/www/$ans/public_html
    wpDir=$(pwd)
    # Download and install wp-cli
    echo $frontDir
    wget https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
    sudo chmod +x wp-cli.phar
    sudo mv wp-cli.phar /usr/local/bin/wp
    echo -n "Do you have a database ready? (y/n)?  "
    read dbans
    if [ "$dbans" != "${dbans#[Yy]}" ] ;then
    echo -n "What is the name of the database?  "
    read dbname
    echo -n "What is the mysql username?  "
    read dbusr
    echo -n "What is the mysql password?  "
    read dbpass
    wp core download --version=latest --locale=en_US --force
    wp core config --dbname=$dbname --dbuser=$dbusr --dbpass=$dbpass --dbhost=localhost
    wp db drop --yes
    db create
    else
        echo -n "I will create a reactwpdb with the default mysql credentials (root/root). Do you want to continue (y/n)?  "
        read nodbans
        if [ "$nodbans" != "${nodbans#[Yy]}" ] ;then
            MYSQL=`which mysql`
            Q1="CREATE DATABASE IF NOT EXISTS reactwpdb;"
            Q2="GRANT USAGE ON *.* TO wpreact@localhost IDENTIFIED BY 'root';"
            Q3="GRANT ALL PRIVILEGES ON reactwpdb.* TO wpreact@localhost;"
            Q4="FLUSH PRIVILEGES;"
            SQL="${Q1}${Q2}${Q3}${Q4}"

            $MYSQL -uphpmyadmin -proot -e "$SQL"

            wp core download --version=latest --locale=en_US --force
            wp core config --dbname=reactwpdb --dbuser=phpmyadmin --dbpass=root --dbhost=localhost
            wp db drop --yes
            wp db create
        else
            # echo "You can edit this file and change the default values!"
            exit
        fi
    fi

    wp core install --url=$ans --title="ReactWp" --admin_user="admin" --admin_password="123456" --admin_email="admin@${ans}" --skip-email
    echo $frontDir
    rm -rf $wpDir/wp-content/*
    cp -r $frontDir/wordpress/. $wpDir/wp-content/

    wp theme activate orpheus
    cd wp-content/plugins
    readarray -t dirs < <(find . -maxdepth 1 -type d -printf '%P\n')
    echo $dirs
    for i in "${dirs[@]}"; do wp plugin activate "$i"; done
    cd ..
    cd ..
    wp acf sync
    wp rewrite structure "/%year%/%monthnum%/%day%/%postname%/"
    wp menu create "Header Menu"
    wp menu item add-post header-menu 1
    wp menu item add-post header-menu 2
    wp menu item add-term header-menu category 1
    wp menu location assign header-menu header-menu
    else
        echo "Have a nice day, amigo!"
        exit
    fi
    echo "You can visit your admin panel at ${ans}/wp-admin, user name: admin, password: 123456"
    echo "Please cd into the react/ folder and edit apiUrl to http://${ans} then run: npm install && npm run dev  "

