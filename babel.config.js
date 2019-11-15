module.exports = function (api) {
    api.cache(true);

    const plugins = [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: 2
            }
        ]
    ];
    const presets = [
        [
            '@babel/preset-env',
            {
                module: false
            }
        ]
    ];

    return {
        plugins,
        presets
    }
};
