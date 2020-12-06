Function.prototype._apply = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('_apply 的调用方式有误!');
    }

    context = context || window;
    let fn = Symbol('key');
    context[fn] = this;

    let args = Array.prototype.slice.call(arguments, 1);

    let ret = context[fn](...args);

    delete context[fn];

    return ret;
}