const webpack = require('webpack');
const configs = require('./config.js');
const entrances = require('./entrances.js');
const resolve = require('../utils/index.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (DEPLOY_ENV = 'production') {
    const entry = {};
    const config = configs[DEPLOY_ENV];
    const plugins = [];
    const webpackConfig = {
        mode: 'production',
        cache: config.cache,
        bail: true,
        entry,
        output: {
            path: resolve('dist'),
            publicPath: config.PUBLIC_PATH,
            filename: `js/[name].[chunkhash:8].js`,
            chunkFilename: `js/[name].[chunkhash:8].js`
        },
        module: {
            strictExportPresence: true,
            rules: [
                {
                    enforce: 'pre',
                    test: /\.(js|jsx)$/,
                    include: [
                        resolve('src')
                    ],
                    exclude: [
                        resolve('node_modules'),
                        resolve('src/lib')
                    ],
                    use: {
                        loader: 'eslint-loader',
                        options: {
                            formatter: require('eslint-friendly-formatter')
                        }
                    }
                },
                {
                    test: /\.(js|jsx)$/,
                    include: [
                        resolve('src')
                    ],
                    exclude: [
                        resolve('node_modules'),
                        resolve('src/lib')
                    ],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: config.cache
                        }
                    }
                },
                {
                    test: /\.(bmp|png|gif|jpe?g)(\?[a-z0-9=]+)?$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]?[contenthash:8]',
                            limit: 4096,
                            fallback: 'file-loader',
                            outputPath: `images/`
                        }
                    }
                },
                {
                    test: /\.svg(\?[a-z0-9=]+)?$/,
                    oneOf: [
                        {
                            test: /fonts\/(.*)\.svg(\?[a-z0-9=]+)?$/,
                            loader: 'url-loader',
                            include: [
                                resolve('src/assets/fonts')
                            ],
                            options: {
                                name: '[name].[ext]?[contenthash:8]',
                                limit: 1,
                                outputPath: `fonts/`
                            }
                        },
                        {
                            loader: 'svg-url-loader',
                            exclude: [
                                resolve('src/assets/fonts')
                            ],
                            options: {
                                name: '[name].[ext]?[contenthash:8]',
                                limit: 4096,
                                outputPath: `images/`
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)(\?[a-z0-9=]+)?$/,
                    exclude: [
                        resolve('node_modules')
                    ],
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]?[contenthash:8]',
                            outputPath: `fonts/`
                        }
                    }
                },
                {
                    test: /\.ejs$/,
                    include: [
                        resolve('src')
                    ],
                    loader: 'ejs-loader'
                }
            ]
        },
        resolve: {
            extensions: [
                '.js',
                '.json',
                '.scss',
                '.css'
            ],
            alias: {
                '@': resolve('src')
            }
        },
        devtool: config.devtool,
        // externals: /^(jquery|zepto|\$)$/i,
        plugins
    };

    entrances.forEach(item => {
        const chunks = ['vendors', 'commons', item.key];

        entry[item.key] = item.entry;
        plugins.push(
            new HtmlWebpackPlugin({
                filename: item.name,
                template: item.template,
                chunks,
                inject: 'body',
                favicon: resolve('favicon.ico'),
                base: config.ORIGIN_DOMAIN,
                minify: {
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true,
                    removeRedundantAttributes: true
                }
            })
        );
    });

    plugins.push(
        new webpack.DefinePlugin({
            'process.env.DEPLOY_ENV': JSON.stringify(DEPLOY_ENV),
            'process.env.API_DOMAIN': JSON.stringify(config.API_DOMAIN),
            'process.env.ORIGIN_DOMAIN': JSON.stringify(config.ORIGIN_DOMAIN)
        })
    );

    return webpackConfig;
};
