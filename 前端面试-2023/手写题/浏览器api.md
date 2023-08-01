# 常见题

1. new

```js

    function _new(constuctor, ...args){
        // 步骤1：使用构造函数的原型创建一个新对象。
        const o = Object.create(constuctor.prototype)

        // 步骤2：以新对象为上下文('this')调用构造函数。
        const ret = constuctor.apply(o, args)

        // 步骤3：检查构造函数是否返回了一个对象。如果没有，返回新对象。
        return typeof ret === 'object' && ret !== null ? ret : o
    }

```

