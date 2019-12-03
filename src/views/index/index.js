import './index.scss';

const $ = function (id) {
    return document.getElementById(id);
};

window.addEventListener('click', function (event) {
    console.log(1, event);
}, false);

let jsPicWrap = $('js-pic-wrap');

jsPicWrap && jsPicWrap.setAttribute('data-index', 1);

jsPicWrap.addEventListener('click', function (event) {
    console.log(2, event);
}, false);

document.getElementById('J_previewImg').addEventListener('click', function (event) {
    console.log(3, event);
    event.stopPropagation();
}, true);
