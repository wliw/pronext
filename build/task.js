/**
 * [DEPLOY_ENV 构建环境变量]
 * @type {[type]} local、test、pre和production，缺省值：production
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const DEPLOY_ENV = process.env.DEPLOY_ENV || 'production';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackConfig = require('../config/webpack.config.js')(DEPLOY_ENV);
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlFaviconPlugin = require('../custom_plugins/htmlFaviconPlugin.js');
const HtmlBlankLinePlugin = require('../custom_plugins/htmlBlankLinePlugin');

module.exports = merge(webpackConfig, {
    module: {
        rules: [
            {
                test: /.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    stats: {
        cached: false,
        cachedAssets: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        hash: false,
        modules: false,
        reasons: false,
        timings: true,
        version: false
    },
    optimization: {
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        minimizer: [
            new TerserJSPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: true
                    },
                    output: {
                        comments: false,
                        beautify: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'initial'
                },
                commons: {
                    priority: -20,
                    test: /[\\/]src[\\/]assets[\\/]/,
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new HtmlFaviconPlugin(),
        new HtmlBlankLinePlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        })
    ]
});

