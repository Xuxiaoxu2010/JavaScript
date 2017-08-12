# Git常用操作笔记

## 为什么要先add再commit呢？

徐老师周五中午加餐，给大家讲解git基本操作的涵义。借着这个机会，我也来说一下我对git add、git commit的理解吧。

### git add

这个命令存在的意义，是让我可以只提交（commit）一部分文件。为什么会有这样的需求？

举个例子，我想写个网站，那么一般都是一次写一个小功能，写完了再写下一个小功能。

假如我今天时间有限，但是客户又想看我完成了哪些工作。

注册功能我写完了，是文件a.js；登录功能还没写完，是文件b.js。

那么我用git add a.js，将这个文件加入暂存区。

然后执行git commit -m "XXX"，将这个文件提交至本地仓库。

再用git push origin master，将修改推送至服务器。

这样，客户就能够在网上看到我今天完成的注册功能了。

参考资料：

- [Git: add vs push vs commit](https://stackoverflow.com/questions/6143285/git-add-vs-push-vs-commit/)
- [When should I use git add?](https://stackoverflow.com/questions/3673537/when-should-i-use-git-add/)

### git commit

git的一大功能，就是可以将文件退回到某次commit之前的版本，也就是笑来老师说的时光机。

这个功能要怎么用呢？我们继续用上面的例子。

假设在编写注册功能的时候，我commit了两次：第一次只完成了基础的注册功能，第二次增加了对用户密码强度的检验。

但是在我的客户试用注册功能的时候，发现检验密码强度的功能有问题，需要暂时取消密码强度的检验，这个时候应该怎么做呢？

我就可以用git reset或者git revert命令，来撤销最近一次的commit，并执行git push。这样，网站就只有基础的注册功能，没有密码强度检验功能了。

参考资料：

- [How to undo the last commits in Git?](https://stackoverflow.com/questions/927358/how-to-undo-the-last-commits-in-git/)
- [Undoing Changes](https://www.atlassian.com/git/tutorials/undoing-changes/)

## 和老师的仓库保持同步

因为自己和老师的仓库都是一直在更新，所以每次提交前，需要先将自己的仓库（包括远程和本地）同步为老师仓库的最新状态，然后再提交自己的更改。

首先，添加徐老师的仓库，并命名为upstream，方便以后再次调用。

```bash
git remote add upstream https://github.com/xugy0926/getting-started-with-javascript.git
```

然后将老师的仓库中的内容下载至本地。注意，下载至本地的内容，和自己的仓库是互不干扰的。

```bash
git fetch upstream master
```

这时，徐老师仓库的最新内容已经下载至本地了。我们要把这些内容（upstream/master，代表upstream这个源的master分支）合并到自己的仓库中。

```bash
git merge upstream/master
```

然后就可以提交自己的更改，或者进行其它操作了。

## 如何利用好分支功能？

### 新建功能分支，各自完成不同的需求

因为自己一边要做笔记，一边还想向徐老师的项目上提PR。由于笔记还没写完，但是笔记已经有过多次commits了，所以在提PR的时候，不想把自己的笔记提交上去。

虽然可以通过git revert或者git reset来撤销commit，但是自己还想保持commit历史的完整性。

这个时候，就可以从徐老师的仓库上新建一个分支work用来提交PR，默认的分支master则用来做笔记，两边互不干扰，又能同时完成两项任务。

首先，将老师的仓库的最新版拉到本地（添加upstream源的操作请查看上一小节的内容，此处不再重复）。

```bash
git fetch upstream master
```

用拉到本地的仓库新建一个隶属于自己仓库的分支work。

```bash
git checkout -b work upstream/master
```

将91d4fce这次commit（修改老师文章中文字错误和格式的操作）放入新增的work分支中。

```bash
git cherry-pick 91d4fce
```

将本地分支work推送至服务器上，并指定origin为默认主机。完成之后，在网页端提交自己的PR即可。

```bash
git push -u origin work
```

等到暂时没有PR需要提交了，并且自己的作业也写完的时候，就可以将先将work分支与徐老师最新的代码同步，然后再将work分支同步到master分支上就行了。

参考资料：

- [How to “pull request” a specific commit](https://stackoverflow.com/questions/34027850/how-to-pull-request-a-specific-commit/)
- [How to synchronize two branches in the same Git repository?](https://stackoverflow.com/questions/4010962/how-to-synchronize-two-branches-in-the-same-git-repository/)
- [Git远程操作详解](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)

### 同步某分支至本地

因为上面新建的work分支只在办公室的台式机上有，家里的笔记本上并没有这个分支。为了在家里也能够继续学习，就需要把这个分支同步到家里的电脑上。

最开始是用关键字`git clone branch`来查找方法的，试了一下之后发现这个关键字搜到的解决方法，只是把远程分支的文件下载到本机，本机并没有之前所建立的work分支，所以需要更换搜索关键字。

想到可以用`git pull`将代码更新至本地，尝试了一下，发现本地并没有将work分支同步下来。

于是又用`how to pull new branch from remote`作为关键字来Google，参照着这篇教程[Syncing](https://www.atlassian.com/git/tutorials/syncing)操作，终于成功了。

先是将work分支拉至家里的笔记本上，这时候work还没有合并至本机的仓库中。这样可以避免操作错误，影响本机的仓库。

```bash
git fetch origin work
```

接着再将work分支合并至本机的仓库之中。

```bash
git merge origin/work
```

最后再切换一下分支，就可以在家里的笔记本上继续快乐地学习了~

```bash
git checkout work
```

参考资料：

- [How to clone a single branch in git?](https://stackoverflow.com/questions/1778088/how-to-clone-a-single-branch-in-git)
- [Syncing](https://www.atlassian.com/git/tutorials/syncing)

### 删除无用分支

有时候，只是想新建一个分支，测试一下某个功能。测试完成之后，这个分支就用不到了，那就需要把这个分支删掉。

那就在Google中用关键字`git remove branch`搜一下，看到StackOverflow上就有一篇文章，很完整地列出了删除分支的方法

#### 同时删除本地和远程分支

`git push -d`命令用于删除远程分支，`git branch -d`命令则用于删除本地分支。

```bash
git push -d origin test
git branch -d test
```

#### 强制删除本地分支

有时候会提示本地分支无法删除，如果确定要执行删除操作的话，那我们就来个强制执行。

注意这里的`-D`是大写，编程输入代码时，大小写一定要看仔细。

```bash
git branch -D work
```

出现下面的提示文字不用担心，这只是在提醒本地分支被删除，但是远程的分支还保留着。

```bash
warning: deleting branch 'work' that has been merged to
         'refs/remotes/origin/work', but not yet merged to HEAD.
Deleted branch work (was dbfa635).
```
参考资料：

- [How do I delete a Git branch both locally and remotely?](https://stackoverflow.com/questions/2003505/how-do-i-delete-a-git-branch-both-locally-and-remotely/)
