import Render from '@/assets/templates/render.js';
import template from './template.ejs';

export default Render({
    title: 'title',
    keywords: 'hello',
    description: 'world',
    templates: [template]
});
