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

## 计算属性

如果只设置计算属性的 `getter` 函数的话，这个函数的返回值就是计算属性的值，所以不要忘了 `return`：

```javascript
computed: {
  // 计算属性的 getter
  reversedMessage: function () {
    return this.message.split('').reverse().join('');
  }
}
```
