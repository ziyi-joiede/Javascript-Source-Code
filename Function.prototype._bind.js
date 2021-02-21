Function.prototype.bind ? '' : (
    Function.prototype.bind = function (context) {
        if (typeof this !== 'function') {
            throw new TypeError('bind must be called by function');
        }

        let _this = this;
        let outerArgs = Array.prototype.slice(arguments, 1);

        let fn = function () {
            let innerArgs = Array.prototype.slice(arguments);
            return _this.apply(
                this instanceof _this ? this : context,
                outerArgs.concat(innerArgs)
            )
        }
        fn.prototype = Object.create(_this.prototype);
        return fn;
    }
)