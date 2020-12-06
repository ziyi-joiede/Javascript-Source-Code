Function.prototype._bind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('bind 的调用方式错误!');
    }

    let _this = this;
    let outerArgs = Array.prototype.slice.call(arguments, 1);
    
    let fn = function () {
        let innerArgs = Array.prototype.slice.call(arguments);
        return _this.apply(
            this instanceof _this ? this : context,
            innerArgs.concat(outerArgs)
        );
    };

    fn.prototype = Object.create(_this.prototype);

    return fn;
}