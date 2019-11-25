/**
 * [DEPLOY_ENV 构建环境变量]
 * @type {[type]} local、test、pre和production，缺省值：production
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const DEPLOY_ENV = process.env.DEPLOY_ENV || 'production';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackConfig = require('../config/webpack.config.js')(DEPLOY_ENV);
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(webpackConfig, {
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {

        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin()
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest'
        // })
    ]
});

