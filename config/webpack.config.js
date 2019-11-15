const path = require('path');
const webpack = require('webpack');
const configs = require('./index.js');
const resolve = require('../utils/index.js');

module.exports = function (DEPLOY_ENV) {
    const config = configs[DEPLOY_ENV];
    const webpackConfig = {
        mode: 'production',
        entry: {
            index: resolve('src/index.js');
        },
        output: {
            path: resolve('dist'),
            filename: `js/${config.filenameHash ? '[name].[chunkhash:8].js' : '[name].js?[chunkhash:8]'}`,
            publicPath: config.PUBLIC_PATH,
            chunkFilename: `js/${config.filenameHash ? '[id].[chunkhash:8].js' : '[id].js?[chunkhash:8]'}`
        },
        module: {
            rules: [
                {
                    test: /.(js|jsx|vue)$/,
                    include: [],
                    enforce: 'pre',
                    use: [
                        {
                            loader: 'eslint-loader',
                            options: {
                                formatter: require('eslint-friendly-formatter')
                            }
                        }
                    ]
                },
                {
                    test: /.(js|jsx)$/,
                    use: 'babel-loader',
                    include: []
                },
                {
                    test: /.s?css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            modules: [
                'node_modules'
            ],
            extensions: [
                '.js',
                '.json',
                '.scss',
                '.css'
            ],
            alias: {
                '@': ''
            }
        },
        devtool: '',
        externals: ['vue'],
        devServer: {
            proxy: {
                '/api': 'http://localhost:8848'
            },
            contentBase: '',
            compress: true,
            historyApiFallback: true,
            hot: true,
            https: false
        },
        plugins: [],
        watch: true,
        watchOptions: {
            aggregateTimeout: 2000,
            poll: 500,
        }
    };

    return webpackConfig;
};
