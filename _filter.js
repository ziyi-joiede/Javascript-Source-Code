// 返回 executor 的执行结果为 true 的元素组成的数组
Array.prototype._filter = function _filter(executor, thisArg) {
    if (!this || this.constructor !== Array) {
        throw new TypeError('_filter必须被数组的实例调用!');
    }

    let arr = this,
        len = arr.length,
        ret = [];

    for (let i = 0; i < len; i++) {
        let item = arr[i];
        if (executor.call(thisArg, item, i, arr)) {
            ret.push(item);
        }
    }

    return ret;
}