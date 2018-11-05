## ionic4-boiler-plate
This starter application provides fully functional application which includes user authentication, authorization (using JWT token), user dashboard, notification and profile management. It also provides the feature to connect to mobile device camera and photo library to manage the profile display picture. This application connects to the back end API server which uses MEAN stack and NestJS Progressive Framework http://nestjs.com

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).

Ionic version 4 and angular 6 boiler plate code for mobile app development

This application leveraging Angular 6 routing for navigation and Reactive Extension library for Reactive progamming

The first thing you should do is install the Node.js dependencies. The application comes pre-bundled with a package.json file that contains the list of modules you need to start your application.

To install Node.js dependencies you're going to use npm again. In the application folder run this in the command-line:

Download the zip file extract and follow the steps mentioned below. Go to the folder where the files extracted into and open command prompt and run the following

In the environment.ts file under the folder environments, need to configure the back end API server base URL path to connect to the back end server

```bash
$ npm install
```

```bash
$ ionic serve --address localhost
```