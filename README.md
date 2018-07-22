# Wordpress REST API & React

An easy to start Wordpress installation with start up theme configured to output REST API for the React frontend.

The install.sh script:

- Automaticaly create virtual host on Apache [yourdomain.dev],
- Enable site and add host entry
- Install Wordpress latest
- Install wp-cli
- Create database
- Configure Wordpress with theme & plugins ready to run

## Getting Started

Clone the project,

run the bash install for WP,

run the npm install for react frontend, and you will be up and running on your local machine for development and testing purposes.

See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Linux or Mac OS

NPM or YARN

Apache2, mysql, php

Your local development installation is up to you but keep in mind

the script will be looking for:

```
/var/www/
```

So make sure you got that going or edit the install.sh if you have to!

### Installing

Assuming npm is installed & your server is running & you got a cup of coffee near you:

first we clone the repository and cd inside

```
git clone https://github.com/aristech/Wordpress_API_React.git && cd Wordpress_API_React
```

run the install

```
./install.sh
```

The script will guide you through and allow you to

create the development domain [mydomain.dev],

go through database creation options

Your wordpress installation is now ready.

It's time to cd into the react folder and run

```
npm install && npm run dev
```

## Acknowledgments

- https://github.com/postlight/headless-wp-starter
