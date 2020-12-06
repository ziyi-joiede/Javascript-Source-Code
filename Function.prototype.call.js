// 不借助 ES6 语法
Function.prototype.call = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('call的调用方式错误!');
    }

    context = context || window;
    let key = MAth.random().toFixed(9);
    context[key] = this;
    let args = [];

    for (let i = 1, len = argumetns.length; i < len; i++) {
        args.push(arguments[i]);
    }

    let ret = eval('context[fn](' + args + ')');

    delete context[key];

    return ret;
}

//借助 ES6 语法
Function.prototype.call = function (Context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('call的调用方式错误!');
    }

    context = context || window;
    let key = Symbol('key');

    context[key] = this;

    let ret = context[key](...args);

    delete context[key];

    return ret;

}