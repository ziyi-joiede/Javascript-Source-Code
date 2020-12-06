// new 关键字的原理即实现

// 1.定义一个对象;
// 2.把该对象的继承自Ctor;
// 3.执行Ctor并改变其this的指向
// 4.Ctor是否返回对象,若返回则指向该对象,否则返回 步骤1 声明的对象
let _new = function _new(Ctor, ...args) {
    if (typeof Ctor !== 'function') {
        throw TypeError('new的调用方式错误!');
    }

    let obj = Object.create(null);

    Object.setPrototypeOf
        ? Object.setPrototypeOf(obj, Ctor.prototype)
        : (obj.__proto__ = Object.create(Ctor.prototype));

    let ret = Ctor.apply(obj, args);

    return !ret && typeof ret === 'object' ? ret : obj;

}