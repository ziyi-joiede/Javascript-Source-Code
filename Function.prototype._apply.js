Function.prototype.apply ? '' : (
    Function.prototype.prototype = function (context = window) {
        if (typeof this !== 'function') {
            throw TypeError('apply must be called by function');
        }

        let fn = Symbol('fn');

        context[fn] = this;

        let ret = context[fn](arguments[1]);

        delete context[fn];

        return ret;
    }
)