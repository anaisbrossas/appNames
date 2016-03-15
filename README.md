# appNames
This project is a single web page app which allows to add and delete names from a list.

Technology used :
- MongoDb
- Express
- AngularJS
- NodeJS

Also known as [MEAN Stack](http://mean.io/)

## Getting Started

To get you started you need to clone this repo and install its dependencies.

You need to install [node.js](http://nodejs.org) and its package manager (npm).
If you are on Mac and use [Homebrew](http://brew.sh/), just do `brew install node`.

### Clone and run

Clone the appNames repository using `git`:

```
$ git clone https://github.com/anaisbrossas/appNames.git
$ cd appNames
```

Install the node modules declared in `package.json`
```
$ npm install
```

Start the local webserver
```
$ npm start
```

You can now browse to the app at [http://localhost:3000](http://localhost:3000)

## Directory Layout

```
appNames/                     --> all of the source files for the application
  app.js                      --> main application module
  package.json                --> defines dependencies of the app
  Procfile                    --> declares command executed to start the app
  public/                     --> all of the public files
    angularApp.js             --> declares routes
    directives/               --> all of the ui-view folders
      indexAppNames/          --> all of the files needed to generate indexAppNames view
        scripts/              
          indexAppNames.js    --> View Controller 
        templates/            
          indexAppNames.html  --> HTML template (ui-view)
    styles/                   
      style.css               --> stylesheet used in views
    views/                    --> all of the views
      error.ejs               --> error view
      index.ejs               --> index view (first one loaded with the app)
  server/                     --> all of the server files
      routes/                 
        index.js              --> all of the DB schemas and calls
```

