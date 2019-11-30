const pluginName = 'HtmlBlankLinePlugin';

class HtmlBlankLinePlugin {
    apply (complier) {
        complier.hooks.compilation.tap(pluginName, (compilation) => {
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(pluginName, (data, callback) => {
                let html = data.html;

                html = html.replace(/(\n+)/g, '\n');
                // const headEndLinkReg = /<link(.*)<\/head>/;
                // let html = data.html;
                // let headEndLink = html.match(headEndLinkReg);

                // if (headEndLink && headEndLink[1]) {
                //     const headEndLinkString = `<link${headEndLink[1]}`;

                //     html = html.replace(headEndLinkString, '');
                //     html = html.replace(/(<script.*script>)/, `${headEndLinkString}\n    $1`);
                // }

                // html = html.replace(/(<link)/g, '\n    $1');
                // html = html.replace(/<\/(head|body)>/g, '\n</$1>');
                // html = html.replace(/\n(\s+)\n(\s+)/g, '\n');
                // html = html.replace(/\n+/g, '\n');
                // html = html.replace(/\n<link/, '\n    <link');
                data.html = html;
                callback && callback(null, data);
            });
        });
    }
}

module.exports = HtmlBlankLinePlugin;
