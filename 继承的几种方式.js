

// 1.原型链继承
{
    function Super() { }
    function Sub() { }
    Sub.prototype = new Super();

    // 所有子类实例共享同一个原型,
    // 当存在引用类型的属性时,一个子类实例修改该属性,
    // 会导致所有的子类实例都受到影响
}


// 2.构造函数继承
{
    function Super() { }
    function Sub() {
        Subper.call(this);
    }

    // 只能继承父类实例的属性和方法,
    // 不能继承父类原型的属性和方法
}

// 3.组合继承
{
    function Super() { }
    function Sub() {
        Subper.call(this);
    }

    Sub.prototype = new Super();

    // 父类构造函数执行次数过多
}

// 4.原型继承
{
    function Super() { }
    function createObject(Super) {
        let Fn = function () { };
        Fn.prototype = Super;
        let o = new Fn();
        return o;
    }

    // 与原型链继承同理
}

// 5.寄生继承
{
    function Super() { }
    function Sub(Super) {
        let Fn = function () { };
        Fn.prototype = Super;
        let clone = new Fn();

        clone.fn = function () { };

        return clone;
    }

    // clone 的 fn 不能复用
}

// 6.组合寄生式继承
{
    function Subper() { }
    function Sub() {
        Super.call(this);
    }
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
}