Object.defineProperty(Object.prototype, '__proto__', {
    enumerable: false,
    configurable: true,
    get() {
        return Object.getPrototypeOf(this);
    },
    set(o) {
        Object.setPrototypeOf(this, o);
        return o;
    }
})