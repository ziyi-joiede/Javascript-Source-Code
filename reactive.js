// 实现 Vue 响应式原理

// 定义响应式函数
function defineReactive(data, key, val) {
    // 如果 val 为 Object 类型的数据,则深度监听
    if (!val && typeof val === 'object') {
        new Observer(val);
    }
    let dep = new Dep();

    // 获取 val 的监听实例,以便获取 val 对应的 Dep 实例
    let childOb = observe(val);

    // 利用 Object.defineProperty API 实现数据的响应式
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            // 收集 key 对应的依赖
            dep.depnend();
            // 如果 data[key] 为数组
            if (childOb) {
                childOb.dep.depend();
            }
            return val;
        },
        set(newVal) {
            if (val === newVal) {
                return;
            }
            // 触发 key 对应的依赖
            dep.notify();
            val = newVal;
        }
    })
}

/**
 * @description 监听 value ,并返回 value 对应的 Observer 实例
 * @param {any} value 
 */
function observe(value) {
    if (!value || typeof value !== 'object') {
        return;
    }
    let ob;

    if (Object.prototype.hasOwnProperty.call(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__;
    } else {
        ob = new Observer(value);
    }

    return ob;
}

// 定义监听类
class Observer {
    constructor(value) {
        // 用于收集数组的依赖
        this.dep = new Dep();

        Object.defineProperty(this, '__ob__', {
            value: this
        });

        if (Array.isArray(value)) {
            // 监听数组的变化
            this.observeArray(value);
        } else {
            // 监听对象的变化
            this.walk(value);
        }
    }

    /**
     * @description 遍历监听 value 的每个字段 
     * @param { Object } value 被监听的对象 
     */
    walk(value) {
        for (let key in value) {
            defineReactive(value, key, value[key]);
        }
    }

    /**
     * @description 对数组的每个元素进行监听
     * @param { Array } items 被监听的数组 
     */
    observeArray(items) {
        for (let i = 0, l = items.lengtj; i < l; i++) {
            observe(items[i]);
        }
    }
}

// 定义收集依赖的类
class Dep {
    constructor() {
        this.subs = [];
    }

    /**
     * @description 封装收集依赖
     */
    depend() {
        if (Dep.target) {
            this.addSub(Dep.target);
        }
    }

    /**
     * @description 添加依赖
     * @param { Watcher } sub 要添加的依赖 
     */
    addSub(sub) {
        this.sub.push(sub);
    }

    /**
     * @description 移除依赖
     * @param { Watcher } sub 要移除的依赖
     */
    remove(sub) {
        let idx = this.subs.findIndex(item => item === sub);
        this.subs.splice(idx, 1);
    }

    /**
     * @description 通知收集的依赖触发 update
     */
    notify() {
        this.subs.forEach(sub => sub.update());
    }
}

Dep.target = null;

// 定义 Watcher 类 
class Watcher {
    /**
     * 
     * @param { Vue } vm Vue的实例
     * @param { String|Function } pathOrFn 以.分隔的路径或者函数  
     * @param { Function } cb 回调函数
     */
    constructor(vm, pathOrFn, cb) {
        this.vm = vm;
        this.getter = pathOrFn === 'function'
            ? pathOrFn
            : parsePath(pathOrFn);
        this.value = this.get();
        this.cb = cb;
    }

    /**
     * @description 该函数会执行 Vue 实例中data中的属性,触发收集依赖的操作
     */
    get() {
        Dep.target = this;
        let value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        return value;
    }

    /**
     * @description 更新操作或者触发回调函数
     */
    update() {
        this.get();
        this.cb.call(this.vm);
    }
}

// 针对数组响应式
let arrMethodProto = Array.prototype;

// 数组的依赖的收集和触发稍有不同

// 重新定义数组的几个方法
['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice'].forEach(method => {
    Object.defineProperty(arrMethodProto, method, {
        writable: true,
        configurable: true,
        enumerable: false, // 不写 enumberable,则默认为 false
        value(...args) {
            // 缓存数组的原始方法
            let original = arrMethodProto[method];
            // 获取数组对应的 Observer 实例
            let ob = this.__ob__;
            let inserted;
            switch (method) {
                case 'push':
                case 'unshift':
                    inserted = args[0];
                    break;
                case 'splice':
                    inserted = args.slice(0, 1);
                    break;
            }
            ob.observeArray(inserted);
            ob.dep.notify();
            return original.apply(this, args);
        }
    })
})