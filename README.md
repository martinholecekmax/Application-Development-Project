# Application-Development-Project
Application Development Assignment 

This demo app is deployed at [martinholecek.site](http://martinholecekmax.site)

## Installation
This project requires to install [Node.js](https://nodejs.org/) and
[NPM](https://npmjs.org/) before using bash commands.

  Install node dependencies: 
```bash
$ npm install
```

  Install composer: 
```bash
$ composer install
```

### Setup Database Connection
  In your `.env` file edit:

```ini
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=XXX
DB_USERNAME=XXX
DB_PASSWORD=XXX
```

### Generate Application Key
```bash
$ php artisan key:generate
```

### Run database migrations:
```bash
$ php artisan migrate
```

### Generate JWT Token Secret:
```bash
$ php artisan jwt:secret
```

### Compile NPM dependencies:
```bash
$ npm run dev
```

## Using Virtual Host
Setting up a virtual host is not essential, however, the project is developed by using the virtual host which is beneficial due to applying Vue Router. 
* In case that you decided to not create the virtual host make sure that you uncomment the line of localhost and comment the line with virtual host shown below inside “./resources/assets/js/app.js” file.
* Note - Don’t do this step if you decide to use the Virtual Host!

```javascript
// localhost URL
window.axios.defaults.baseURL = 'http://localhost/Application-Development-Project-master/public/api/';

// Virtual host URL
// window.axios.defaults.baseURL = 'http://calendar.test/api/';
```

* Note – NPM dependencies must be recompile after modification of the “app.js” file.
* Issues – There might occur some issues with links if the virtual host is used set up due to Vue Routing. For this reason, using virtual host is recommended.

## Setting up Virtual Host
### Edit Virtual Hosts Config file
In your file system, find the file `httpd-vhosts.conf` inside `C:\xampp\apache\conf\extra` folder. If you installed [XAMPP](https://www.apachefriends.org/index.html) into different folder the path of this folder will be different.

At the end of this file, add the code below.

```html
<VirtualHost *:80>
    DocumentRoot "C:/xampp/htdocs/Application-Development-Project-master/public"
    ServerName calendar.test
</VirtualHost>
```
* ServerName variable is the URL which must be the same as URL inside `app.js` file.
* You should also replace “DocumentRoot” path with the location your of project in the case that path is different.

### Edit Hosts file
In your file system, find the file `hosts` which is located inside the `C:\Windows\System32\drivers\etc` folder and add the line underneath at the end of this file.

* Before you open the file, make sure that you open it as the Administrator otherwise you will not be able to edit this file.
```
127.0.0.1	calendar.test
```
### Apache server inside the XAMPP Control Panel must be restarted otherwise those changes will not be applied.



