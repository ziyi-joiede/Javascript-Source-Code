let throttle = function (fn, delay) {
    let prev = Date.now();
    return function () {
        let args = Array.from(arguments);
        let curr = Date.now();
        if (curr - prev > delay) {
            fn.apply(this, args);
            prev = curr;
        }
    }
}