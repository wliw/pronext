module.exports = function (api) {
    api.cache(true);

    const plugins = [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: 3
            }
        ]
    ];
    const presets = [
        [
            '@babel/preset-env',
            {
                module: false,
                useBuiltIns: 'usage'
            }
        ]
    ];

    return {
        plugins,
        presets
    };
};
