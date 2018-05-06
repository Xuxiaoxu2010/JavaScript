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
      [
        '/how-to-learn-js/',
        '如何学习 JS？',
      ],
      [
        '/weekly-review/',
        '每周总结',
      ],
      [
        '/book/js-definitive-guide',
        '犀牛书学习笔记',
      ],
    ],
    sidebarDepth: 2,
  }
}
