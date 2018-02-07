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
