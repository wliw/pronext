import logsInstall from '@/assets/modules/logs/index.js';
import { $ } from '@/assets/modules/dom.js';

logsInstall();

import "@/assets/styles/common.scss";
import './index.scss';

window.addEventListener('click', function (event) {
    console.log(1, event);
}, false);

let eventTarget = new EventTarget();
let event = new CustomEvent('myEvent', {
    detail: 'test'
});

eventTarget.addEventListener('myEvent', () => {
    console.log('trigger cutom event');
}, false);

$('js-index').addEventListener('click', handleClick, false);
$('js-index').addEventListener('click', handleClick, false);

function handleClick () {
    // event = event || window.event;
    // event.stopPropagation();
    console.log('click');
    eventTarget.dispatchEvent(event);
}

const promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve(1);
    }, 1000);
});

promise.then((data) => {
    console.log('data', data);
});

