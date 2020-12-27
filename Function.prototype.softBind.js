Function.prototype.softBind = function(obj) {
    let outerArgs = [].slice.call(arguments, 1);
    let _this = this;

    let fn = function() {
        let innerArgs = [].slice.call(arguments);
        _this.apply(
            (!this || this === (window || global)) ?
            obj : this,
            outerArgs.concat(innerArgs)
        )
    }

    fn.prototype = Object.create(_this.prototype);

    return fn;
}