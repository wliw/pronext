const renderTemplate = require('./index.ejs');

export default function render ({
    title = 'App',
    keywords = 'keywords',
    description = 'description',
    env = process.env.DEPLOY_ENV,
    debug = false
} = {}) {
    return renderTemplate({
        title,
        keywords,
        description,
        env,
        debug
    });
}
