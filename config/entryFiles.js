const resolve = require('../utils/index.js');

const prefix = 'src/views';

module.exports = [
    {
        key: 'index',
        name: 'index.html',
        entry: resolve(`${prefix}/index/index.js`),
        template: resolve(`${prefix}/index/render.js`)
    }
];
