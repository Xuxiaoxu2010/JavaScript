# Vue.js 官方文档学习笔记

## 实时更新为当前时间

下面的代码，在鼠标悬停上去时，如果不刷新页面的话，显示的总是一个固定的值，如何能够显示当前时间？

```html
<div id="app-2">
  <span v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
</div>
```

```javascript
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: '页面加载于 ' + new Date().toLocaleString()
  }
})
```

用下面的代码测试过，还是显示的固定值。

```html
<div>{{ currentTime }}</div>
```

```javascript
var app = new Vue({
  el: '#app',
  data: {
    d: {},
    currentTime: ''
  },
  methods: {
    showTime: function () {
      this.d = new Date();
      this.currentTime = `${this.d.getHours()}:${this.d.getMinutes()}:${this.d.getSeconds()}`;
    }
  }
});

window.setInterval(app.showTime(), 500);
```

## 选项对象

- 传入 Vue 实例的选项对象，内容都在 `app.$options` 中。
- 而数据属性 `data` 中的值，则在 `app.$options.data()` 中。

## 实例生命周期钩子

为什么官方文档把实例生命周期钩子也叫做选项属性（`options property`）？

出处：[Vue 实例 — Vue.js](https://cn.vuejs.org/v2/guide/instance.html)。

> 不要在选项属性或回调上使用箭头函数（Don’t use arrow functions on an options property or callback）。

## 原始 HTML

在使用 `v-html` 这个指令时，指令必须放在标准 HTML 元素的开始标签中：

```html
<!-- 正确用法 -->
<div v-html="rawHTML"></div>
```

如果这个 `div` 标签只是用于在其内部渲染所需的 DOM 节点的话，那么这个标签在渲染出来的 HTML 页面其实是多余的。

但是我们还不能把这个标签替换成 `template`，否则这个标签和其中的内容就都会被忽略掉。

```html
<!-- 错误用法 -->
<template v-html="rawHTML"></template>
```

## HTML 属性设置

用 `v-bind` 指令设置 HTML 元素的属性时，所关联的数据属性如果为假值（`null`、`undefined` 或 `false`），那么就不会添加所设置的属性。

```html
<!--  模板代码 -->
<button v-bind:disabled="isButtonDisabled">Button</button>
<!-- isButtonDisabled 为假值时，渲染出来的 HTML 代码 -->
<button>Button</button>
<!-- isButtonDisabled 为真值时，渲染出来的 HTML 代码 -->
<button disabled="disabled">Button</button>
```

## 计算属性 `getter` 函数的 `return`

如果只设置计算属性的 `getter` 函数的话，这个函数的返回值就是计算属性的值，所以不要忘了 `return`：

```javascript
computed: {
  // 计算属性的 getter
  reversedMessage: function () {
    return this.message.split('').reverse().join('');
  }
}
```

## 计算属性的 `get/set` 语法

显式设置计算属性的 `getter/setter` 时，要注意 Vue 的语法和原生 JS 的语法不太一样，Vue 的 `get/set` 关键字后面跟着的先是一个冒号，然后是匿名函数；原生 JS的 `get/set` 关键字后面则是直接跟了一个完整的非匿名函数。

```javascript
//  原生 JS
var obj = {
  get value() {
    console.log('get');
  },
  set value(val) {
    console.log('set');
  }
}

// Vue
computed: {
  fullName: {
    get: function () {
      return this.firstName + ' ' + this.lastName;
    },
    set: function (newValue) {
      var names = newValue.split(' ');
    }
  }
}
```

## 绑定 HTML Class

用 `v-bind` 指令，可以将类名动态地绑定到 HTML 元素上（因为如果只是静态绑定，那就根本用不着 `v-bind` 嘛，直接把类名写上就好了）。

绑定到 HTML Class 上的，既可以是对象，也可以是数组。不管是哪种，Vue 都会计算所绑定内容的每个值（对象就是每个属性的值，数组就是每个元素的值）。

```html
<!-- 模板代码 -->
<div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
<!-- 渲染生成的 HTML -->
<div class="active"></div>
```

```javascript
data: {
  isActive: true,
  hasError: false
}
```

传入对象时，Vue 会计算各属性的值是否为真值。以上面的代码为例，`isActive` 是真值，因此把 `active` 这个类绑定到 `div` 上了；而 `hasError` 是假值，就没有绑定`text-danger` 这个类。

上面所绑定的数据对象，也可以不内联定义在模板里，而是定义在 Vue 实例中，结果是一样的：

```html
<div v-bind:class="classObject"></div>
```

```javascript
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

对于复杂的业务，甚至还可以绑定一个计算属性——当然了，这个计算属性返回的也是对象：

```html
<div v-bind:class="classObject"></div>
```

```javascript
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

数组本质上也是对象，所以也可以绑定到 HTML Class 上：

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

```javascript
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

而数组中的元素也可以是对象（这么说来，对象中的元素也可以是数组么？）：

```html
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```
