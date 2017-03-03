
# Getting Started

First at all, we recommend taking a look at our file structure section to see what you can find here.
Then we can start playing with the code.

## How to run?

### Dependencies
Start installing the dependencies for this app:
* `node` and `npm`
* Ensure you're running the latest versions of Node and NPM.
* Also you will need to add `yarn`.

Once you have those, you should install these globals with `npm install --global`:
* `webpack` (`npm install --global webpack`)
* `webpack-dev-server` (`npm install --global webpack-dev-server`)
* `karma` (`npm install --global karma-cli`)
* `protractor` (`npm install --global protractor`)
* `typescript` (`npm install --global typescript`)

> You can decide to install these dependencies locally. It is recommended to have it globally, and if you decide to keep working on this stack those will be required every time. Just make sure -in the place you prefer- to have those installed :)

### Installing
* `fork` this repo
* `clone` your fork
* `npm install webpack-dev-server rimraf webpack -g` to install required global dependencies, these can also be local
* `yarn install` to install all dependencies.
* `npm start` to start app in a new tab using webpack-dev-server

### Running the app
If you want to run the application in production mode you can execute `npm run start:prod` this command will trigger the production webpack build and then start a superstatic server that will serve the app in the port 8080.


## Npm scripts available
All scripts for testing, building or running this app can be executed as npm scripts.
The complete list of available scripts can be obtained executing `npm run` as is listed below:

```
Lifecycle scripts included in angular-seed:
  start
    webpack-dev-server --config webpack.config.js --open --progress --profile --watch --content-base src/
  test
    npm run lint && karma start

available via `npm run-script`:
  build:prod
    npm run clean:aot && webpack --config webpack.config.js --progress --profile --bail
  build:prod:analyze
    npm run clean:aot && webpack --config webpack.config.js --progress --profile --bail
  build:prod:live
    npm run clean:aot && webpack --config webpack.config.js --progress --profile --bail --env.environment=live
  clean:aot
    rimraf -- aot dist
  docs
    typedoc --options config/typedoc.json ./src/
  e2e
    npm-run-all -p -r server:prod:e2e protractor
  lint
    tslint "src/**/*.ts"
  protractor
    protractor
  server:prod
    superstatic dist -c config/superstatic.json -p 8080 --gzip
  server:prod:e2e
    superstatic dist -c config/superstatic.json -p 3000 --gzip
  start:prod
    npm run build:prod && npm run server:prod
  start:prod:live
    npm run build:prod:live && npm run server:prod
  watch:test
    npm run test -- --auto-watch --no-single-run
  webdriver:update
    webdriver-manager update
```
