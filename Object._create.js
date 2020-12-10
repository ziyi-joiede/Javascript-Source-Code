Object.defineProperty(Object, '_create', {
    configurable: true,
    enumerable: false,
    value(prototype, properties) {
        let Ctor = function () { }
        Ctor.prototype = prototype;
        let o = new Ctor();
        if (prototype) {
            o.constructor = Ctor;
        }

        if (properties !== undefined) {
            if (Object(properties) === undefined) {
                throw new TypeError('');
            }

            Object.defineProperties(o, properties);
        }

        return o;

    },
    writable: true
})