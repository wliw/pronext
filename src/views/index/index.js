import './index.scss';

const $ = function (id) {
    return document.getElementById(id);
};

let jsPicWrap = $('js-pic-wrap');

jsPicWrap && jsPicWrap.setAttribute('data-index', 1);
