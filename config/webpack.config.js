const webpack = require('webpack');
const configs = require('./config.js');
const resolve = require('../utils/index.js');
const entryFiles = require('./entryFiles.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (DEPLOY_ENV = 'production') {
    const entry = {};
    const config = configs[DEPLOY_ENV];
    const plugins = [
        new webpack.DefinePlugin({
            'process.env.DEPLOY_ENV': JSON.stringify(DEPLOY_ENV)
        }),
        new MiniCssExtractPlugin({
            filename: `css/${config.filenameHash ? '[name].[contenthash:8].css' : '[name].css?[contenthash:8]'}`,
            chunkFilename: `css/${config.filenameHash ? '[id].[contenthash:8].css' : '[id].css?[contenthash:8]'}`
        })
    ];
    const webpackConfig = {
        mode: 'production',
        context: resolve('src'),
        entry,
        output: {
            path: resolve('dist'),
            publicPath: config.PUBLIC_PATH,
            filename: `js/${config.filenameHash ? '[name].[chunkhash:8].js' : '[name].js?[chunkhash:8]'}`,
            chunkFilename: `js/${config.filenameHash ? '[id].[chunkhash:8].js' : '[id].js?[chunkhash:8]'}`
        },
        module: {
            rules: [
                {
                    test: /.(js|jsx)$/,
                    // enforce: 'pre',
                    include: [
                        resolve('src')
                    ],
                    exclude: /node_modules/,
                    use: [
                        'babel-loader',
                        {
                            loader: 'eslint-loader',
                            options: {
                                formatter: require('eslint-friendly-formatter')
                            }
                        }
                    ]
                },
                // {
                //     test: /.js$/,
                //     use: 'babel-loader',
                //     include: [
                //         resolve('src')
                //     ],
                //     exclude: /node_modules/
                // },
                {
                    test: /.s?css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: DEPLOY_ENV === 'development'
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2
                            }
                        },
                        'postcss-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(png|svg|gif|jpe?g)(\?[a-z0-9=]+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]?[contenthash:8]',
                                outputPath: 'images/'
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
                                outputPath: 'fonts/'
                            }
                        }
                    ]
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
        externals: /^(jquery|zepto|\$)$/i,
        plugins
    };

    entryFiles.forEach(item => {
        entry[item.key] = item.entry;
        plugins.push(
            new HtmlWebpackPlugin({
                filename: item.name,
                template: item.template,
                chunks: [item.key],
                inject: 'body'
            })
        );
    });

    return webpackConfig;
};
