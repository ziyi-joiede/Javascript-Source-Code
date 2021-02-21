let deepClone = function (source, hash = new WeakMap()) {
    const isObject = (target) => {
        return target !== null && typeof target === 'object';
    }

    if (!isObject(source)) {
        return source;
    }

    if (Object.prototype.toString.call(source) === '[object Date]') {
        return new Date(source);
    }

    if (Object.prototype.toString.call(source) === '[object RegExp]') {
        return new RegExp(source);
    }

    if (hash.has(source)) {
        return hash.get(source);
    }

    let allDescriptors = Object.getOwnPropertyDescriptors(source);

    let res = Object.create(Object.getPrototypeOf(source), allDescriptors);

    hash.set(source, res);

    for (let key of Reflect.ownKeys(source)) {
        res[key] = isObject(source[key])
            ? deepClone(source[key], hash)
            : souce[key];
    }

    return res;
}