module.exports = function (config) {
	var testWebpackConfig = require('./webpack.test')();

	var configuration = {
		basePath: '',

		frameworks: ['jasmine'],

		exclude: [],

		client: {
			captureConsole: false
		},

		/*
		 * list of files / patterns to load in the browser
		 *
		 * we are building the test environment in ./spec-bundle.js
		 */
		files: [
			{ pattern: './config/spec-bundle.js', watched: false },
			{ pattern: './src/assets/**/*', watched: false, included: false, served: true, nocache: false }
		],

		proxies: {
			"/assets/": "/base/src/assets/"
		},

		/*
		 * preprocess matching files before serving them to the browser
		 * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		 */
		preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

		webpack: testWebpackConfig,

		coverageReporter: {
			type: 'in-memory'
		},

		remapCoverageReporter: {
			'text-summary': null,
			json: './coverage/coverage.json',
			html: './coverage/html'
		},

		// Webpack please don't spam the console when running in karma!
		webpackMiddleware: {
			noInfo: true,
			stats: {
				chunks: false
			}
		},

		reporters: ['mocha', 'coverage', 'remap-coverage'],

		port: 9876,

		colors: true,

		logLevel: config.LOG_WARN,

		autoWatch: false,

		browsers: [
			'Chrome'
		],

		singleRun: true
	};

	config.set(configuration);
};
