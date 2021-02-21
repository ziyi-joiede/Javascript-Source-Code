Object.assign ? '' : (
    Object.defineProperty(Object, 'assign', {
        value(source, ...targets) {
            if (source == null) {
                throw new TypeError('Object.assign 的第一个参数不能为 null or undefined');
            }

            source = Object(source);

            if (targets != null) {
                for (let i = 0, l = targets.length; i < l; i++) {
                    let target = targets[i];
                    if (target != null) {
                        for (let key in target) {
                            if (Object.prototype.hasOwnProperty.call(target, key)) {
                                source[key] = target[key];
                            }
                        }
                    }
                }
            }

            return source;
        },
        configurable: true,
        writable: true
    })
)