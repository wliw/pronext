let animationEnd = (function () {
    let div = document.createElement('div');
    let animationEnds = [
        {
            key: 'animation',
            value: 'animationend'
        }, {
            key: 'OAnimation',
            value: 'oAnimationEnd'
        }, {
            key: 'MozAnimation',
            value: 'animationend'
        }, {
            key: 'WebkitAnimation',
            value: 'webkitAnimationEnd'
        }
    ];
    let animationEndEventName = null;

    for (let i = 0, len = animationEnds.length; i < len; i++) {
        let item = animationEnds[i];

        if (div.style[item.key] !== undefined) {
            animationEndEventName = item.value;
            break;
        }
    }

    return (div = animationEnds = null, animationEndEventName);
})();

let animationStart = (function () {
    if (!animationEnd) {
        return animationEnd;
    }

    let endNameFirstLetter = animationEnd.slice(-3, -2);
    let startName = 'start';

    if (endNameFirstLetter.toLowerCase() !== endNameFirstLetter) {
        startName = 'Start';
    }

    return `${animationEnd.slice(0, -3)}${startName}`;
})();

export {
    animationEnd,
    animationStart
};
