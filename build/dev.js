const DEPLOY_ENV = 'development';
const merge = require('webpack-merge');
const resolve = require('../utils/index.js');
const config = require('../config/config.js')[DEPLOY_ENV];
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackConfig = require('../config/webpack.config.js')(DEPLOY_ENV);

module.exports = merge(webpackConfig, {
    mode: 'development',
    bail: false,
    optimization: {
        namedChunks: true
    },
    devServer: {
        // proxy: {
        //     '/api': config.API_DOMAIN
        // },
        // https: {
        //     key: fs.readFileSync('/path/to/server.key'),
        //     cert: fs.readFileSync('/path/to/server.crt'),
        //     ca: fs.readFileSync('/path/to/ca.pem')
        // },
        contentBase: resolve('dist'),
        host: config.host,
        port: config.port,
        compress: true,
        hot: true,
        open: true,
        historyApiFallback: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css?[hash:8]',
            chunkFilename: 'css/[id].css?[hash:8]'
        })
    ]
});
