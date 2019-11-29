const webpack = require('webpack');
const configs = require('./config.js');
const resolve = require('../utils/index.js');
const entryFiles = require('./entryFiles.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (DEPLOY_ENV = 'production') {
    const entry = {};
    const config = configs[DEPLOY_ENV];
    const plugins = [
        new webpack.DefinePlugin({
            'process.env.DEPLOY_ENV': JSON.stringify(DEPLOY_ENV),
            'process.env.API_DOMAIN': JSON.stringify(config.API_DOMAIN),
            'process.env.ORIGIN_DOMAIN': JSON.stringify(config.ORIGIN_DOMAIN)
        })
    ];
    const webpackConfig = {
        mode: 'production',
        cache: config.cache,
        bail: true,
        entry,
        output: {
            path: resolve('dist'),
            publicPath: config.PUBLIC_PATH,
            filename: `js/${config.filenameHash ? '[name].[chunkhash:8].js' : '[name].js?[hash:8]'}`,
            chunkFilename: `js/${config.filenameHash ? '[id].[chunkhash:8].js' : '[id].js?[chunkhash:8]'}`
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
                    test: /\.(bmp|png|svg|gif|jpe?g)(\?[a-z0-9=]+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]?[contenthash:8]',
                                outputPath: `images/`
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)(\?[a-z0-9=]+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]?[contenthash:8]',
                                outputPath: `fonts/`
                            }
                        }
                    ]
                },
                {
                    test: /\.ejs$/,
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
        plugins,
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        priority: 1,
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'initial',
                        minChunks: 2
                    },
                    commons: {
                        chunks: 'initial',
                        minChunks: 2
                    }
                }
            }
        }
    };

    entryFiles.forEach(item => {
        entry[item.key] = item.entry;
        plugins.push(
            new HtmlWebpackPlugin({
                filename: item.name,
                template: item.template,
                chunks: [item.key],
                inject: 'body',
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

    return webpackConfig;
};
