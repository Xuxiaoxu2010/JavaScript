## 项目地址：[vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)

## 项目框架

![Overall Architecture](https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png)

我们先不看具体的代码，先看看上面这张描绘了项目整体框架的示意图。

### src

左侧的源代码，包括两大部分：

Universal Application Code/全局应用代码：包含 Store、Router 和 Components 这三大部分。

Store 中保存的是：XX，Router 中是路由设置，Components 则是组件的内容。

TODO: 但是图中 Universal Application Code 这一部分和 app.js、Server entry 以及 Client entry 之间的关系，暂时还没太看明白。

只能从源代码中看到，app.js 引入了 Store 和 Router 中的内容，而 Server entry 以及 Client entry 又引入了 app.js，形成了依次引用的关系。

### Webpack
