import { $ } from '@/assets/modules/dom.js';

import "@/assets/styles/common.scss";
import './index.scss';

$('js-test').addEventListener('click', () => {
    console.log('test');
}, false);

window.addEventListener('click', function (event) {
    console.log(1, event);
}, false);

const promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve(1);
    }, 1000);
});

promise.then((data) => {
    console.log('data', data);
});

