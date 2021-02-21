Promise
    ? ''
    : (
        class Promise {
            constructor(executor) {
                if (typeof executor !== 'function') {
                    throw new TypeError('executor must be a funciton');
                }

                this.value = undefined;
                this.state = 'pending';
                this.reason = undefined;

                this.resolveQueue = [];
                this.rejectQueue = [];

                let _resolve = (value) => {
                    let run = () => {
                        if (this.state !== 'pending') {
                            return;
                        }
                        this.value = value;
                        this.state = 'resolved';
                        while (this.resolveQueue.length) {
                            let cb = this.resolveQueue.shift();
                            cb();
                        }
                    };
                    setTimeout(run);
                };
                let _reject = (err) => {
                    let run = () => {
                        if (this.state !== 'pending') {
                            return;
                        }
                        this.reason = err;
                        this.state = 'rejected';
                        while (this.rejectQueue.length) {
                            let cb = this.rejectQueue.shift();
                            cb();
                        }
                    };
                    setTimeout(run);
                }

                executor(_resolve, _reject);
            }

            then(onFulfill, onReject) {
                typeof onFulfill === 'function' ? '' : (onFulfill = value => value);
                typeof onReject === 'function' ? '' : (onReject = err => { throw err });

                return new Promsie((resolve, reject) => {

                    let _resolve = (value) => {
                        try {
                            let ret = onFulfill(value);
                            ret instanceof Promise ? ret.then(resolve, reject) : resolve(ret);
                        } catch (ex) {
                            reject(ex);
                        }
                    }

                    let _reject = (err) => {
                        try {
                            let ret = onReject(err);
                            ret instanceof Promise ? ret.then(resolve, reject) : resolve(ret);
                        } catch (ex) {
                            reject(ex)
                        }
                    }

                    switch (this.state) {
                        case 'pending':
                            this.resolveQueue.push(onFulfill);
                            this.rejectQueue.push(onReject);
                            break;
                        case 'resolved':
                            _resolve(this.value);
                            break;
                        case 'rejected':
                            _reject(this.reason);
                            break;
                    }
                });
            }

            catch(fn) {
                return this.then(undefined, fn);
            }

            finally(fn) {
                return this.then(
                    value => {
                        Promise.resolve(fn()).then(() => value)
                    },
                    err => {
                        Promise.resolve(fn()).then(() => { throw err })
                    }
                )
            }

            static resolve(value) {
                if (value instanceof Promise) {
                    return value;
                }
                return new Promise((resolve, reject) => {
                    resolve(value);
                })
            }
            static reject(value) {
                return new Promise((resolve, reject) => {
                    reject(value);
                })
            }
            static race(promiseArr) {
                return new Promsie((resolve, reject) => {
                    for (let p of promiseArr) {
                        Promise.resolve(p).then(
                            value => {
                                resolve(value);
                            },
                            err => {
                                reject(err);
                            }
                        )
                    }
                });
            }
            static all(promiseArr) {
                return new Promsie((resolve, reject) => {
                    let ret = [];
                    for (let i = 0, l = promiseArr.length; i < l; i++) {
                        let p = promiseArr[i];
                        Promsie.resolve(p).then(
                            value => {
                                if (ret.length === l) {
                                    resolve(ret);
                                }
                                ret[i] = value;
                            },
                            err => {
                                reject(err)
                            }
                        )
                    }
                })
            }
        }
    )