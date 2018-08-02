#!/bin/bash
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`
databaseusr="wpreact"
ip_address="127.0.1.1"
mysqlusr="phpmyadmin"
mysqlpass="root"
echo -e "${green}Hello, I will create a vitual host in your apache server with your desired name, ex: [yourdomain.test]${reset}"
read ans
if [ ! -z "$ans" ]; then
    echo -e "${green}Please wait while $ans is created and enter your password if prompted"
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
ErrorLog ${APACHE_LOG_DIR}/error.log
CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
EOF'
    sudo a2ensite $ans.conf
    sudo service apache2 restart


    # find existing instances in the host file and save the line numbers
    matches_in_hosts="$(grep -n $ans /etc/hosts | cut -f1 -d:)"
    host_entry="${ip_address} ${ans}"

    echo -e "${green}Updating hosts file...${reset}\n "

    if [ ! -z "$matches_in_hosts" ]
    then
        echo -e "${green}Host entry exists...! ${reset}\n "
    else
        echo -e "${green}Adding new hosts entry. ${reset}\n "
        echo "$host_entry" | sudo tee -a /etc/hosts > /dev/null
    fi
    fi
    # Start installing Wordpress
    echo -e "${green}Your virtual host is ready,\n do you want to install Wordpress + React? \n ${red}(y/n)?${reset} "
    read answer
    if [ "$answer" != "${answer#[Yy]}" ] ;then
        frontDir=$(pwd)
        cd /var/www/$ans/public_html
        wpDir=$(pwd)
        # Download and install wp-cli
        wget https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
        sudo chmod +x wp-cli.phar
        sudo mv wp-cli.phar /usr/local/bin/wp
        echo -e "${green}Do you have a database ready? \n ${red}(y/n)?${reset}  "
        read dbans
        if [ "$dbans" != "${dbans#[Yy]}" ] ;then
            echo -e "${green}What is the name of the database? ${reset} "
            read dbname
            echo -e "${green}What is the mysql username? ${reset} "
            read dbusr
            echo -e "${green}What is the mysql password? ${reset} "
            read dbpass
            wp core download --version=latest --locale=en_US --force
            wp core config --dbname=$dbname --dbuser=$dbusr --dbpass=$dbpass --dbhost=localhost

        else
            dbusrentry="${ans/.*/db}"
            echo -e "${green}I will create a database ${dbusrentry} with the default mysql credentials (${mysqlusr}/${mysqlpass}). \nDo you want to continue \n ${red}(y/n)?${reset} "
            read nodbans
            if [ "$nodbans" != "${nodbans#[Yy]}" ] ;then
                MYSQL=`which mysql`
                Q1="CREATE DATABASE IF NOT EXISTS ${dbusrentry};"
                Q2="GRANT USAGE ON *.* TO ${databaseusr}@localhost IDENTIFIED BY '${mysqlpass}';"
                Q3="GRANT ALL PRIVILEGES ON ${dbusrentry}.* TO ${databaseusr}@localhost;"
                Q4="FLUSH PRIVILEGES;"
                SQL="${Q1}${Q2}${Q3}${Q4}"

                $MYSQL -u$mysqlusr -p$mysqlpass -e "$SQL"

                wp core download --version=latest --locale=en_US --force
                wp core config --dbname=$dbusrentry --dbuser=$mysqlusr --dbpass=$mysqlpass --dbhost=localhost
                wp db drop --yes
                wp db create
            else
                # echo "You can edit this file and change the default values!"
                exit
            fi
        fi

        wp core install --url=$ans --title="WP API REACT" --admin_user="admin" --admin_password="123456" --admin_email="admin@${ans}" --skip-email
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
        wp rewrite flush --hard
        wp rewrite structure "/%postname%/"
        wp post create --post_type=page --post_status=publish --post_name=about --post_title="About";
        wp post create --post_type=page --post_status=publish --post_name=clients --post_title="Clients";
        wp post create --post_type=page --post_status=publish --post_name=blog --post_title="Blog";
        wp post create --post_type=page --post_status=publish --post_name=contact --post_title="Contact";
        wp menu create "Header Menu"
        wp menu item add-post header-menu 4;
        wp menu item add-post header-menu 5;
        wp menu item add-post header-menu 6
        wp menu item add-post header-menu 7
        wp menu location assign header-menu header-menu
        bash -c 'cat << EOF > .htaccess
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
EOF'
    else
        echo "Have a nice day, amigo!"
        exit
    fi
    cd $frontDir/react
    pwd
    bash -c 'cat << EOF > config.js
export const Config = { apiUrl: "http://'$ans'" };
EOF'
    echo -e "${green}You can visit your Wordpress admin panel at ${ans}/wp-admin, \n ${red}user name: admin, password: 123456${reset}"
    echo -e "${green}Please wait. Now will run the frontend server ${reset} "
    sleep 5
    npm install && npm run dev


