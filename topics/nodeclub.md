# Nodeclub 项目学习笔记

项目链接：[cnodejs/nodeclub](https://github.com/cnodejs/nodeclub)

---

# 安装部署

## 安装 Node.js

```shell
> nvm install 4.4.0
```

## 安装 MongoDB

```shell
> brew update # 先更新 brew
> brew install mongodb --with-openssl # 安装支持 TLS/SSL 的 MongoDB
> brew services start mongodb # 启动 MongoDB，并设置为开机启动
```

但是查看安装日志的时候，发现按照上面的命令安装的 MongoDB 并不支持 TLS/SSL，好吧，那就先这样。

![Brew install MongoDB](https://raw.githubusercontent.com/Dream4ever/Pics/master/brew-install-mongodb.png)

## 运行 MongoDB

```shell
> sudo mkdir -p /data/db # 新建 MongoDB 默认使用的数据文件夹
> sudo chmod 777 /data/db # 设置数据文件夹的权限
> mongod #
```

如果一切正常，MongoDB 运行起来后的状态如下图。

![MongoDB Running Status](https://raw.githubusercontent.com/Dream4ever/Pics/master/mongodb-running-status.png)

按下 `Ctrl+C` 停止 MongoDB，然后遵照下图的要求，配置它的安全设置。

![MongoDB Security Issue](https://raw.githubusercontent.com/Dream4ever/Pics/master/mongodb-security-issue.png)
