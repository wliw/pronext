const hooks = (function () {
    let hooks = [];
    let currentHook = 0;

    return {
        render (Component) {
            const Comp = Component();

            Comp.render();
            currentHook = 0;
            return Comp;
        },
        useEffect (callback, depArray) {
            const hasNoDeps = !depArray;
            const deps = hooks[currentHook];
            const hasChangedDeps = deps ? !depArray.every((item, index) => item === deps[index]) : true;

            if (hasNoDeps || hasChangedDeps) {
                callback();
                hooks[currentHook] = depArray;
            }
            currentHook++;
        },
        useState (initialValue) {
            hooks[currentHook] = hooks[currentHook] || initialValue;

            const setStateHookIndex = currentHook;
            const setState = newState => (hooks[setStateHookIndex] = newState);

            return [hooks[currentHook++], setState];
        }
    };
})();

export default hooks;
