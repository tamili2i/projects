# Immivertex Front End

Immivertex is an Immigration management

##### System Requirements
   To up the front end application you need to have following system requirements

 * Node Js (>=v0.12.7 && <=v4.2.1)

    [Install node using nvm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-with-nvm-node-version-manager-on-a-vps)

##### Steps to launch Front End application

*	After cloning repo get into front end folder

   	```
   	cd frontend/
   	```

*	If gulp already installed no problem, otherwise install gulp. Gulp is used for automate and enhance our workflow in 	build process

    ```
    npm install gulp -g
    ```

*	Install bower,  bower is a dependency manager for our front end application
	```
    npm install bower -g
    ```

*	Download node modules for automate less compilation, web server to serve static HTML files and live reload
    ```
    npm install
    ```
*	Download front end dependencies, using bower
	```
    bower install
    ```
*	And finally, give gulp command to lift server :+1:
	```
    gulp
    ```
