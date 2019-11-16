const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('../config/webpack.config.js');

/**
 * [DEPLOY_ENV 构建环境变量]
 * @type {[type]} local、test、pre和production，缺省值：production
 */
let DEPLOY_ENV = process.env.DEPLOY_ENV || 'production';

module.exports = merge(webpackConfig(DEPLOY_ENV), {
    optimization: {
        splitChunks: {

        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ]
});

