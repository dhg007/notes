- 实现一个new操作符
    1. 它创建了一个全新的对象。
    2. 它会被执行[[Prototype]]（也就是__proto__）链接。
    3. 它使this指向新创建的对象。
    4. 通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上。
如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用将返回该对象引用。

```js
function myNew(fn) {
    let res = {}

    if (fn.prototype !== null) {
        res.__proto__ = fn.prototype;
    }

    let ret = fn.apply(res, Array.prototype.slice.call(arguments, 1));

    if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
        return ret;
    }

    return res
}
// myNew(fn, ...args)
```


- 实现一个 call, apply, bind

```js
Function.prototype._call = function(context = window) {
    context.fn = this;
    let hasArg = arguments.length
    let ret = hasArg ? context.fn(...[...arguments].slice(1)): context.fn();
    delete context.fn;
    return ret
}

Function.prototype._apply = function(context = window) {
    context.fn = this;
    let hasArg = arguments.length
    let ret = hasArg ? context.fn(...[...arguments].slice(1)): context.fn();
    delete context.fn;
    return ret
}

Function.prototype._bind = function(content) {
    if(typeof this != "function") {
        throw Error("not a function")
    }
    // 若没问参数类型则从这开始写
    let fn = this;
    let args = [...arguments].slice(1);
    
    let resFn = function() {
        return fn.apply(this instanceof resFn ? this : content,  args.concat(...arguments) )
    }
    function tmp() {}
    tmp.prototype = this.prototype;
    resFn.prototype = new tmp();
    
    return resFn;
}

```