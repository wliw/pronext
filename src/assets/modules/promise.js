const status = {
    pending: 'PENDING',
    resolve: 'RESOLVE',
    reject: 'REJECT'
};

class Promise {
    constructor (executor) {
        const that = this;

        function resolve (value) {
            if (that.status === status.pending) {
                let handle = setTimeout(() => {
                    handle && clearTimeout(handle);
                    handle = null;

                    that.status = status.resolve;
                    that.value = value;
                    that.resolveCallbacks.forEach((resolveCallback) => {
                        resolveCallback(that.value);
                    });
                }, 0);
            }
        }

        function reject (reason) {
            if (that.status === status.pending) {
                let handle = setTimeout(() => {
                    handle && clearTimeout(handle);
                    handle = null;

                    that.status = status.resolve;
                    that.reason = reason;
                    that.rejectCallbacks.forEach((rejectCallback) => {
                        rejectCallback(that.reason);
                    });
                }, 0);
            }
        }

        this.value = void 0;
        this.reason = void 0;
        this.status = status.pending;
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then (resolve, reject) {
        let promise = null;

        if (this.status === status.resolve) {
            promise = new Promise(() => {
                setTimeout(() => {
                    resolve(this.value);
                }, 0);
            });
        }

        if (this.status === status.reject) {
            promise = new Promise(() => {

            });
        }

        return promise;
    }
}

export default Promise;
