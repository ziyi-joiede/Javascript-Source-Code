let debounce = function (fn, delay) {
    let timer = null;
    return function () {
        let args = Array.from(arguments);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}