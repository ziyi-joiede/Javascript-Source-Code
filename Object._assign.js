Object.defineProperty(Object, '_assign', {
    value(target) {
        if (target == null) {
            throw new TypeError('target 不能为null或undefined');
        }

        target = Object(target);

        let args = Array.prototype.slice.call(arguments, 1);
        if (args != null) {
            for (let i = 0, len = args.length; i < len; i++) {
                let item = args[i];
                if (item != null) {
                    for (let key in item) {
                        if (Object.prototype.hasOwnProperty.call(item, key)) {
                            target[key] = item[key];
                        }
                    }
                }
            }
        }
        return target;
    },
    writable: true,
    configurable: true,
    enumerable: false
})