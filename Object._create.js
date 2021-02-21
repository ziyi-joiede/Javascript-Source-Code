Object.create ? '' : (
    Object.defineProperty(Object, 'create', {
        value(prototype, properties) {
            function Fn() { };
            Fn.prototype = prototype;
            let ret = new Fn();

            if (properties != null) {
                if (Object(properties) !== undefined) {
                    Object.defineProperties(properties);
                }
            }

            return ret;
        },
        writable: true,
        configurable: true
    })
)