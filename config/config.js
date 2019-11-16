module.exports = {
    development: {
        ORIGIN_DOMAIN: 'http://www.domain.com',
        port: 8848,
        PUBLIC_PATH: '/static/',
        API_DOMAIN: 'http://api.domain.com',
        filenameHash: false,
        devtool: 'cheap-module-eval-source-map'
    },
    local: {
        ORIGIN_DOMAIN: 'http://localwww.domain.com',
        port: 80,
        PUBLIC_PATH: 'http://localwww.domain.com/static/',
        API_DOMAIN: 'http://api.domain.com',
        filenameHash: false,
        devtool: ''
    },
    test: {
        ORIGIN_DOMAIN: 'http://testwww.domain.com',
        port: 80,
        PUBLIC_PATH: 'http://testwww.domain.com/static/',
        API_DOMAIN: 'http://api.domain.com',
        filenameHash: true,
        devtool: ''
    },
    pre: {
        ORIGIN_DOMAIN: 'http://prewww.domain.com',
        port: 80,
        PUBLIC_PATH: 'http://prewww.domain.com/static/',
        API_DOMAIN: 'http://preapi.domain.com',
        filenameHash: true,
        devtool: ''
    },
    production: {
        ORIGIN_DOMAIN: 'https://www.domain.com',
        port: 80,
        PUBLIC_PATH: 'https://www.domain.com/static/',
        API_DOMAIN: 'https://api.domain.com',
        filenameHash: true,
        devtool: ''
    }
};
