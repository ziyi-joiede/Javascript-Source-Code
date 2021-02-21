Function.prototype.softBind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('softBind must be called by function');
    }

    let _this = this;
    let outerArgs = [].slice.call(arguments, 1);

    let fn = function () {
        let innerArgs = [].slice.call(arguments);
        _this.apply(
            (!this || this === (window || global)) ? context : this,
            outerArgs.concat(innerArgs)
        )
    }
    fn.prototype = Object.create(_this.prototype);

    return fn;
}