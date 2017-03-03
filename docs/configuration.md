# Configuration

Configuration files are placed in config/ we are currently using webpack, karma, and protractor in this application.

## Webpack

There are two webpack configurations on this application. One that is only for testing purposes and the application one.
All production mode functionalities are conditional to the `ifProd` utility. The main idea to have only one file and some utilities - that allows discriminating dev or prod builds - for our build configuration is to make the configuration easier to read.
Anyway, if the configuration grows in a significant way in your project the recommendation is to split the configuration modes into two files and move all the common configuration into another one.

