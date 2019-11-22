module.exports = function (api) {
    api.cache(true);

    const plugins = [
        '@babel/plugin-transform-runtime'
    ];
    const presets = [
        [
            '@babel/preset-env',
            {
                modules: false,
                useBuiltIns: 'usage',
                corejs: 3
            }
        ]
    ];

    return {
        plugins,
        presets
    };
};
