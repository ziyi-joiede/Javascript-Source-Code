let Promise = function Promise(executor) {
    this.value = undefined;
    this.state = 'pending';
    this.reason = undefined;

    this.resolveQueue = [];
    this.rejectQueue = [];

    let _resolve = (value) => {
        if (this.state !== 'pending') {
            return;
        }
        let run = () => {
            this.value = value;
            this.state = 'resolved';

            while (this.resolveQueue.length) {
                let cb = this.resolveQueue.shift();
                cb(value);
            }
        };
        setTimeout(run);
    }

    let _reject = (err) => {
        if (this.state !== 'pending') {
            return;
        }
        let run = () => {
            this.reason = err;
            this.state = 'rejected';

            while (this.resolveQueue.length) {
                let cb = this.rejectQueue.shift();
                cb(err);
            }
        }

        setTimeout(run);
    }

    executor(_resolve, _reject);
}

Promise.prototype.then = function then(onFullfill, onReject) {
    onFullfill = typeof onFullfill === 'function' ? onFullfill : value => value;
    onReject = typeof onReject === 'function' ? onReject : (err) => { throw (err) };
    return new Promise((resolve, reject) => {
        let _resolve = (value) => {
            try {
                let ret = onFullfill(value);
                ret instanceof Promise ? ret.then(onFullfill, onFullfill) : resolve(ret);
            } catch (e) {
                reject(e)
            }
        };

        let _reject = (err) => {
            try {
                let ret = onReject(err);
                ret instanceof Promise ? ret.then(onFullfill, onReject) : resolve(ret);

            } catch (e) {
                reject(e);
            }
        };

        switch (this.state) {
            case 'pending':
                this.resolveQueue.push(onFullfill);
                this.rejectQueue.push(onReject);
                break;
            case 'resolved':
                try {
                    _resolve(this.value);
                } catch (err) {
                    reject(err);
                }
                break;
            case 'rejected':
                try {
                    _reject(this.reason);
                } catch (err) {
                    reject(err);
                }
                break;
        }
    });
};

Promise.prototype.catch = function _catch(onReject) {
    return this.then(undefined, onReject);
}

Promise.prototype.finally = function _finally(fn) {
    return this.then(
        value => {
            Promise.resolve(fn()).then(() => value);
        },
        err => {
            Promise.resolve(fn()).then(() => { throw err });
        }
    )
};

Promise.resolve = function _resolve(value) {
    if (value instanceof Promise) {
        return value;
    }
    return new Promise((resolve, reject) => {
        resolve(value);
    });
}

Promise.reject = function _reject(err) {
    return new Promise((resolve, reject) => {
        reject(err);
    });
}

Promise.all = function all(prmoiseArr) {
    return new Promise((resolve, reject) => {
        let ret = [];
        for (let i = 0, len = prmoiseArr.length; i < len; i++) {
            Promise.resolve(p).then(
                value => {
                    ret[i] = value;
                    if (ret.length === len) {
                        resolve(ret);
                    }
                },
                err => {
                    reject(err);
                }
            )
        }
    })
}

Promise.race = function race(prmoiseArr) {
    return new Promise((resolve, reject) => {
        for (let p of prmoiseArr) {
            Promise.resolve(p).then(
                value => {
                    resolve(value);
                },
                err => {
                    reject(err);
                }
            );
        }
    });
}