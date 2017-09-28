# 阿里云轻量应用服务器教程

- [阿里云轻量应用服务器教程](#%E9%98%BF%E9%87%8C%E4%BA%91%E8%BD%BB%E9%87%8F%E5%BA%94%E7%94%A8%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%95%99%E7%A8%8B)
    - [服务器购买及开通](#%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%B4%AD%E4%B9%B0%E5%8F%8A%E5%BC%80%E9%80%9A)
    - [远程登录服务器](#%E8%BF%9C%E7%A8%8B%E7%99%BB%E5%BD%95%E6%9C%8D%E5%8A%A1%E5%99%A8)
        - [设置密钥](#%E8%AE%BE%E7%BD%AE%E5%AF%86%E9%92%A5)
        - [Windows 下通过 SSH 客户端连接至服务器](#windows-%E4%B8%8B%E9%80%9A%E8%BF%87-ssh-%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%BF%9E%E6%8E%A5%E8%87%B3%E6%9C%8D%E5%8A%A1%E5%99%A8)
        - [Mac 下通过终端连接至服务器](#mac-%E4%B8%8B%E9%80%9A%E8%BF%87%E7%BB%88%E7%AB%AF%E8%BF%9E%E6%8E%A5%E8%87%B3%E6%9C%8D%E5%8A%A1%E5%99%A8)
            - [步骤一：准备 pem 密钥文件](#%E6%AD%A5%E9%AA%A4%E4%B8%80%EF%BC%9A%E5%87%86%E5%A4%87-pem-%E5%AF%86%E9%92%A5%E6%96%87%E4%BB%B6)
            - [步骤二：SSH 连接至服务器](#%E6%AD%A5%E9%AA%A4%E4%BA%8C%EF%BC%9Assh-%E8%BF%9E%E6%8E%A5%E8%87%B3%E6%9C%8D%E5%8A%A1%E5%99%A8)
        - [步骤三：保存 SSH 会话：好人做到底，送佛送到西](#%E6%AD%A5%E9%AA%A4%E4%B8%89%EF%BC%9A%E4%BF%9D%E5%AD%98-ssh-%E4%BC%9A%E8%AF%9D%EF%BC%9A%E5%A5%BD%E4%BA%BA%E5%81%9A%E5%88%B0%E5%BA%95%EF%BC%8C%E9%80%81%E4%BD%9B%E9%80%81%E5%88%B0%E8%A5%BF)
        - [步骤四：启用密码登录](#%E6%AD%A5%E9%AA%A4%E5%9B%9B%EF%BC%9A%E5%90%AF%E7%94%A8%E5%AF%86%E7%A0%81%E7%99%BB%E5%BD%95)
    - [更新系统中所有程序包（package）](#%E6%9B%B4%E6%96%B0%E7%B3%BB%E7%BB%9F%E4%B8%AD%E6%89%80%E6%9C%89%E7%A8%8B%E5%BA%8F%E5%8C%85%EF%BC%88package%EF%BC%89)
    - [配置 node 环境](#%E9%85%8D%E7%BD%AE-node-%E7%8E%AF%E5%A2%83)
        - [安装最新版 node.js](#%E5%AE%89%E8%A3%85%E6%9C%80%E6%96%B0%E7%89%88-nodejs)
    - [配置 Express 框架](#%E9%85%8D%E7%BD%AE-express-%E6%A1%86%E6%9E%B6)
        - [安装 Express](#%E5%AE%89%E8%A3%85-express)
        - [创建项目](#%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE)
        - [启动项目](#%E5%90%AF%E5%8A%A8%E9%A1%B9%E7%9B%AE)
    - [配置域名](#%E9%85%8D%E7%BD%AE%E5%9F%9F%E5%90%8D)
        - [购买域名](#%E8%B4%AD%E4%B9%B0%E5%9F%9F%E5%90%8D)
        - [设置 GoDaddy 域名解析](#%E8%AE%BE%E7%BD%AE-godaddy-%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90)
        - [设置 阿里云云解析](#%E8%AE%BE%E7%BD%AE-%E9%98%BF%E9%87%8C%E4%BA%91%E4%BA%91%E8%A7%A3%E6%9E%90)

## 服务器购买及开通

这个步骤很简单，选好配置，下单，付款，等几分钟服务器就自动运行起来了。

我购买的服务器配置：

- CPU：1核
- 内存：1G
- 硬盘：20G SSD云盘
- 区域：北京（离自己所在城市最近）
- 操作系统：CentOS 7
- 应用镜像：Node.js 4.8.4

## 远程登录服务器

### 设置密钥

服务器运行起来之后，有两种方式可以登录服务器，一种是在浏览器中登录，便捷，但功能不够强大。

另一种就是在 Windows 或者 Mac 中通过专门的软件来登录。

为了保证远程登录的安全，阿里云会要求生成密钥并下载 pem 文件至本地，登录时需要用到这个文件。下面就分别说一下在 Windows 和 Mac 下如何建立 SSH 安全连接。

### Windows 下通过 SSH 客户端连接至服务器

Windows 下的操作流程，按照官方文档来就可以了，每一步都列出来了，照着操作就行。

具体操作步骤请查看[通过本地 SSH 客户端连接服务器](https://help.aliyun.com/document_detail/59083.html?spm=5176.10173289.0.0.378f90fd0Orgcq)一文中，“本地为 Windows 环境”的这一小节。

### Mac 下通过终端连接至服务器

Mac 自带的终端或者 iTerm 就可以很好地完成这件事，无需另外安装软件。

#### 步骤一：准备 pem 密钥文件

本机存放 SSH 相关文件的目录位于 `~/.ssh` ，所以把前面下载到本地的 pem 文件复制到这里就行。

```shell
> cd ~/.ssh
> sudo cp ~/Downloads/swas.pem swas.pem
```

然后设置 pem 文件的权限。

```shell
> chmod 400 swas.pem
```

#### 步骤二：SSH 连接至服务器

```shell
// 10.10.10.10仅作说明用，请将这个IP改成服务器的实际IP
> ssh root@10.10.10.10 -i ~/.ssh/swas.pem
```

输入上面的命令之后，如果成功登录，则会显示类似下面的信息，说明登录成功。

```shell
Last login: Wed Sep 27 10:18:43 2017 from 22.22.22.22

Welcome to Alibaba Cloud Elastic Compute Service !

-bash: warning: setlocale: LC_CTYPE: cannot change locale (UTF-8): No such file or directory
manpath: can't set the locale; make sure $LC_* and $LANG are correct
[root@XXXX ~]#
```

然后我们再输入 `exit` 关闭 SSH 连接，进行下面的操作。

### 步骤三：保存 SSH 会话：好人做到底，送佛送到西

在 Mac 下，自然要用 iTerm2 这款强大的终端软件。通过在软件中设置 Profile，就能方便地一键连接至服务器。

1. 运行 iTerm2，按下快捷键 `⌘+,`，打开 iTerm2 的选项设置对话框。
1. 点击 Profiles 这个标签，我们来新建一个 Profile（配置文件），用于实现一键连接服务器的功能。
1. 参照下图，点击界面左下角的加号 +，新建一个 Profile。Name 为这个 Profile 的名称，Tag 可以当做注释，Shortcut key 是快速启动这个 Profile 的快捷键，由于在 Mac 下，微信占用了 ^⌘A 这个快捷键用作截图，所以在这里我把快捷键设置为 ^⌘1。Command 那里，就填第二步中的一长串命令。
1. 设置完成，关闭选项设置对话框，然后在 iTerm2 中按下快捷键 ^⌘1，开始玩服务器吧！

![iTerm2 Profile - Save SSH Session](https://raw.githubusercontent.com/Dream4ever/Pics/master/iterm2-ssh-session.png)

参考资料：

- [通过本地 SSH 客户端连接服务器 - 本地为 Linux 或支持 SSH 命令的环境](https://help.aliyun.com/document_detail/59083.html?spm=5176.10173289.0.0.2d2fedd63Boph1)：按照教程“本地为 Linux 或支持 SSH 命令的环境”这一小节里的说明，用 `chmod` 命令设置 pem 文件的权限。
- [connecting to amazon aws linux server by ssh on mac](https://stackoverflow.com/a/14230817)：参考这个回答，将 pem 文件放到 `~/.ssh` 目录下。
- [Fast SSH Windows With iTerm 2](https://hiltmon.com/blog/2013/07/18/fast-ssh-windows-with-iterm-2/)：参考这个回答，在 iTerm2 中保存 SSH 会话，通过快捷键可立即连接至服务器。

### 步骤四：启用密码登录

由于启用 SSH 登录方式之后，服务器默认会将 root 帐号密码登录的方式禁用掉。而自己不知道做了什么修改，使得在 Mac 下无法通过密钥登录，只好再次开启密码登录的方式。

在 Windows 上登录服务器，然后做如下操作。

```shell
sudo vi /etc/ssh/sshd_config
// 在 vim 中将 PasswordAuthentication no 改为 PasswordAuthentication yes，然后保存退出
sudo systemctl restart sshd
// 上面的命令重启了 sshd，这样在 Mac 中就可以用密码登录 root 帐号了
```

参考资料：

- [启用密钥后恢复账号密码登录](https://help.aliyun.com/document_detail/59083.html?spm=5176.10173289.0.0.244123376jXRwl#activeroot)
- [ssh : Permission denied (publickey,gssapi-with-mic)](https://stackoverflow.com/questions/36300446/ssh-permission-denied-publickey-gssapi-with-mic)

## 更新系统中所有程序包（package）

装好了系统，先把所有程序都更新到最新版。

```shell
> yum update
```

执行了上面的命令之后，会提示有许多 packages 需要更新，可能还有几个 packages 需要安装，按下 `y` 键，开始更新。

## 配置 node 环境

所购买的服务器，自带的 node.js 版本为 4.8.4，实在是有点儿老，果断给它升级一下。

### 安装最新版 node.js

```shell
> nvm install latest
// 有时 nvm 不识别 latest 指令，就得明确指定 node 的版本了
> nvm install 8.6.0
```

上面的命令，会安装最新版 8.6.0。

```shell
> nvm ls
->       v4.8.4
         v8.6.0
default -> 4 (-> v4.8.4)
node -> stable (-> v8.6.0) (default)
stable -> 8.6 (-> v8.6.0) (default)
iojs -> N/A (default)
lts/* -> lts/boron (-> N/A)
lts/argon -> v4.8.4
lts/boron -> v6.11.3 (-> N/A)
```

安装完成后，还需要配置 nvm 使用该版本，并将该版本设置成默认版本。因为如果不设置成默认版本，下次再连接服务器时，会发现默认版本还是之前的 4.8.4。

```shell
> nvm use 8.6.0
> nvm alias default 8.6.0
```

这次断开连接之后，再重新连接服务器，啊哈！当前使用的版本和默认的版本就都是 8.6.0 啦。

```shell
> nvm ls
         v4.8.4
->       v8.6.0
default -> 8.6.0 (-> v8.6.0)
node -> stable (-> v8.6.0) (default)
stable -> 8.6 (-> v8.6.0) (default)
iojs -> N/A (default)
lts/* -> lts/boron (-> N/A)
lts/argon -> v4.8.4
lts/boron -> v6.11.3 (-> N/A)
```

参考资料：

- [Set default node version with NVM](https://eric.blog/2016/08/23/set-default-node-version-with-nvm/)：文章里给出了设置 nvm 中默认 node 版本的方法。

## 配置 Express 框架

### 安装 Express

基本的 node.js 环境建立起来了，那就先用 Express 搭建一个简单的网页框架，首先把 Express 框架安装好。

```shell
> npm install -g express
> npm install -g express-generator
```

### 创建项目

然后再用 Express 这个框架创建一个默认的项目。

```shell
> express blog
> cd blog
> npm install
```

### 启动项目

项目建立起来之后，当然要运行一下看看啦。好，那就执行 `npm start`，然后在网页中访问 [http://10.10.10.10:3000](http://10.10.10.10:3000)，嗯？为什么打不开呢？想起来购买的这个服务器还装了 nginx 这个反向代理，是不是和它有关？

Google 一番，发现原来需要在服务器控制台的“防火墙”中开放 3000 这个端口，于是新建一个应用类型为“自定义”的端口，协议选择“TCP”，端口号设置为“3000”。

然后再重启刚才新建的 Express 项目，并访问上面的那个网址，啊哈，可以访问了！

参考资料：

- [阿里云ubuntu nginx无法访问，求解答](https://segmentfault.com/q/1010000009437407)

## 配置域名

### 购买域名

买了服务器，不能只是用 IP 来访问，当然要买个域名了。上网查了一番，决定购买 GoDaddy 家的域名，比了比后缀和价格，最后买下了 [hewei.in](http://hewei.in) 这个域名。

### 设置 GoDaddy 域名解析

买了域名之后，还要设置 DNS 用于域名的解析。有两种方式：

第一种方式是用 GoDaddy 自家的域名解析服务，参照下图中设置 GoDaddy 的域名解析。红圈标注的地方设置为服务器的 IP，其它选项全用默认值。

![GoDaddy DNS Setting](https://raw.githubusercontent.com/Dream4ever/Pics/master/godaddy-dns-setting.png)

然后还要在阿里云的云解析中，添加域名的 A 记录和 CNAME 记录。

![AliYun DNS Setting](https://raw.githubusercontent.com/Dream4ever/Pics/master/aliyun-dns-setting.png)

然后等待十分钟左右，域名解析生效了，就可以访问啦~

小知识：什么是 A 记录？什么又是 CNAME 记录？

A 记录，就是将前面购买的域名，指向自己的服务器 IP，这样域名才能真正生效。设置 A 记录之前，只能通过 IP 访问服务器；添加了 A 记录之后，就可以通过域名访问服务器了。

而 CNAME 记录，则是将其它域名重定向到自己购买的域名，最常见的，就是将带了 `www.` 前缀的域名，指向自己购买的域名。像上图中那样，添加了主机记录为 www 的 CNAME 记录之后，访问 www.hewei.in，就会自动重定向到 hewei.in 了。

### 设置 阿里云云解析

第二种设置域名解析的方式，是完全由阿里云来解析域名。这个就留给大家来自行探索吧！哈哈~

参考资料：

- [GoDaddy 域名修改 DNS 方法](https://help.aliyun.com/knowledge_detail/39851.html)