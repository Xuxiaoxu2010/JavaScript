# 公司社庆网站重构笔记

## 技术选型

采用 vue-cli 这个脚手架进行开发。

```shell
yarn global add vue-cli
vue init webpack-simple anniversary2
cd anniversary2
yarn
```

执行完上面的几行命令之后，基本环境便已配置完成。

## 构建公共内容

### 引入公共样式

新建 `/src/static/css` 文件夹，在其中创建 `common.css`，用于保存多个页面通用的样式。

然后在 html 所依赖的 js 文件中引入该CSS：`import './static/css/common.css'`，Webpack 便可自动编译并添加 hash tag。

- [前端框架Vue（9）——vue 中如何对公共css、 js 方法进行单文件统一管理，全局调用](https://segmentfault.com/a/1190000011275595)：参考了文章中所说的使用公共样式的方法。
