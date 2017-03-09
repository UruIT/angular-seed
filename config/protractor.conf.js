require('ts-node/register');

var utils = require('./utils');

exports.config = {
	baseUrl: 'http://localhost:3000/',

	specs: [
		utils.resolve('e2e/**/*.e2e-spec.ts')
	],
	exclude: [],

	framework: 'jasmine2',

	allScriptsTimeout: 110000,

	jasmineNodeOpts: {
		showTiming: true,
		showColors: true,
		isVerbose: false,
		includeStackTrace: false,
		defaultTimeoutInterval: 400000
	},
	directConnect: true,

	capabilities: {
		'browserName': 'chrome',
		'chromeOptions': {
			'args': ['show-fps-counter=true']
		},
		loggingPrefs: { browser: "INFO" }
	},

	onPrepare: () => {
		browser.ignoreSynchronization = true;
	},

	// Tells Protractor to wait for any angular2 apps on the page instead of just the one matching `rootEl`
	useAllAngular2AppRoots: true
};
