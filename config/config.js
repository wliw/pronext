module.exports = {
    development: {
        ORIGIN_DOMAIN: 'http://127.0.0.1',
        host: '127.0.0.1',
        port: 8848,
        PUBLIC_PATH: '/',
        STATIC_PATH: 'static/',
        API_DOMAIN: 'http://api.domain.com',
        filenameHash: false,
        devtool: 'cheap-module-eval-source-map'
    },
    local: {
        ORIGIN_DOMAIN: 'http://localwww.domain.com',
        host: 'localwww.domain.com',
        port: 80,
        PUBLIC_PATH: 'http://localwww.domain.com/',
        STATIC_PATH: 'static/',
        API_DOMAIN: 'http://api.domain.com',
        filenameHash: false,
        devtool: ''
    },
    test: {
        ORIGIN_DOMAIN: 'http://testwww.domain.com',
        host: 'testwww.domain.com',
        port: 80,
        PUBLIC_PATH: 'http://testwww.domain.com/',
        STATIC_PATH: 'static/',
        API_DOMAIN: 'http://api.domain.com',
        filenameHash: true,
        devtool: ''
    },
    pre: {
        ORIGIN_DOMAIN: 'http://prewww.domain.com',
        host: 'prewww.domain.com',
        port: 80,
        PUBLIC_PATH: 'http://prewww.domain.com/',
        STATIC_PATH: 'static/',
        API_DOMAIN: 'http://preapi.domain.com',
        filenameHash: true,
        devtool: ''
    },
    production: {
        ORIGIN_DOMAIN: 'https://www.domain.com',
        host: 'www.domain.com',
        port: 80,
        PUBLIC_PATH: 'https://www.domain.com/',
        STATIC_PATH: 'static/',
        API_DOMAIN: 'https://api.domain.com',
        filenameHash: true,
        devtool: ''
    }
};
