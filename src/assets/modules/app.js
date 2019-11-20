function App (options) {
    this._init(options);
}

function initMixin (App) {
    App.prototype._init = function (options) {
        this.init && this.init(options);
    };
}

function extendMixin (App) {
    function _extend (source, destination) {
        for (let key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                destination[key] = source[key];
            }
        }
    }

    App.extend = function (extendObj) {
        _extend(extendObj, this);
    };
}

function includeMixin (App) {
    App.include = function (plugin) {
        if (typeof plugin === 'function') {
            plugin(App);
        } else if (plugin && typeof plugin === 'object') {
            plugin.install && plugin.install.call(plugin, App);
        }

        return this;
    };
}

initMixin(App);
extendMixin(App);
includeMixin(App);

export default App;
