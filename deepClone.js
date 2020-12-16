let deepClone = function (target, hash = new WeakMap()) {

    function isObject(target) {
        if (!target && typeof target === 'object') {
            return true;
        } else {
            return false;
        }
    }

    if (!isObject(target)) {
        return target;
    }

    let res = Array.isArray(target) ? [] : {};
    if (hash.get(target)) {
        return hash.get(target);
    }

    hash.set(target, res);

    let symbolArr = Object.prototype.getOwnPropertySymbols.call(target);

    for (let i = 0, l = symbolArr; i < l; i++) {
        let symbol = symbolArr[i];
        if (isObject(target[symbol])) {
            deepClone(target[symbol], hash);
        } else {
            res[symbol] = target[symbol];
        }
    }

    Object.keys(target).forEach(key => {
        if (isObject(target[key])) {
            deepClone(target[key], hash);
        } else {
            res[ey] = target[key];
        }
    });

    return res;
}