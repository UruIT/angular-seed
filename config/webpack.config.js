const webpack = require('webpack');

// Webpack Plugins
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');

const AssetsPlugin = require('assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { NgcWebpackPlugin } = require('ngc-webpack');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const utils = require('./utils');

// Webpack Constants
const isProd = utils.hasNpmFlag('prod');
const analyze = utils.hasNpmFlag('analyze');

var webpackConfig = (options) => {
	var environment = options ? options.environment || 'development' : 'development';
	const ifProd = utils.ifElse(isProd);
	const ifDev = utils.ifElse(!isProd);
	const ifAnalyze = utils.ifElse(analyze);

	var config = {
		entry: {
			'polyfills': utils.resolve('src/polyfills.ts'),
			'main': isProd ? utils.resolve('src/main.aot.ts') : utils.resolve('src/main.ts')
		},
		output: {
			path: utils.resolve('dist'),
			filename: isProd ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
			sourceMapFilename: isProd ? '[name].[chunkhash].bundle.map' : '[file].map',
			chunkFilename: isProd ? '[id].[chunkhash].chunk.js' : '[id].chunk.js'
		},
		resolve: {
			extensions: ['.ts', '.js', '.json'],
			modules: [utils.resolve('src'), utils.resolve('node_modules')],
		},
		module: {
			rules: utils.notEmpty([
				{
					test: /\.ts$/,
					use: utils.notEmpty([
						{ loader: 'ng-router-loader', options: { loader: 'async-import', genDir: 'aot', aot: isProd } },
						{ loader: 'awesome-typescript-loader', options: { configFileName: utils.resolve('tsconfig.webpack.json') } },
						{ loader: 'angular2-template-loader' },
						ifDev({ loader: 'tslint-loader', options: { configFile: utils.resolve('tslint.json') } })
					]),
					exclude: [/\.(spec|e2e)\.ts$/]
				},
				{ test: /\.json$/, use: 'json-loader' },
				{ test: /\.css$/, use: ['to-string-loader', 'css-loader'], exclude: [utils.resolve('src', 'assets')] },
				{
					test: /\.scss$/,
					use: ['to-string-loader', 'css-loader?importLoaders=1', 'postcss-loader', 'sass-loader'],
					exclude: [utils.resolve('src', 'assets')]
				},
				{ test: /\.html$/, use: 'raw-loader', exclude: [utils.resolve('src/index.html')] },
				{ test: /\.(jpg|png|gif|svg)$/, use: 'file-loader' },

				// Development
				ifDev({ test: /\.css$/, use: ['style-loader', 'css-loader'], include: [utils.resolve('src', 'assets')] }, null),
				ifDev({
					test: /\.scss$/,
					use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader', 'sass-loader'],
					include: [utils.resolve('src', 'assets')]
				}, null),

				// Production
				ifProd({
					test: /\.css$/,
					loader: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					}),
					include: [utils.resolve('src', 'assets')]
				}, null),
				ifProd({
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader?importLoaders=1!postcss-loader!sass-loader'
					}),
					include: [utils.resolve('src', 'assets')]
				}, null)
			]),
		},
		plugins: utils.notEmpty([
			new DefinePlugin({ 'ENV': environment }),

			// Do type checking in a separate process, so webpack don't need to wait.
			new CheckerPlugin(),

			new CommonsChunkPlugin({ name: 'polyfills', chunks: ['polyfills'] }),
			// This enables tree shaking of the vendor modules
			new CommonsChunkPlugin({ name: 'vendor', chunks: ['main'], minChunks: module => /node_modules/.test(module.resource) }),
			// Specify the correct order the scripts will be injected in
			new CommonsChunkPlugin({ name: ['polyfills', 'vendor'].reverse() }),

			// See: https://github.com/angular/angular/issues/11580
			new ContextReplacementPlugin(
				// The (\\|\/) piece accounts for path separators in *nix and Windows
				/angular(\\|\/)core(\\|\/)@angular/,
				utils.resolve('src'), // location of your src
				{
					// your Angular Async Route paths relative to this root directory
				}
			),

			new CopyWebpackPlugin([
				{ from: utils.resolve('src/assets'), to: 'assets', ignore: ['**/*.scss'] },
				{ from: utils.resolve('src/favicon.ico') }
			]),

			new NormalModuleReplacementPlugin(/.\/app-config/, utils.resolve("./src/app/shared/config/app-config." + environment)),

			new ScriptExtHtmlWebpackPlugin({ defaultAttribute: 'defer' }),

			new HtmlWebpackPlugin({ template: utils.resolve('src/index.html'), chunksSortMode: 'dependency', inject: 'head' }),

			new ImageminPlugin({
				disable: !isProd,
				test: ["**/*.jpg", "**/*.jpeg", "**/*.png", "**/*.svg"]
			}),

			// Development
			ifDev(new LoaderOptionsPlugin({ debug: true }), null),

			// Production
			ifProd(new AssetsPlugin({ path: utils.resolve('dist'), filename: 'webpack-assets.json', prettyPrint: true }), null),

			ifProd(new NgcWebpackPlugin({ tsConfig: utils.resolve('tsconfig.webpack.json') }), null),

			ifProd(new OptimizeJsPlugin({ sourceMap: false }), null),

			ifProd(new ExtractTextPlugin('[name].[contenthash].css'), null),

			ifProd(new UglifyJsPlugin({
				beautify: false,
				output: {
					comments: false
				},
				mangle: {
					screw_ie8: true
				},
				compress: {
					screw_ie8: true,
					warnings: false,
					conditionals: true,
					unused: true,
					comparisons: true,
					sequences: true,
					dead_code: true,
					evaluate: true,
					if_return: true,
					join_vars: true,
					negate_iife: false // we need this for lazy v8
				},
			}), null),

			ifProd(new LoaderOptionsPlugin({
				minimize: true,
				debug: false,
				options: {
					htmlLoader: {
						minimize: true,
						removeAttributeQuotes: false,
						caseSensitive: true,
						customAttrSurround: [
							[/#/, /(?:)/],
							[/\*/, /(?:)/],
							[/\[?\(?/, /(?:)/]
						],
						customAttrAssign: [/\)?\]?=/]
					}
				}
			}), null),

			// Analyze
			ifAnalyze(new BundleAnalyzerPlugin({
				analyzerMode: 'server',
				analyzerPort: 8888,
				openAnalyzer: true,
				logLevel: 'info'
			}), null)
		]),
		/**
		 * the other source mapping styles have issues:
		 * https://github.com/webpack/webpack/issues/2145 and https://github.com/webpack/webpack/issues/3165
		 */
		devtool: 'source-map',
		performance: isProd ? { hints: "warning" } : false,
		node: {
			global: true,
			crypto: 'empty',
			process: true,
			module: false,
			clearImmediate: false,
			setImmediate: false
		},
		devServer: {
			port: 3000,
			historyApiFallback: {
				index: 'webpack:///index.html'
			}
		}
	};

	return config;
};

module.exports = webpackConfig;
