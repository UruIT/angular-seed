# File structure

The file structure is inspired by the [Angular Guidelines](https://angular.io/docs/ts/latest/guide/style-guide.html). We use a feature/components approach in this seed.
This is a great way to ensure maintainable code by encapsulating our behavior logic.
Each feature is a self-contained app divided into components.
Also, each file follows the single responsibility principle: style, template, specs, routing, module or component class.
In addition, we incorporate the use of [barrel](https://angular.io/docs/ts/latest/glossary.html#!#barrel) files (index.ts) which is a way to export several exported ES2015 modules into one module, allowing centralize your imports and therefore your code is less verbose.

Here's how it looks:

 ```
angular-seed/
	├──config/                                   * project configuration
    |   ├──karma.conf.js                         * Karma config for our unit tests
    |   ├──protractor.conf.js                    * Protractor config for end-to-end tests
    |   ├──spec-bundle.js                        * sets up the Angular testing environment (entry file for webpack.test.js)
    |   ├──superstatic.json                      * static file server configuration used to serve prod bundle
    |   ├──typedoc.json                          * Typescript documentation generator config
    |   ├──utils.js                              * utilities functions used in the configuration files
    |   ├──webpack.config.js                     * Webpack config file
    |   ├──webpack.test.js                       * Webpack testing config file
	|
    ├──e2e/                                      * folder for e2e testing
    |   ├──app.e2e-spec.ts                       * simple e2e test for app
    |   ├──app.po.ts                             * app page object file
	|
    ├──src/                                      * web app folder
    |   ├──index.html                            * app index file
    |   ├──main.aot.ts                           * app main entry point for Ahead of Time (AoT) compilation
    |   ├──main.ts                               * app main entry point
    |   ├──polyfills.ts                          * polyfills file
    |   ├──assets/                               * general app assets
    |   ├──app/                                  * app folder
    |   ├──+lazy-sample/                         * lazy route sample
    |   |   ├──feature-1                         * feature one component folder
    |   |  		├──...
    |   |       ├──lazy-sample-routing.module.ts * routing module definition for lazy-sample
    |   |       ├──lazy-sample.module.ts         * module definition for lazy-sample
    |   |       ├──index.ts                      * barrel for the lazy-sample module
	|	|
    |   ├──core/                                 * core module (this module host all things that should only be imported by the route module)
    |   |   ├──components/                       * components for this feature are placed here
	|	|	|	 ├──..
    |   |   ├── services/                        * services that only will be consumed in this feature are placed here
	|	|	|    ├──.../
    |   |   ├──core.module.ts                    * module definition for core module
    |   |   ├──module-import-guard.ts            * this file ensure that this module is imported once in the app
	|   |   ├──index.ts                          * barrel for the core module
    |   |
    |   ├──main/                                 * main module
	|   |   ├──.../                              * all main module components
	|	|   ├──main-routing.module.ts            * routing module definition for main module
	|   |   ├──main.module.ts                    * module definition for main module
	|   |   ├──index.ts                          * barrel for the main module
    |   |
    |   ├──shared/
	|   |    ├──.../                             * shared module
    |   |
    |   ├──utils/                                * utilities folder
	|   |    ├──...                              * here are hosted all the static utilities that are not related with Angular but are used in the application
	|   ├──app-routing.module.ts                 * app routing module
	|   ├──app.module.ts                         * app module
	|   ├──app.component.html                    * app component html template
	|   ├──app.component.ts                      * app component
	|   ├──app.component.scss                    * app component sass styles
    |
    ├──.editor.config                            * editor project configuration
	├──.gitignore                                * git ignore file
	├──karma.conf.js                             * Karma configuration file, just require the config/karma.conf.js
	├──protractor.config.js                      * Protractor configuration file, just require the config/protractor.conf.js
	├──postcss.config.js                         * PostCSS configuration, just auto prefixer for starting :)
	├──package.config.js
	├──tslint.json                               * Typescript linter rules
	├──webpack.config.js                         * Webpack configuration file, just require the config/webpack.conf.js
	├──yarn.lock

```
