import logsInstall from '@/assets/modules/logs/index.js';
import { $ } from '@/assets/modules/dom.js';

logsInstall();

import "@/assets/styles/common.scss";
import './index.scss';

window.addEventListener('click', function (event) {
    console.log(1, event);
}, false);

$('js-index').addEventListener('click', (event) => {
    event.stopPropagation();

    import(
        /* webpackChunkName: 'other' */
        /* webpackMode: 'lazy' */
        './other.js'
    ).then(({ a }) => {
        console.log('import');
        console.log(a);
    });
}, true);

const promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve(1);
    }, 1000);
});

promise.then((data) => {
    console.log('data', data);
});

