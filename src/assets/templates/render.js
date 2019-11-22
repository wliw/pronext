import templateEjs from './template.ejs';

export default function render ({
    title = 'App',
    keywords = 'keywords',
    description = 'description',
    templates = [],
    env = process.env.DEPLOY_ENV
} = {}) {
    const contents = templates.map(template => template());

    return templateEjs({
        title,
        keywords,
        description,
        contents,
        env,
        debug: process.env.DEPLOY_ENV === 'test'
    });
}
