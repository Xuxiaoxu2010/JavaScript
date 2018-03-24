# 配置 PM2 实现代码自动发布

## 参考文档

- [Quick Start](http://pm2.keymetrics.io/docs/usage/quick-start/)
- [Deployment](http://pm2.keymetrics.io/docs/usage/deployment/)

## 先期准备

PM2 的代码自动发布依赖 GitHub 或类似功能的网站，所以需要先在 GitHub 上添加个人电脑和远程服务器的 SSH 秘钥。

大体流程如下（ Mac 和 Linux 系列的系统直接在终端中执行指令，Windows 需要先安装 Git 客户端）：

1. [检查本机是否有现成的 SSH 秘钥](https://help.github.com/articles/checking-for-existing-ssh-keys/#platform-windows)。
2. 没有秘钥的话，[生成一个新的秘钥并添加到本机的 ssh-agent 中](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)。如果已经有秘钥了，则[直接添加到本机的 ssh-agent 中](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/#adding-your-ssh-key-to-the-ssh-agent)。
3. [将 SSH 秘钥添加到 GitHub 账号中](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)。
4. [测试 SSH 连接](https://help.github.com/articles/testing-your-ssh-connection/)，这里一定要测试成功才行。连接成功的，能看到下面这段文字：

```shell
Hi XXX! You've successfully authenticated, but GitHub does not provide shell access.
```

要注意，自己的个人电脑和远程服务器都要做这一整套操作，这样才能够在本机发布代码到 GitHub 上，再让远程服务器把最新的代码更新过去。

## 安装 PM2

在本机和服务器都全局安装 PM2，用 `npm` 或 `yarn` 均可，如果下载速度慢，记得先[切换成淘宝的 npm 源](http://xugaoyang.com/post/5aa238c3b1745b11c007ffd1)。

注意，如果两边电脑上的 Git 不是最新版，强烈建议更新到最新版。不然可能有代码无法及时同步的问题，服务器始终无法 pull 到最新版本的代码，很闹心。

## 本机配置 PM2

在本机的终端环境中，用 `pm2 ecosystem` 命令生成一份原始的 PM2 配置文件 `ecosystem.confi.js`。注意，官网文档和实际操作的结果不一致，文档上说执行这个命令会生成 `ecosystem.json` 这个文件，但自己操作的时候并不是这样，大家也要注意一下。

为了方便大家参考，把自己修改后的配置文件内容贴了上来，只贴了重要的部分，别的地方不用修改。

```javascript
module.exports = {
  apps : [
    // 目前只用 PM2 管理一个项目，所以这里删除了多余的内容
    {
      name      : 'RMS',
      // 这里是项目的启动文件，不过自己没用上
      script    : './dist/bin/www',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'dev'
      }
    }
  ],

  // 部署环境的设置，自己只用到了开发环境，需要修改完代码之后立刻看到结果，所以就没有打包编译的过程
  deploy : {
    dev : {
      // 是服务器上进行日常操作的用户
      user : 'www',
      // 是自己的服务器的 IP
      host : '1.2.3.4',
      ref  : 'origin/master',
      repo : 'git@github.com:Dream4ever/rms.git',
      // 项目要部署到服务器上的位置，PM2 默认会部署到该路径的 source 子文件夹下
      path : '/home/www/websites/rms',
      // 服务器下载到最新的代码之后要执行的命令，自己把 npm 命令改成了 yarn
      'post-deploy' : 'yarn && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
```

## 部署项目

配置完成之后，就要开始把项目通过 PM2 自动部署到服务器上了。

如果之前没有通过 SSH 连接过服务器，就需要先在本机执行 `ssh-copy-id www@1.2.3.4` 这个命令，把本机的 SSH 秘钥信息添加到服务器上，这个配置成功之后，以后就不需要再执行了。

然后初始化远程服务器上的项目：`pm2 deploy ecosystem.confi.js dev setup`。命令中的 `dev` 指的是在上面配置文件中写的部署环境的名称，对于同时需要设置开发和生产环境的情况，就根据自己需要初始化两次吧，没这个需求的就不用管了。

接着就是部署项目，通俗地说，也就是让服务器把自己 push 到 GitHub 上的最新代码下载过来：`pm2 deploy ecosystem.confi.js dev`。

在这两个过程中，都可以看到服务器上的操作指令和结果都显示到本机的终端上了。

一般没什么问题的话，经过这几步操作，就能部署成功了。

如果部署的是 Node.js 服务，当然还需要把它启动起来才行。一种方式就是通过 PM2 的 `exec` 指令让远程服务器执行指定的命令，另一种方式则是直接 SSH 登录到服务器上执命令，各取所好吧。

如果在本机执行，可以用这种形式：`pm2 deploy production exec "pm2 start ./api/bin/www`。如果登录到服务器上执行的话，就直接执行 `pm2 start ./api/bin/www` 就好了。

对于在本机用 ES6 语法写代码的同学，有一点要注意。因为自己在本机用的是 `babel-preset`，但是这一套指令不知道怎么让它在服务器上运行，所以用了 PM2 官网提供的另一种方法，就是用 `--interpreter babel-node` 这个参数来执行。

```shell
pm2 deploy production exec "pm2 start ./api/bin/www --interpreter babel-node"
```

官网还提供了另一种方法，是 PM2 作者个人比较喜欢的方式。就是用一个入口文件通过 `require()` 命令引用原本的入口文件，虽然会影响性能，但是也有它的好处。

文档的地址：[Using transpilers with PM2](http://pm2.keymetrics.io/docs/tutorials/using-transpilers-with-pm2)。

## 管理项目

先列出官网提供的 [CheatSheet](http://pm2.keymetrics.io/docs/usage/quick-start/#cheatsheet)。

自己在使用 PM2 的时候，主要也就是 `pm2 start xx.js --watch`，以监控模式启动项目，这样就能和 nodemon、supervisor 一样，在最新版的代码部署到服务器之后，自动重启服务。

还有就是 `pm2 monit`，用来在终端监控服务的运行情况。

另外还有一个指令就是 `pm2 logs app`，用来查看 `app` 这个项目的日志。如果只是执行 `pm2 logs` 的话，就会显示所有项目的日志，看着会比较乱。

好了，文档到这里就结束了，感兴趣的话，就快试试吧！
