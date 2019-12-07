import Render from '@/assets/templates/render.js';
import Index from './index.ejs';

export default Render({
    title: 'title',
    keywords: 'hello',
    description: 'world',
    templates: [Index]
});
