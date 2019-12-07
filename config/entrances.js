const glob = require('glob');
const resolve = require('../utils/index.js');
const namespace = 'src/views';
const renderFile = 'render.js';
const dirname = resolve(namespace);
const pattern = `${dirname}/**/${renderFile}`;
const templates = glob.sync(pattern);

let entrances = (templates || []).map(template => {
    const key = template.replace(`${dirname}/`, '').replace(`/${renderFile}`, '');
    const name = `${key}.html`;
    const entry = `${dirname}/${key}/index.js`;

    return {
        key,
        name,
        entry,
        template
    };
});

module.exports = entrances;
