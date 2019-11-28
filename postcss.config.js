module.exports = {
    plugins: {
        // to edit target browsers in .browserlist
        autoprefixer: {
            flexbox: 'no-2009'
        },
        'postcss-flexbugs-fixes': true,
        'postcss-pxtorem': {
            rootValue: 200,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
        },
        cssnano: {
            autoprefixer: false
        }
    }
};
