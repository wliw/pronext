/**
 * 日志系统
 */
import demoLogPlugin from './demoLogPlugin.js';

class Logs {
    constructor (initialPlugins) {
        this.installedPlugins = [];
        this.watchers = [];

        this._init(initialPlugins);
    }

    _init (initialPlugins) {
        initialPlugins.forEach(plugin => {
            this.use(plugin);
        });

        this.bindEvent();
    }

    use (plugin) {
        const installedPlugins = this.installedPlugins || (this.installedPlugins = []);
        const install = plugin && plugin.install;
        let watcher  = null;

        if (~installedPlugins.indexOf(plugin)) {
            return this;
        }

        if (typeof install === 'function') {
            watcher = install.call(plugin);
        } else if (typeof plugin === 'function') {
            watcher = plugin.call(null);
        }

        this._used(plugin, watcher);
    }

    _used (plugin, watcher) {
        const watchers = this.watchers || (this.watchers = []);

        this.installedPlugins.push(plugin);
        watcher && watchers.push(watcher);
    }

    bindEvent () {
        window.addEventListener('load', () => {
            this.$notice('load');
        });
    }

    $notice (data) {
        const watchers = this.watchers || (this.watchers = []);

        watchers.forEach(watcher => {
            watcher.$update && watcher.$update(data);
        });
    }
}

function install () {
    function createLogsInstance (initialPlugins) {
        return new Logs(initialPlugins);
    }

    const logs = createLogsInstance([
        demoLogPlugin
    ]);

    logs.Logs = Logs;
    logs.create = function (initialPlugins) {
        return createLogsInstance(initialPlugins);
    };

    return logs;
}

export default install;
