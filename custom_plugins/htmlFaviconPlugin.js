const pluginName = 'HtmlFaviconPlugin';

class HtmlFaviconPlugin {
    apply (complier) {
        complier.hooks.compilation.tap(pluginName, (compilation) => {
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(pluginName, (data, callback) => {
                const headNodes = data.head || [];

                headNodes.forEach(node => {
                    if (node.tagName === 'link' && node.attributes.rel === 'shortcut icon') {
                        const { href, rel } = node.attributes;

                        node.attributes = {
                            href,
                            rel,
                            type: 'image/x-icon'
                        };
                    }
                });

                callback && callback(null, data);
            });
        });
    }
}

module.exports = HtmlFaviconPlugin;
