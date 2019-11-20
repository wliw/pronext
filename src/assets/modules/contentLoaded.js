/**
 * https://github.com/dperini/ContentLoaded
 */

export default function contentLoaded (win, func) {
    let top = null;
    let done = false;
    let doc = win.document;
    let modern = doc.addEventListener;
    let prefix = modern ? '' : 'on';
    let add = modern ? 'addEventListener' : 'attachEvent';
    let rem = modern ? 'removeEventListener' : 'detachEvent';
    let DOMLoadedEvent = modern ? 'DOMContentLoaded' : 'readystatechange';

    function init (evt) {
        // IE < 9的浏览器
        if (evt.type === 'readystatechange' && doc.readyState !== 'complete') {
            return false;
        }

        // 移除domReady事件
        (evt.type === 'load' ? win : doc)[rem](prefix + evt.type, init, false);
        !done && (done = true) && func.call(win, evt.type || evt);
    }

    if (doc.readyState === 'complete' || (doc.readyState !== 'loading' && !doc.documentElement.doScroll)) {
        // 捕获到已经执行过contentLoaded事件，直接触发
        return setTimeout(function () {
            func.call(win, 'lazy');
        });
    }

    try {
        top = !modern && !win.frameElement && doc.documentElement;
    } catch (err) {
        console.log(err);
    }

    if (top && top.doScroll) {
        (function poll () {
            try {
                top.doScroll('left');
            } catch (err) {
                return setTimeout(poll, 50);
            }
            init('poll');
        })();
    }

    doc[add](prefix + DOMLoadedEvent, init, false);
    win[add](prefix + 'load', init, false);
}
