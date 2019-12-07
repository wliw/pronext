export const $ = (function () {
    const doc = document;
    const getElementById = doc.getElementById;

    return function (id) {
        return getElementById.call(doc, id);
    };
})();
