const renderTemplate = require('./index.ejs');

export default function render ({
    debug = false,
    env = process.env.DEPLOY_ENV
} = {}) {
    return renderTemplate({
        env,
        debug
    });
}
