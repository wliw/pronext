/**
 * Created by wlw1 on 2019/11/28
 * 统一日志模块
 */

const logs = (function Logs (initialPlugins) {
    class Logs {
        constructor (initialPlugins) {
            this.installedPlugins = [];
            this.watchers = [];

            this._init(initialPlugins);
        }

        _init (initialPlugins) {
            initialPlugins.forEach(plugin => {
                this._use(plugin);
            });

            this._bindEvent();
        }

        _use (plugin) {
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

        _bindEvent () {

        }

        $notice (data) {
            console.log(data);
        }
    }

    const logs = new Logs(initialPlugins);

    return function use (plugin) {
        logs._use(plugin);
    };
})([
    DemoLog
]);

class DemoLog {
    static install () {
        if (DemoLog.installed) {
            return false;
        }

        DemoLog.installed = true;
        return new DemoLog();
    }

    constructor (options) {
        const config = {
            url: 'https://demo.domain.com'
        };

        this.config = Object.assign(config, options);
        this.init();
    }

    $update (errorData) {
        console.log(errorData);
    }

    init () {
        // ...init
    }
}

export default logs;
