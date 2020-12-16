
Array._isArray = function () {
    let target = arguments[0];
    if (target && target.constructor.name === Array) {
        return true;
    } else {
        return false;
    }
}