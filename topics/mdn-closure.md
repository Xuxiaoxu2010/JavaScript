# MDN - 闭包

> 什么是闭包？闭包就是函数及声明函数时的词法环境（lexical environment）。

## 词法作用域（Lexical scoping）

先看下面的代码：

```javascript
function init() {
    var name = 'Mozilla'; // name 是 init 创建的局部变量
    function displayName() { // displayName() 是内部函数，也是闭包
        alert(name); // displayName() 使用了父函数中声明的变量
    }
    displayName();
}
init();
```

`init()` 函数在其内部创建了一个局部变量 `name` 和一个函数 `displayName()`。因为 `displayName()` 是定义在 `init()` 中的内部函数，所以只能在函数 `init()` 内访问。虽然 `displayName()` 本身没有局部变量，但是由于内部函数可以访问包含它的外部函数中的变量，所以 `displayName()` 可以访问父函数 `init()` 中的变量 `name`。

上面这段代码就是词法作用域的示例：它描述了函数有嵌套的时候，语法分析器（parser）是如何解析变量名的。词法（lexical）这个词指的就是：在代码中的某个位置上声明了变量，词法作用域则根据这个位置来决定变量在何处可以访问。因此，嵌套函数才可以访问在其作用域之外声明的变量。

## 闭包

现在再来看看下面的代码：

```javascript
function makeFunc() {
    var name = 'Mozilla';
    function displayName() {
        alert(name);
    }
    return displayName; // 注意这里返回了内部函数
}

var myFunc = makeFunc();
myFunc();
```

这段代码和前面一段代码的执行结果没有区别，不同的地方在于——内部函数 `displayName()` 在执行之前，从外部函数中返回了。

乍一看会觉得，这样的代码怎么能正常运行呢？在一些编程语言中，函数内的局部变量只在函数执行期间可用。按理说，`makeFunc()` 一旦执行完毕，内部变量 `name` 就无法访问了。可是在这里代码竟然还能正常运行，看来需要重新认识一下 JavaScript 了。

其实原因并不复杂：JavaScript 中的函数会形成闭包。正如文章开头所说，闭包就是函数及声明函数时的词法环境。这个“环境”包含了创建闭包时，所有在作用域中的（in-scope）的局部变量。

拿上面的代码来说，运行函数 `makeFunc` 时，创建了函数 `displayName` 的实例（因为在 `makeFunc` 里 `displayName` 将自己返回到函数外了），而 `myFunc` 就是对这个实例的引用。`displayName` 的实例保持对其词法环境的引用，而这个词法环境中就包括了变量 `name`。因此，当调用函数 `myFunc` 时，变量 `name` 是可用的，所以在浏览器中能够弹窗显示该变量的值。

再来看一段更好玩的代码 —— `makeAdder` 函数：

```javascript
function makeAdder(x) {
    return function(y) {
        return x + y;
    };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2)); // => 7
console.log(add10(2)); // => 12
```

在上面这段代码中，定义了函数 `makeAdder(x)`，这个函数接受一个参数 `x`，并返回一个新函数。它返回的函数也接受一个参数 `y`，并返回 `x` 与 `y` 之和。

实际上，`makeAdder` 就是一个函数工厂——它创建出了一批函数，这批函数将一个特定的值与传入它们的参数相加。上面的代码用这个函数工厂创建了两个新函数——一个是将参数的值加 5，另一个则是加 10。

`add5` 和 `add10` 都是闭包，它们的函数体定义是相同的，但是保存了不同的词法环境。在 `add5` 的词法环境中，`x` 是 5，对 `add10` 而言，`x` 则是 10。

## 实战闭包

闭包的作用，就在于它能够将一些数据（词法环境）和操作这些数据的函数关联起来，这显然和面向对象编程是很相似的——在面向对象编程中，对象可以将数据（对象的属性）与方法关联起来。

因此，如果对象只需要一个方法（method）的话——用闭包就好了。

在 Web 开发中，这种场景太常见了。大部分的前端 JavaScript 代码都是基于事件的——定义某种行为，然后关联到用户触发的事件上（比如鼠标点击或者键盘的按键行为）。通常将代码关联到回调上：回调就是为了响应某个事件而执行的一个函数。

比如，我们想要往页面上添加几个更改文本尺寸的按钮。一种方法就是：先以绝对尺寸——像素（px）为单位，设置 `body` 元素的字号（font-size）；然后再用相对尺寸 —— `em` 来设置页面上其它元素的尺寸（比如标题、段落）。

```css
body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 12px;
}

h1 {
  font-size: 1.5em;
}

h2 {
  font-size: 1.2em;
}
```

我们先让调整文本尺寸的按钮改变 `body` 元素的 `font-size` 属性，因为其它元素用的都是相对尺寸，这些元素就能自动调整尺寸了。

代码如下：

```javascript
function makeSizer(size) {
    return function() {
        document.body.style.fontSize = size + 'px';
    };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);
```

这个时候，`size12`、`size14` 和 `size16` 就能够分别将 `body` 元素的字号调整至 `12px`、`14px` 或 `16px` 了。然后我们再将其关联到按钮的点击事件上：

```javascript
document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;
```

```html
<a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a>
```

## 用闭包来模拟私有方法

Java 之类的语言可以声明私有方法，这样一来，这些私有方法就只能被所属的同一个类中的其它方法访问了。

JavaScript 并没有提供原生的方法来实现此需求，但是可以用闭包来模拟私有方法。私有方法不仅可以限制对代码的访问，它还提供了强大的功能来管理全局命名空间、避免方法弄乱代码中的公共接口。

下面的代码展示了如何用闭包来定义可以访问私有函数和变量的公共函数。闭包的这种用法叫做模块模式（module pattern）。

```javascript
var counter = (function() {
    var privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }
    return {
        increment: function() {
            changeBy(1);
        },
        decrement: function() {
            changeBy(-1);
        },
        value: function() {
            return privateCounter;
        }
    };
})();

console.log(counter.value()); // => 0
counter.increment();
counter.increment();
console.log(counter.value()); // => 2
counter.decrement();
console.log(counter.value()); // => 1
```

在前面的那些示例代码中，每个闭包都有自己的词法环境；但是在这里的示例代码中，三个函数共享同一个词法环境：`counter.increment`、`counter.decrement` 和 `counter.value`。

共享的词法环境是在匿名函数的函数体中创建的，而这个匿名函数一定义就被执行了。词法环境包含两个私有项：变量 `privateCounter` 和函数 `changeBy`。在匿名函数之外无法直接访问这两个私有项，只能通过匿名的包装函数里的三个公共函数来访问。

这三个公共函数都是闭包，并且共享同一个词法环境。多亏了 JavaScript 的词法作用域，这三个公共函数才都能够访问私有变量 `privateCounter` 和私有函数 `changeBy`，这样就不用为每个公共函数都创建一个词法环境了。

> 上面的代码定义的匿名函数创建了一个计数器，然后我们立即调用了该函数并将其执行结赋给了变量 `counter`。其实还可以将这个匿名函数保存在一个独立的变量 `makeCounter` 中，然后用这个变量来创建任意多个计数器。

```javascript
var makeCounter = function() {
    var privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }
    return {
        increment: function() {
            changeBy(1);
        },
        decrement: function() {
            changeBy(-1);
        },
        value: function() {
            return privateCounter;
        }
    }
};

var counter1 = makeCounter();
var counter2 = makeCounter();
console.log(counter1.value()); // => 0
counter1.increment();
counter1.increment();
console.log(counter1.value()); // => 2
counter1.decrement();
console.log(counter1.value()); // => 1
console.log(counter2.value()); // => 0
```

注意这里的两个计数器 `counter1` 和 `counter2` 是如何保持互相独立的。每个（计数器的）闭包都引用了各自版本的私有变量 `privateCounter`，每次调用某个计数器的时候，因为 `privateCounter` 的值改变了，计数器的词法环境也对应改变了。但是，一个闭包中变量值的变化并不会影响另一个闭包。

> 闭包的这种用法带来了很多便利性——尤其是数据隐藏和封装，这些便利性通常都是面向对象编程语言中所拥有的。

## 在循环中创建闭包：一种常见的误用方式

在 ES2015 引入 `let` 关键字之前，使用闭包时的一种常见问题是在循环中创建了闭包。看下面的代码：

```html
<p id="help">Helpful notes will appear here</p>
<p>E-mail: <input type="text" id="email" name="email"></p>
<p>Name: <input type="text" id="name" name="name"></p>
<p>Age: <input type="text" id="age" name="age"></p>
```

```javascript
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help);
    }
  }
}

setupHelp();
```
