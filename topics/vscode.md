# VSCode 应用笔记

## 自带功能

### 笔记说明

#### 快捷键

VSCode 自身的功能，都可以通过编辑设置文件来进行修改，在 Windows 下的快捷键为 `Win+,`，在 Mac 下的快捷键为 `Command (⌘)+,`。

为方便起见，后文中提到 Windows/Mac 快捷键的地方，均采用下面对应关系表中，最右侧一列的简介形式：Cmd、Alt、Ctr。

| Win | Mac | Mac 下的图标 | 本文中采用的简写 |
| - | - | - | - |
| Windows | Command | ⌘ | Cmd | 
| Alt | Option/Alt | ⌥ | Alt |
| Control | Control | ^ | Ctr |

![](https://raw.githubusercontent.com/Dream4ever/Pics/master/modifiers.png)

#### 选项选择

VSCode 中的很多设置都有多个选项可供选择，在列出各个选项的时候，会以粗体显示建议使用的选项名称。

- **选项 A**
- 选项 B
- 选项 C

### 自动保存

VSCode 贴心地提供了自动保存的功能，这样写完代码之后就不用担心因为忘记自动保存，而看不到修改后的代码的执行结果了。

自动保存功能通过修改 `files.autoSave` 这一项的值得以实现，如果要开启自动保存功能，有三个选项可供选择：

- **afterDelay**: 延迟一定时间后自动保存，这个时间由选项 `"files.autoSaveDelay": 1000,` 中的值 `1000` 决定。
- onFocusChange: 编辑器失去焦点后自动保存。
- onWindowChange: 窗口失去焦点后自动保存。

第二和第三个选项的区别是什么呢？VSCode 的窗口包含若干个部分，编辑器只是其中的一个部分，我们借用下面这张来自 VSCode 官方网站的图来说明一下：在主界面的五部分中，区域 C 为编辑器，剩下的区域则是 VSCode 窗口的其它部分。

如果应用第二个选项，即使没有切换到别的程序中，而只是点击了 VSCode 窗口编辑器以外的部分，VSCode 也会自动保存。

而应用第三个选项的话，则必须切换到别的程序中，VSCode 才会自动保存。

![](https://raw.githubusercontent.com/Dream4ever/Pics/master/code_userinterface_hero.png)

## 插件推荐

### Code Outline



### ESLint



### Git History



### Git Project Manager



### markdownlint



### npm



### Quick and Simple Text Selection



### Vue 2 Snippets
