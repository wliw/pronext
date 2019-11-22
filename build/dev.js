const DEPLOY_ENV = 'development';
const merge = require('webpack-merge');
const resolve = require('../utils/index.js');
const config = require('../config/config.js')[DEPLOY_ENV];
const webpackConfig = require('../config/webpack.config.js')(DEPLOY_ENV);

module.exports = merge(webpackConfig, {
    mode: 'development',
    // performance: {
    //     hints: 'error'
    // },
    devServer: {
        contentBase: resolve('dist'),
        host: config.host,
        port: config.port,
        compress: true,
        hot: true,
        open: true,
        // proxy: {
        //     '/api': config.API_DOMAIN
        // },
        // https: {
        //     key: fs.readFileSync('/path/to/server.key'),
        //     cert: fs.readFileSync('/path/to/server.crt'),
        //     ca: fs.readFileSync('/path/to/ca.pem')
        // },
        historyApiFallback: true
    }
});
