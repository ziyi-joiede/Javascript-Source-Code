Function.prototype.call ? '' : (
    Function.prototype.call = function (context = window) {
        if (typeof this !== 'function') {
            throw new TypeError('call must be called by function');
        }

        let fn = Symbol('fn');

        context[fn] = this;

        let args = [];
        for (let i = 1, l = arguments.length; i < l; i++) {
            args.push(arguments[i]);
        }

        let ret = context[fn](...args);

        delete context[fn];

        return ret;
    }
)