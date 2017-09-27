# 阿里云轻量应用服务器教程

## 服务器购买及开通

这个步骤很简单，选好配置，下单，付款，等几分钟服务器就自动运行起来了。

我购买的服务器配置：1核、1G内存、20G SSD云盘、北京区域（离自己所在城市最近）。

## 远程登录服务器

### 设置密钥

服务器运行起来之后，有两种方式可以登录服务器，一种是在浏览器中登录，便捷，但功能不够强大。

另一种就是在 Windows 或者 Mac 中通过专门的软件来登录。

为了保证远程登录的安全，阿里云会要求生成密钥并下载 pem 文件至本地，登录时需要用到这个文件。下面就分别说一下在 Windows 和 Mac 下如何建立 SSH 安全连接。

### Windows 下通过 SSH 客户端连接至服务器

Windows 下的操作流程，按照官方文档来就可以了，每一步都列出来了，照着操作就行：

[通过本地 SSH 客户端连接服务器 - 本地为 Windows 环境](https://help.aliyun.com/document_detail/59083.html?spm=5176.10173289.0.0.378f90fd0Orgcq#本地为 Windows 环境)。

### Mac 下通过终端连接至服务器

Mac 自带的终端或者 iTerm 就可以很好地完成这件事，无需另外安装软件。

#### 步骤一：准备 pem 密钥文件

本机存放 SSH 相关文件的目录位于 `~/.ssh` ，所以把前面下载到本地的 pem 文件复制到这里就行。

```shell
cd ~/.ssh
cp ~/Downloads/aliyun-server.pem aliyun-server.pem
```

然后设置 pem 文件的权限。

```shell
chmod 400 aliyun-server.pem
```

#### 步骤二：SSH 连接至服务器

```shell
// 10.10.10.10仅作说明用，请将这个IP改成服务器的实际IP
ssh root@10.10.10.10 -i ~/.ssh/aliyun-server.pem
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
