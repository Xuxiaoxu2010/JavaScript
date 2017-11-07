# this - JavaScript | MDN

原文链接：[this - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

---

## 全局上下文

在全局执行上下文（在所有函数外部）之中，不管是否开启了严格模式，`this` 都是代表全局对象。

```javascript
// 在浏览器中，window 对象就是全局对象
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = 'MDN';
console.log(window.b); // 'MDN'
console.log(b); // 'MDN'
```

## 函数上下文

在函数中，`this` 的值与该函数的调用方式相关。

### 简单调用

在**非严格模式**中，以普通方式调用的函数，在函数内，`this` 的值默认就是全局对象，在浏览器中，全局对象是 `window`，在 Node 中则是 `global`。

```javascript
function f1() { return this; }

// 在浏览器中
f1() === window // true
// 在 Node 中
f1() === global // true
```

在**严格模式**中，进入函数执行上下文时，为 `this` 设置的是什么值，就是什么值；如果没有设置，默认就是 `undefined`。

```javascript
function f2() {
    'use strict';
    return this;
}

f2() === undefined; // true
// 在浏览器中
window.f2() === window; // true
// 在 Node 中
global.f2() === global; // true
```

如果要把 `this` 的值从一个上下文传递到另一个上下文中，就要用到 `call` 或者 `apply` 了：

```javascript
// 对象可以作为参数传入到 call 或者 apply 方法中，并与之绑定
var obj = { a: 'Custom' };
// 为全局对象添加了一个属性
var a = 'Global';

function whatsThis(arg) {
    return this.a;
}

//不带参数调用函数，则 this 默认指向全局对象
whatsThis(); // "Global"
// 以对象 obj 作为参数调用 call 或者 apply，函数内的 this 指向的就是对象 obj 而不是全局对象了
whatsThis.call(obj); // "Custom"
whatsThis.apply(obj); // "Custom"
```

如果一个函数在函数体中使用了关键字 `this`，并且通过 `call` 或者 `apply` 调用了这个函数并传入了一个独特的对象作为**第一个**参数的话，`this` 的值就会绑定到这个独特的参数上。（所有函数都会从 `Function.prototype` 这个原型中继承 `call` 和 `apply` 这两个方法。）

```javascript
function add(c, d) {
    return this.a + this.b + c + d;
}

var o = { a: 1, b: 3 };

// 第一个参数对象在函数里作为 this 来使用，后续的参数则作为函数的实参被传入
add.call(o, 5, 7); // 16

// 第一个参数对象在函数里作为 this 来使用，第二个参数数组则作为函数的实参列表被传入
add.apply(o, [10, 20]); // 34
```

作为 `this` 被传入 `call` 和 `apply` 的第一个参数，如果不是对象，则会使用内部的 `ToObject` 操作将其转换为对象。如果传入的是原始值，就会使用对应的构造函数进行转换。比如数字原始值就会用 `new Number(1)` 进行转换，字符串原始值就会使用 `new String('foo')` 进行转换。

```javascript
function bar() {
    // 该函数会调用参数所属的原型的 toString() 方法
    console.log(Object.prototype.toString.call(this));
}

bar.call(7); // [object Number]
bar.call('foo'); // [object String]
```
