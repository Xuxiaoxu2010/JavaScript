# 公司社庆网站重构笔记

## 明确思想

- 纯粹的组件化开发，要把页面想象成一个树状的结构。
- 所有页面，都共用这个树的根部。
- 主干分支就是各个页面。
- 小分支就是页面中的各个组件。

- `html` 页面的 `head` 出自树根，这样才能达到公用的效果。
- 参考：[vue-hackernews-2.0/src/index.template.html](https://github.com/vuejs/vue-hackernews-2.0/blob/master/src/index.template.html)
- 注意：上面这个示例，`index.template.html` 文件只负责公用的 `head` 部分，具体页面的构建，查看项目根目录的 `server.js`。

## 技术选型

采用 vue-cli 这个脚手架进行开发。

```shell
yarn global add vue-cli
vue init webpack-simple anniversary2
cd anniversary2
yarn
```

执行完上面的几行命令之后，基本环境便已配置完成。

## 构建公共资源

### 引入公共样式

#### normalize.css

在 `index.html` 中引入了 `normalize.css`，用于统一化基础样式。在 html 文件中所引入的样式，在编译后的页面中位于最前面的位置。

**注意**：引入 cdn 提供的文件之后，要在浏览器中查看一下文件是否正常显示，比如之前引用了 [staticfile](https://www.staticfile.org/) 上面的 `normalize.css`，发现样式未生效，点击文件链接，才发现都是乱码。所以还是得使用靠谱的大厂商提供的 cdn 服务。

#### common.css

新建 `/src/static/css` 文件夹，在其中创建 `common.css`，用于保存多个页面通用的样式。

然后在 html 所依赖的 js 文件中引入该CSS：`import './static/css/common.css'`，Webpack 便可自动编译并添加 hash tag。

- [前端框架Vue（9）——vue 中如何对公共css、 js 方法进行单文件统一管理，全局调用](https://segmentfault.com/a/1190000011275595)：参考了文章中所说的使用公共样式的方法。

#### 样式的先后顺序

在 `main.js` 中，虽然用下面的顺序引入的各个文件，但是组件中的样式，在编译后的页面中，位置是排在 `common.css` 中的内容之后的。

```js
import App from './App.vue'
import './static/css/common.css'
```

#### 样式设置

**注意**：用 Vue.js 进行组件化开发，如果元素的宽高用百分比作为单位，那么其各级父元素也必须明确设置单位为百分比的宽度或者高度！

