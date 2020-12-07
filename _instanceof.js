const _instanceof = function _instanceof(L, R) {
    
    if (typeof R !== 'function') {
        throw new TypeError('_instanceof右侧必须为一个函数');
    }

    L = Object(L).__proto__;
    let o = R.prototype;
    while (true) {
        if (L === o) {
            return true;
        } else {
            if (L === null) {
                return false;
            } else {
                L = L.__proto__;
            }
        }
    }
}