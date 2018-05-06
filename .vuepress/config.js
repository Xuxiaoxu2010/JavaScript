const { readdirSync } = require('fs');
const { join } = require('path');

const getFilesPath = path => {
  const filesPath = readdirSync(join('.', path));
  return filesPath.map(filePath => join(path, filePath));
}

module.exports = {
  title: '岁月留痕',
  description: '记录编程之路的点点滴滴',
  // dev 模式下不显示 favicon？
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ],
  serviceWorker: true,
  themeConfig: {
    repo: 'Dream4ever/JavaScript',
    editLinks: true,
    // 设置了上面的 repo 之后，顶部导航栏默认会显示 GitHub 链接
    // 无需在 nav 中再专门设置
    nav: [
      {
        text: '博客',
        link: '/index/index',
      },
    ],
    // 在这里设置的 sidebar 的属性
    // 适用于所有页面
    // 当打开 sidebar 中定义的页面时
    // 默认只显示该页面的二级标题
    // 除非定义了下面的 sidebarDepth 属性为 2，才会显示三级标题
    sidebar: [
      {
        title: '方法论',
        children: getFilesPath('how-to-learn-js'),
      }, {
        title: '每周总结',
        children: getFilesPath('weekly-review'),
      }, {
        title: '系列课程之一 - 入门',
        children: getFilesPath('js-elementary'),
      }, {
        title: '系列课程之二 - 进阶',
        children: getFilesPath('js-advanced'),
      }, {
        title: 'WebApp 项目学习笔记',
        children: getFilesPath('webapp'),
      }, {
        title: '系列课程之三 - Vue.js 进阶',
        children: getFilesPath('vue-advanced'),
      }, {
        title: '公司业务',
        children: getFilesPath('business'),
      }, {
        title: '服务器配置',
        children: getFilesPath('server-configuration'),
      },
    ],
    sidebarDepth: 2,
  }
}
