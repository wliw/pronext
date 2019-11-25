const webpack = require('webpack');
const configs = require('./config.js');
const resolve = require('../utils/index.js');
const entryFiles = require('./entryFiles.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (DEPLOY_ENV = 'production') {
    const entry = {};
    const config = configs[DEPLOY_ENV];
    const staticPath = config.STATIC_PATH;
    const plugins = [
        new webpack.DefinePlugin({
            'process.env.DEPLOY_ENV': JSON.stringify(DEPLOY_ENV),
            'process.env.API_DOMAIN': JSON.stringify(config.API_DOMAIN),
            'process.env.ORIGIN_DOMAIN': JSON.stringify(config.ORIGIN_DOMAIN)
        }),
        new MiniCssExtractPlugin({
            filename: `${staticPath}css/${config.filenameHash ? '[name].[contenthash:8].css' : '[name].css?[contenthash:8]'}`,
            chunkFilename: `${staticPath}css/${config.filenameHash ? '[id].[contenthash:8].css' : '[id].css?[contenthash:8]'}`
        })
    ];
    const webpackConfig = {
        mode: 'production',
        entry,
        output: {
            path: resolve('dist'),
            publicPath: config.PUBLIC_PATH,
            filename: `${staticPath}js/${config.filenameHash ? '[name].[hash:8].js' : '[name].js?[hash:8]'}`,
            chunkFilename: `${staticPath}js/${config.filenameHash ? '[id].[chunkhash:8].js' : '[id].js?[chunkhash:8]'}`
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    loader: 'eslint-loader',
                    enforce: 'pre',
                    include: [
                        resolve('src')
                    ],
                    exclude: [
                        resolve('node_modules'),
                        resolve('src/lib')
                    ],
                    options: {
                        formatter: require('eslint-friendly-formatter')
                    }
                },
                {
                    test: /\.(js|jsx)$/,
                    loader: 'babel-loader',
                    include: [
                        resolve('src')
                    ],
                    exclude: [
                        resolve('node_modules'),
                        resolve('src/lib')
                    ]
                },
                {
                    test: /.s?css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: DEPLOY_ENV === 'development',
                                reloadAll: true,
                                publicPath: `${staticPath}`
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
                                outputPath: `${staticPath}images/`
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
                                outputPath: `${staticPath}fonts/`
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
        plugins
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
