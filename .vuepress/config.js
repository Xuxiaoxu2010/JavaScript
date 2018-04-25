module.exports = {
  title: '岁月留痕',
  description: '记录编程之路的点点滴滴',
  themeConfig: {
    nav: [
      { text: '博客', link: '/' },
      { text: 'GitHub', link: 'http://github.com/Dream4ever' },
    ],
    sidebar: [
      ''
    ]
  }
}

function genSidebarConfig (path) {
  return [
    {
      collapsable: false,
      children: [
        '',
        'getting-started',
        'basic-config',
        'assets',
        'markdown',
        'using-vue',
        'custom-themes',
        'i18n',
        'deploy'
      ]
    }
  ]
}
