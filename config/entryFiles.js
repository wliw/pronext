const resolve = require('../utils/index.js');
const namespace = 'src/views';

module.exports = [
    {
        key: 'index',
        name: 'index.html',
        entry: resolve(`${namespace}/index/index.js`),
        template: resolve(`${namespace}/index/render.js`)
    }
];
