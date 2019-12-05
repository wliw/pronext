import templateEjs from './template.ejs';

export default function render ({
    title,
    keywords,
    description,
    templates = []
}) {
    let contents = templates.map(template => template());

    return templateEjs({
        title,
        keywords,
        description,
        contents,
        debug: process.env.NODE_ENV === 'test'
    });
}

