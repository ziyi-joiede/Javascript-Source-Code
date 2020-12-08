Array.prototype._reduce = function _reduce(executor, initial) {
    if (!this || this.constructor !== Array) {
        throw new TypeError('_reduce的调用方式不正确!');
    }

    let accumulator,
        arr = this,
        len = arr.length,
        idx = 0;

    if (initial == undefined) {
        for (; idx < len; idx++) {
            if (idx in arr) {
                accumulator = arr[idx++];
                break;
            }
            if (len === 0) {
                break;
            }
            if (idx === len) {
                break;
            }
        }
    } else {
        accumulator = initial;
    }

    for (; idx < len; idx++) {
        let item = arr[idx];
        if (idx in arr) {
            accumulator = executor.call(null, accumulator, item, idx, arr);
        }
    }

    return accumulator;
}