const install = function (plugins) {
    if (Array.isArray(plugins)) {
        for (let plugin of plugins) {
            if (typeof plugin === 'function') {
                plugin.call(null);
            } else {
                plugin.apply(null);
            }
        }
    }
};

export {
    install
};
