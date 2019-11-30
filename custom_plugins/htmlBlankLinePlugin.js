const pluginName = 'HtmlBlankLinePlugin';

class HtmlBlankLinePlugin {
    apply (complier) {
        complier.hooks.compilation.tap(pluginName, (compilation) => {
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(pluginName, (data, callback) => {
                let html = data.html;

                // 去除多个空换行为一个换行
                html = html.replace(/(\n+)/g, '\n');
                // 去除重复换行多空格为一个换行和多空格
                html = html.replace(/(\n\s+)(\n\s+)/g, '$1');
                // 将head里面的script和link变换位置
                html = html.replace(/<script(.*)script>\n<link(.*)<\/head>/, '<link$2\n    <script$1script>\n</head>');
                // 多个link换行加多空格
                html = html.replace(/(><link)/g, '>\n    <link');
                // body开始标签去除第一个子标签的多空格
                html = html.replace(/<body (.*)(\n\s+)$/, '<body $1\n');
                // body结束表情加换行
                html = html.replace(/(<\/body>)/g, '\n$1');

                data.html = html;
                callback && callback(null, data);
            });
        });
    }
}

module.exports = HtmlBlankLinePlugin;
