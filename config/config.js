module.exports = {
    development: {
        ORIGIN_DOMAIN: 'http://127.0.0.1',
        host: '127.0.0.1',
        port: 8688,
        PUBLIC_PATH: '/',
        STATIC_PATH: 'static/',
        API_DOMAIN: 'http://testapi.domain.com',
        filenameHash: false,
        cache: true,
        devtool: 'cheap-module-eval-source-map'
    },
    local: {
        ORIGIN_DOMAIN: 'http://localwww.domain.com',
        host: 'localwww.domain.com',
        port: 80,
        PUBLIC_PATH: 'http://localwww.domain.com/',
        STATIC_PATH: 'static/',
        API_DOMAIN: 'http://testapi.domain.com',
        filenameHash: false,
        cache: false,
        devtool: ''
    },
    test: {
        ORIGIN_DOMAIN: 'http://testwww.domain.com',
        host: 'testwww.domain.com',
        port: 80,
        PUBLIC_PATH: 'http://testwww.domain.com/',
        STATIC_PATH: 'http://teststatic.domain.com/static/',
        API_DOMAIN: 'http://testapi.domain.com',
        filenameHash: true,
        cache: false,
        devtool: ''
    },
    pre: {
        ORIGIN_DOMAIN: 'https://prewww.domain.com',
        host: 'prewww.domain.com',
        port: 80,
        PUBLIC_PATH: 'https://prewww.domain.com/',
        STATIC_PATH: 'https://prestitic.domain.com/static/',
        API_DOMAIN: 'https://preapi.domain.com',
        filenameHash: true,
        cache: false,
        devtool: ''
    },
    production: {
        ORIGIN_DOMAIN: 'https://www.domain.com',
        host: 'www.domain.com',
        port: 80,
        PUBLIC_PATH: 'https://www.domain.com/',
        STATIC_PATH: 'https://static.domain.com/static/',
        API_DOMAIN: 'https://api.domain.com',
        filenameHash: true,
        cache: false,
        devtool: ''
    }
};
