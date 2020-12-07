
Array.prototype._map = function _map(executor, thisArg) {

    if (!this || this.constructor !== Array) {
        throw new TypeError('_map的调用方式错误!');
    }

    let arr = this,
        len = arr.length,
        ret = [];

    for (let i = 0; i < len; i++) {
        let item = arr[i];
        ret[i] = executor.call(thisArg, item, i, arr);
    }

    return ret;
}   