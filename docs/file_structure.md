# File structure

The file structure is inpired in the [Angular Guidelines](https://angular.io/docs/ts/latest/guide/style-guide.html). We use a feature/components approach in this seed.
This is a great way to ensure maintainable code by encapsulation of our behavior logic.
Each feature is a self-contained app divided into components.
Also, each file follows the single responsibility principle: style, template, specs, routing, module and component class.
In addition, we incorporate the use of [barrel](https://angular.io/docs/ts/latest/glossary.html#!#barrel) files (index.ts) which is a way to export several exported ES2015 modules into one module, so allows centralizing your imports and therefore your code is less verbose.

Here's how it looks:

 ```
angular-seed/
	├──config/                                   * project configuration
    |   ├──karma.conf.js                         * karma config for our unit tests
    |   ├──protractor.conf.js                    * protractor config for end-to-end tests
    |   ├──spec-bundle.js                        * sets up the angular 2 testing environment (entry file for webpack.test.js)
    |   ├──superstatic.json                      * static file server used to serve prod bundle
    |   ├──typedoc.json                          * typescript documentation generator config
    |   ├──utils.js                              * utilities functions used in the configuration files
    |   ├──webpack.config.js                     * webpack config file
    |   ├──webpack.test.js                       * webpack testing config file
	|
    ├──e2e/                                      * folder for e2e testing
    |   ├──app.e2e-spec.ts                       * simple e2e test for app
    |   ├──app.po.ts                             * app page object file
	|
    ├──src/                                      * WebApp folder
    |   ├──index.html                            * app index file
    |   ├──main.aot.ts                           * app main for ahead of time (AoT) compilation
    |   ├──main.ts                               * app main
    |   ├──polyfills.ts                          * polyfills file
    |   ├──assets/                               * General app assets
    |   ├──app/                                  * app folder
    |   ├──+lazy-sample/                         * lazy route sample
    |   |   ├──feature-1                         * feature one component folder
    |   |  		├──...
    |   |       ├──lazy-sample-routing.module.ts * routing module definition for lazy-sample
    |   |       ├──lazy-sample.module.ts         * module definition for lazy-sample
    |   |       ├──index.ts                      * barrel for the lazy sample module
	|	|
    |   ├──core/                                 * core module (this module host all things that only should be imported by the app module)
    |   |   ├──components/                       * components for this feature are placed here
	|	|	|	 ├──..
    |   |   ├── services/                        * services that only will be consumed in this feature are placed here
	|	|	|    ├──.../
    |   |   ├──core.module.ts                    * module definition for core module
    |   |   ├──module-import-guard.ts            * this file ensure that this module is imported once in the app
	|   |   ├──index.ts                          * barrel for the core module
    |   ├──main/                                 * main module
	|   |   ├──.../	                             * all main module components
	|	|   ├──main-routing.module.ts            * routing module definition for main module
	|   |   ├──main.module.ts                    * module definition for main module
	|   |   ├──index.ts                          * barrel for the main module
	|   ├──shared/
	|   |    ├──.../                             * shared module
	|   ├──utils/                                * utilites folder
	|        ├──...                              * here are hosted all the static utilities that are not related with angular but are used in the application

	├──.editor.config                            * editor project configuration
	├──.gitignore                                * git ignore file
	├──karma.conf.js                             * karma configuration file, just require the config/karma.conf.js
	├──protractor.config.js                      * protractor configuration file, just require the config/protractor.conf.js
	├──postcss.config.js                         * postcss configuration, just auto prefixer for starting :)
	├──package.config.js
	├──tslint.json                               * typescript linter rules
	├──webpack.config.js                         * webpack configuration file, just require the config/webpack.conf.js
	├──yarn.lock

```
