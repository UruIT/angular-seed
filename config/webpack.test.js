const path = require('path');

// Webpack Plugins
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const utils = require('./utils');

var webpackTestConfig = () => {
	var config = {
		devtool: 'inline-source-map',
		resolve: {
			extensions: ['.ts', '.js'],
			modules: [utils.resolve('src'), utils.resolve('node_modules')]
		},
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.js$/,
					use: 'source-map-loader',
					exclude: [
						// these packages have problems with their sourcemaps
						utils.resolve('node_modules/rxjs'),
						utils.resolve('node_modules/@angular')
					]
				},
				{
					test: /\.ts$/,
					use: [
						{
							loader: 'awesome-typescript-loader',
							options: {
								configFileName: utils.resolve('src/tsconfig.json'),
								// use inline sourcemaps for "karma-remap-coverage" reporter
								sourceMap: false,
								inlineSourceMap: true
							},
						},
						'angular2-template-loader'
					],
					exclude: [/\.e2e\.ts$/]
				},
				{ test: /\.json$/, use: 'json-loader', exclude: [utils.resolve('src/index.html')] },
				{ test: /\.css$/, use: ['to-string-loader', 'css-loader'], exclude: [utils.resolve('src/index.html')] },
				{ test: /\.scss$/, use: ['to-string-loader', 'css-loader', 'sass-loader'], exclude: [utils.resolve('src/index.html')] },
				{ test: /\.html$/, use: 'raw-loader', exclude: [utils.resolve('src/index.html')] },
				// Instruments JS files with Istanbul for subsequent code coverage reporting.
				{
					enforce: 'post',
					test: /\.(js|ts)$/,
					use: 'istanbul-instrumenter-loader',
					include: utils.resolve('src'),
					exclude: [/\.(e2e|spec)\.ts$/, /node_modules/]
				}
			]
		},
		plugins: [
			new ContextReplacementPlugin(
				// The (\\|\/) piece accounts for path separators in *nix and Windows
				/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
				utils.resolve('src'), // location of your src
				{
					// your Angular Async Route paths relative to this root directory
				}
			),
		],
		performance: { hints: false },
		node: {
			global: true,
			process: false,
			crypto: 'empty',
			module: false,
			clearImmediate: false,
			setImmediate: false
		}
	};

	return config;
}

module.exports = webpackTestConfig;
