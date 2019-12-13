// demo log plugin
class DemoLogPlugin {
    static install () {
        if (DemoLogPlugin.installed) {
            return false;
        }

        DemoLogPlugin.installed = true;
        return new DemoLogPlugin();
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

export default DemoLogPlugin;
