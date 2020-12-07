
let _extends = function _extends(Sub, Super) {
    if (typeof Sub !== 'function' || typeof Super !== 'function') {
        throw new TypeError('_extends调用方式错误!');
    }

    // 继承原型的属性和方法
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;

    // 继承静态方法
    Object.setPrototypeOf
        ? Object.setPrototypeOf(Sub, Super)
        : (Sub.__proto__ = Super);
}