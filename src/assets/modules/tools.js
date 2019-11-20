export let slice = Array.prototype.slice;

export function mixin (destination) {
    let sources = slice.call(arguments, 1);

    if (sources.length === 0) {
        return destination;
    }

    sources.forEach((source) => {
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                destination[key] = source[key];
            }
        }
    });

    return destination;
}

export function proxy (func, thisArg) {
    return function () {
        let args = slice.call(arguments);
        let len = args.length;

        switch (len) {
        case 0:
            return func.call(thisArg);
        case 1:
            return func.call(thisArg, args[0]);
        case 2:
            return func.call(thisArg, args[0], args[1]);
        case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        default:
            return func.apply(thisArg, args);
        }
    };
}
