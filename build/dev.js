const DEPLOY_ENV = 'development';
const merge = require('webpack-merge');
const resolve = require('../utils/index.js');
const config = require('../config/config.js')[DEPLOY_ENV];
const webpackConfig = require('../config/webpack.config.js')(DEPLOY_ENV);

module.exports = merge(webpackConfig, {
    mode: 'development',
    bail: false,
    output: {
        filename: 'js/[name].js?[hash:8]',
        chunkFilename: 'js/[name].js?[chunkhash:8]'
    },
    module: {
        rules: [
            {
                test: /.s?css$/,
                use: [
                    'style-loader',
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
    }
});
