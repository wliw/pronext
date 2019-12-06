import './index.scss';

const $ = function (id) {
    return document.getElementById(id);
};

window.addEventListener('click', function (event) {
    console.log(1, event);
}, false);

$('js-test').addEventListener('click', (event) => {
    event.stopPropagation();

    import(
        /* webpackChunkName: 'test' */
        /* webpackMode: 'lazy' */
        './test.js'
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

