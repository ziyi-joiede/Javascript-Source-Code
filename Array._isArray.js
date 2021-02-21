Array._isArray = function () {
    let target = arguments[0];
    return target && target.constructor.name === 'Array';
}