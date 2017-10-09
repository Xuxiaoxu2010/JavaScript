# 《JavaScript 权威指南》学习笔记

```text
是否需要重新调整为 JS 文件？各章、节、小节依次是嵌套的对象，输入章、节、小节名称，即输出该小节关键知识点。
Lexical.Charset.CaseSensitive // 输出关键知识点
```

注：本学习笔记的知识结构按照 [《现代 JavaScript 开发：语法基础与工程实践》](https://github.com/wxyyxc1992/Domain-of-ProgrammingLanguage/tree/master/JavaScript/Modern-JavaScript-Development-Foundation) 一文中的目录层级进行了对应调整。

---

## 表达式与控制流

### 变量声明与赋值

#### 直接量

```js
12 // 数字
1.2 // 小数
"hello js" // 字符串
'hi' // 也是字符串
true // 布尔值
/javascript/gi // 正则表达式直接量
null // 空
[1, 2, 3] // 数组
a = { x: 1, y: 2 }; // 对象
```

#### 注释

```js
//  单行注释
/* 注释段 */ // 另一个注释段

/*
* 多行注释
*/
```

#### 字符集

##### 转义序列

```js
"café" === "caf\u00e9" // => true: \u00e9 的含义见下面“字符串”一节中的“字符集和内码”这一小节
```

##### 标准化

```js
"caf\u00e9".normalize() // => "café": 返回标准化的 Unicode 字符串
```

#### 标识符

```js
// 下面的都是合法的标识符
i
my_variable_name
v8
_dummy
$str
sí
π
```

#### 区分大小写

```js
var a = 0;
var A = 1;
```

#### 变量无类型

```javascript
var a = 1.2;
a = 'Hello';
a = [1, 2, 3];
```

#### 可选的分号

```js
var a
a
=
3
console.log(a)
/* JavaScript 会识别为：var a; a = 3; console.log(a); */
```

#### 保留字

```js
break
null
/* 未来版本的 ES 中会用到 */
const
super
/* 在严格模式下是保留字 */
let
yield
arguments
eval
/* Java 的关键字 */
abstract
private
/* 全局变量和函数 */
Infinity
eval
```

### 变量作用域与提升

#### 变量作用域

全局变量：具有全局作用域，在 JavaScript 代码中的所有地方都有定义。

局部变量：只在所声明的函数体内有定义。函数参数也是局部变量。

优先级：在函数体内，局部变量的优先级高于同名的全局变量。

#### 全局变量

声明全局变量时，实际上是定义了全局对象的一个属性。

如果用 var 声明全局变量，则这个变量/属性是不可删除的（无法用 `delete` 运算符删除）。

如果未使用严格模式，并且直接给一个未声明的变量赋值的话（不用 var 声明），JavaScript 就会自动创建一个全部变量，并且这个变量/属性是可删除的（可以用 `delete` 运算符删除）。

```javascript
var truevar = 1;
fakevar = 2;
this.fakevar2 = 3;
console.log(delete truevar); // => false
console.log(delete fakevar); // => true
console.log(delete this.fakevar2); // => true
```

#### 局部变量

在 ES 规范中，规定全局变量是全局对象的属性。虽然对局部变量没有做类似的规定，但是可以将局部变量理解为跟函数调用相关的某个对象的属性。在 ES5 中，称作该对象为“声明上下文对象”（declarative environment record）。

JavaScript 中可以用 `this` 关键字来引用全局对象，却没有方法引用局部变量中存放的对象。这种存放局部变量对象的特有性质，是对我们不可见的内部实现。但是！可以通过闭包在局部变量的作用域之外使用它，具体请看 [MDN 上关于闭包的文档](https://github.com/Dream4ever/JavaScript/blob/master/topics/mdn-closure.md)。

#### 作用域链

JavaScript 是基于词法作用域的语言：只要看看包含变量定义在内的几行源码，就能知道变量的作用域了。全局变量在程序中始终有定义，局部变量则在声明它的**整个**函数体内都有定义。

假设有一类定义了自身实现方式的对象（TODO: 没看懂 => 说的就是函数？），而我们将局部变量看作是这类对象的属性的话，我们就可以换个角度来理解变量作用域了。

每一段 JavaScript 代码（不管是全局代码还是函数）都有一个对应的作用域链（scope chain）。这个作用域链是一系列对象组成的列表（list）或者链表（chain），而这一系列对象定义了它们的“作用域”中的变量。如果 JavaScript 要在作用域链上查找变量 x（这个过程叫做变量解析 - variable resolution），它会从第一个对象开始，一直找到最后一个对象，如果整个作用域链上都没找到包含属性 x 的对象，就认为 x 不在这个作用域链上，并且会抛出一个引用错误（ReferenceError）的异常。

在 JavaScript 的最顶层（也可理解为最外层）代码中，也就是不包含在任何函数定义内的代码中，作用域链只有一个对象：那就是全局对象。在不包含嵌套的函数体内，作用域链包含两个对象：第一个对象定义了这个函数的参数和函数体内的局部变量，第二个对象为全局对象。在包含嵌套的函数体内，作用域链包含至少三个函数对象。（这么一说，不包含嵌套的函数，是否也可以看作是“嵌套”在全局对象内的函数？）

在定义一个函数时，它会保存它的作用域链——非嵌套函数的话，会保存定义了这个函数的参数和局部变量的对象，以及全局对象；嵌套函数的话，则保存从当前嵌套函数直至最顶层函数的相关对象，以及全局对象。当调用这个函数时，它会创建一个新对象来保存它的局部变量（以及函数参数？还是说在这种场景下，函数参数也是局部变量？），然后把这个新对象添加到前面保存的作用域链上，形成一个新的、更长的作用域链，这个新的作用域链表示函数的调用（注意，这里要区分定义函数时的作用域链，和调用函数时的调用链）。涉及到嵌套函数的时候就更有意思了，因为每次调用外部函数的时候，内部函数就会被重新定义一次（TODO：也没看懂 => 看后面的解释）。每次调用外部函数的时候，作用域链和前一次是不一样的，内部函数在每次重新定义的时候都会和前一次有微妙的差别——每次调用外部函数时，被重新定义的内部函数的代码虽然是不变的，但是与这段代码关联的作用域链却是变化的——因为每次调用外部函数时，外部函数都会创建一个新对象来保存局部变量，再将这个新对象添加到前面定义函数时保存的作用域链中——所以说每次调用外部函数时，作用域链和前一次调用是不同的，因此内部函数也和前一次不同。（TODO: 还是没有理解透彻。）

## 内置数据结构

### 数据类型分类

#### 不可变类型

JavaScript 中的原始值（undefined、null、布尔值、数字和字符串）与对象（包括数组和函数）的根本区别就是：原始值是不可更改的，任何方法都无法更改/突变（mutate）一个原始值。

改变数字或者布尔值的说法本身就说不通，而对字符串来说，每次修改后的字符串就已经不是之前的字符串了。

原始值的比较是**值**的比较：只有它们的值相等时，两个原始值才相等。

```javascript
var s = 'hello'; // 定义一个字符串
s.toUpperCase(); // => 'HELLO': 虽然返回了大写的字符串，但原来的字符串 s 并没有被改变
s // => 'hello'
```

#### 可变类型（对象引用）

对象和原始值不同，首先，它们是可变的——也就是说它们的值是可以修改的：

```javascript
var o = { x: 1 }; // 定义一个对象
o.x = 2; // 修改对象属性值来更改对象
o.y = 3; // 增加对象属性值来更改对象
```

##### 比较两个可变类型

比较两个对象并不是比较他们的值，两个属性及值完全相同的对象，也是可以不相等的；各个元素完全相等的两个数组也是可以不相等的。

```javascript
var o = { x: 1 }, p = { x: 1 }; // 具有相同属性的两个对象
o === p // => false: 两个单独的对象永不相等
var a = [], b = []; // 两个单独的空数组
a === b // => false: 两个单独的数组永不相等
```

##### 可变类型的复制

对象通常被称为“引用类型”，以和 JavaScript 的基本类型相区分。专业点来说就是：对象的值都是引用，比较对象就是比较引用：只有引用了同一个基对象时，两个对象才相等。

```javascript
var a = []; // 定义一个引用了空数组的变量 a
var b = a; // 变量 b 引用同一个数组
b[0] = 1; // 通过变量 b 来修改引用的数组
a[0] // => 1: 变量 a 也会被修改
a === b // => true: a 和 b 引用的是同一个数组，当然相等
```

由上面的代码可以看到，把对象赋值给变量时，只是把对象的“引用”赋值过去了，并没有把对象再复制一份。如果用这种方式把一个对象赋值给多个变量，那么任意一个变量修改了对象，其它变量都会受影响。

如果想要像不可变类型那样，每个变量都对应的是自己的“值”，就要像下面的例子一样，把对象的每个属性（数组的每个元素）显式地复制一份。

```javascript
var a = { x: 1, y: 2 }; // 待复制的对象
var b = {}; // 将要复制到的空对象
for (var i in a) { b[i] = a[i]; } // 遍历 a 并将其属性复制到 b 中

var a = ['a', 'b', 'c']; // 待复制的数组
var b = []; // 将要复制到的空目标数组
for (var i = 0; i < a.length; i++) { b[i] = a[i]; } // 遍历 a 并将其元素值复制到 b 中
```

### 数值类型与运算符

#### 数字

##### 整型直接量

```javascript
0
0xff // 十六进制 <-> 255（十进制）
0377 // 八进制 <-> 255（十进制） 在ES6的严格模式下是禁止的
```

##### 浮点型直接量

```javascript
3.14
.12
6.07e23
1.2E-15
```

#### 算术运算

```javascript
// Math 对象的函数和常量
Math.pow(2, 53)
Math.PI
Math.random()
```

##### 四则运算和比较

参考链接：

- [【科普向】JavaScript的四则符和比较符](https://zhuanlan.zhihu.com/p/19735745)

##### 上溢/下溢

```javascript
// Infinity 和 NaN: 运算出现特殊值的情况

// Infinity
1 / 0
Number.MAX_VALUE + 1E300

// -Infinity
-1 / 0
-1 / Number.MIN_VALUE

// NaN
0 / 0

// +/-0
Number.MIN_VALUE / 2 // => 0
-Number.MIN_VALUE / 2 // => -0
1 / Infinity // => 0
-1 / Infinity // => -0
```

##### 特殊值的判断

```javascript
NaN != NaN // => true: 只能通过该等式或 isNaN() 函数判断是否为 NaN
isFinite(x) // 只有在参数为 NaN、Infinity 或 -Infinity 时才为 false
1 / 0 !== 1 / -0 // 只有在这个时候，0 和 -0 才不相等
```

##### 浮点数精度

```javascript
(.3 - .2) !== (.2 - .1) // => true: 因为 JS 中的浮点数只是对应实数的近似表示
```

**解决方法**：对于精度要求高的场合，可用大整数进行运算，记得保证最终值的小数点位数不要错就可以。

### 字符串

#### 字符集和内码

> 不影响基本使用，暂时不用深究这一部分。

JavaScript 采用 UTF-16 编码的 Unicode 字符集，每个字符均用无符号的 16 位值表示。
因为有很多符号要表示，所以 Unicode 是分区定义的，每个区也称为一个平面（plane），可存放 65536（2^16）个字符。
最前面的 65536 个字符位称为基本平面（BMP），它的码点范围为：`0 ~ 2^16 - 1`，对应的 16 进制就是 `U+0000 ~ U+FFFF`。所有最常见的字符都在这个平面，这也是 Unicode 最先定义和公布的一个平面。
剩下的字符都放在辅助平面（SMP），码点范围从 `U+010000` 开始。

```javascript
U+0000 // => null: 0000 为码点（code point），也是该字符的编号
U+597D // => '好'
```

参考资料：[Unicode与JavaScript详解](http://www.ruanyifeng.com/blog/2014/12/unicode.html)

**注意**：JavaScript 中并没有表示单个字符的“字符型”，只有字符串这一种类型。

#### 字符串直接量

```javascript
"" // => 空字符串: 包含 0 个字符
'test'
"3.14"
'name="myForm"' // 由单引号定界的字符串，里面可以包含双引号，但不能再包含单引号了，否则将以内部出现的第一个单引号作为字符串的结束位置
"It\"s my life" // 由单引号/双引号定界的字符串，如果内部必须包含相同的引号，则内部包含的引号左侧一定要加上转义字符 \
"This string\n has two lines" // 字符串内可以包含换行符 \n
```

##### 多行字符串

```javascript
// 在 ES5 中，下面几行字符串实际输出时只有一行，行末加反斜线是为了标记下一行还是该字符串的内容，并不是换行，\n 才是换行
"one\
long\
line"
```

#### 转义字符

反斜线（\）符号后面加一个字符，该字符就不再表示它们的字面含义了。所有的转义字符及其含义如下表所示。

| 转义字符 | 含义 |
| - | - |
| `\o` | NULL字符(\u0000) |
| `\b` | 退格符(\u0008) |
| `\t` | 水平制表符(\u0009) |
| `\n` | 换行符(\u000A) |
| `\v` | 垂直制表符(\u000B) |
| `\f` | 换页符(\u000C) |
| `\r` | 回车符(\u000D) |
| `\"` | 双引号(\u0022) |
| `\'` | 撇号或单引号(\u0027) |
| `\\` | 反斜线(\u005C) |
| `\xXX` | 由两位十六进制数 XX 指定的 Latin-1 字符 |
| `\xXXXX` | 由四位十六进制数 XXXX 指定的 Unicode 字符 |

**注意**：只要反斜线（\）出现在上表中字符之外的地方，则都忽略该反斜线，比如 `\#` 和 `#` 相同。

#### 使用字符串

```javascript
msg = 'Hello' + ', ' + 'world' // 字符串直接量的拼接
greeting = msg + ' ' + name // 字符串直接量和变量的拼接
s.length // 字符串的长度
var s = 'hello, world' // 定义字符串
s.charAt(0) // => 'h': 第一个字符
s.charAt(s.length - 1) // => 'd': 最后一个字符
s.substring(1,4) // => 'ell': 游标在 1~3 之间的字符，即第 2~4 个字符
s.slice(-3) // => 'rld': 最后 3 个字符
s.indexOf('l') // => 2: 字符 l 第一次出现时的游标
s.indexOf('l', 3) // => 3: 从位置 3 开始第一次出现字符 l 的位置
s.lastIndexOf('l') // => 10: 字符 l 最后一次出现时的游标
s.split(', ') // 用 ', ' 逗号加空格将字符串分割成数组
s.replace('l', 'L') // => 'heLlo, world': 替换字符串中首个小写字符 l 为大写字符 L
s.toUpperCase() // => 'HELLO, WORLD': 字符串中所有字母变为大写
```

**注意**：前面说过，字符串是不可变类型，所以 `replace()` 和 `toUpperCase()` 这样的方法返回的是新字符串，原字符串不会发生变化，除非用 `str = str.toUpperCase()` 这样的方法对字符串进行重新赋值。

在 ES5 中，字符串可以当做只读数组，就是说可以用访问数组元素的方式来访问字符串中的单个字符：

```javascript
s = 'hello, world';
s[0] // => 'h'
s[s.length - 1] // => 'd'
```

### 正则表达式

#### 模式匹配

JavaScript 定义了 `RegExp()` 构造函数，用来创建 “表示文本匹配模式” 的对象，这些模式称为 “正则表达式（regular expression）”。

RegExp 并不是 JavaScript 的基本类型，它和 Date 类型一样，只是一种具有实用 API 的特殊对象。

String 和 RegExp 对象均定义了利用正则表达式进行模式匹配和查找/替换的函数。

RegExp 也有直接量写法，可以直接在 JavaScript 程序中使用。在两条斜线 `//` 之间的文本构成了一个正则表达式直接量，第二条斜线之后也可以跟随一个或多个字母，用来修饰匹配模式的含义。

```javascript
/^HTML/ // 匹配以 HTML 开始的字符串
/[1-9][0-9]*/ // 匹配一个非零数字，后跟任意个任意数字
/\bjavascript\b/i // 匹配单词 'javascript'，忽略大小写。\b 用于匹配一个词的边界，所有不是大小写罗马字母、数字或者下划线的字符，均是一个词的边界
```

RegExp 对象定义了很多有用的方法，字符串同样具有可以接收 RegExp 参数的方法。

```javascript
var text = 'testing: 1, 2, 3'; // 定义用于演示文本匹配的字符串
var pattern = /\d+/g // 匹配包含至少一个数字的实例
pattern.test(text) // => true: 匹配成功，pattern.test(text) 表示测试字符串 text 是否匹配 pattern 这个模式
text.search(pattern) // => 9: 首次匹配成功的字符串中第一个字符的位置
text.match(pattern) // => ['1', '2', '3']: 所有匹配成功的内容组成的数组
text.replace(pattern, '#') // => 'testing: #, #, #': 将所有匹配成功的内容换成 replace() 方法中第二个参数里的内容
// TODO
text.split(/\D+/) // => ['', '1', '2', '3']: 为什么截取出来的数组，第一个元素是空字符串？text.match(/\D+/) 得到的结果也只是 'testing: `，并不包含后面的 `, `
```

### 日期和时间

```javascript
var then = new Date(2011, 0, 1, 17, 10, 30);
var now = new Date();
var elapsed = now - then; // 单位为毫秒
now.getFullYear() // => 2017
//TODO
// 为什么月份从 0 开始，而天数从 1 开始？按欧美的星期记法，每周也是从 0，即周日开始？
now.getMonth() // => 8: 从 0 开始的月份，而不是从 1
now.getDate() // => 19: 从 1 开始的天数
now.getDay() // => 2: 周一至周六分别为 1~6，周日为 0
```

### 特殊类型

#### 布尔值

用途：通常用于 JavaScript 的控制结构中。

仅有的几个会被转换成 `false` 的假值（可用 `undefined ? true : false` 进行判断，不能用 `undefined = false` 进行判断）：

```javascript
undefined
null
0
-0
NaN
'' // 空字符串
```

##### 布尔运算符

```javascript
a && b // a 和 b 均为真值时，表达式才为真
a || b // a 或 b 至少有一个为真值时，表达式就为真
```

#### null 和 undefined 的区别

| null | undefined |
| - | - |
| 表示数字、字符串和对象是“无值”的。 | 表示变量没有初始化。 |
|  | 如果查询对象属性或数组元素的值时返回 undefined，就说明这个属性或者元素不存在。 |
|  | 无返回值的函数也会返回 undefined。 |
| 适合表示系统级的、出乎意料的或类似错误的值的空缺 | 适合表示程序级的、正常的或在意料之中的值的空缺 |

- 相等判断运算符 `==` 认为两者是相等的，需要用严格相等运算符 `===` 才能判断出两者是不相等的。
- 两者都不包含任何属性和方法，使用 `.` 或 `[]` 来存取他们的成员或方法时，都会产生一个类型错误：`Uncaught TypeError: Cannot read property 'toString' of null`。
- 如果要赋值给变量或者属性，或者作为参数传入函数，建议用 null。

```javascript
typeof null // => 'object'
typeof undefined // => 'undefined'
```

### 类型转换

#### 特殊值

以下仅列出几种特殊情况：

1. 对应的布尔值为 false 的值：undefined、null、""（空字符串）、0、-0、NaN
1. 对应的数字为 NaN 的值：undefined、"one"、['a']、function(){}（任意函数）
1. 对应的对象会抛出异常的值：undefined、null（均会 throws TypeError，比如调用 `toString()` 方法时）

参考资料：

- [对于以下现象，有没有一种通用的判断规则？](https://segmentfault.com/q/1010000010976877?)：回答中详细讲解了 JavaScript 中的类型转换。

#### 显式类型转换

方法一：使用各种类型的构造函数进行转换。

```javascript
Number('3') // => 3
String(false) // => 'false': 使用 false.toString() 也有同样效果
Boolean([]) // => true: 空数组也为 true，这是个知识点
Object(3) // => 结果等同于 new Number(3)
```

#### 运算符的隐式类型转换

```javascript
1 + '2' // => '12'
+'1' // => 1: 等于 Number('1')
!!null // => false: 可用于特殊类型的快速判断
```

#### 数字的解析和格式化

##### 进制转换

`toString()` 方法可以将数字转换为指定的进制。

```javascript
var n = 17;
binarl_string = n.toString(2); // => '10001'
octal_string = '0' + n.toString(8); // => '021'
hex_string = '0x' + n.toString(16); // => '0x11'
special_string = 'xx' + n.toString(7); // => 'xx23'
```

##### 设置小数点及有效数字位数

`toFixed()` 不会使用科学记数法。

```javascript
var n = 123456.789;
n.toFixed(0); // => '123457'
n.toFixed(2); // => '123456.79'
n.toFixed(5); // => '123456.78900'
```

`toExponential()` 则将数字转换为科学记数法，小数点前只有一个数字

```javascript
n.toExponential(1); // => '1.2e+5'
n.toExponential(5); // => '1.23457e+5'
```

`toPrecision()` 则根据设置的有效位数，来决定是使用普通记数法还是科学记数法。

```javascript
n.toPrecision(4); // => '1.235e+5'
n.toPrecision(7); // => '123456.8'
n.toPrecision(10); // => '123456.7890'
```

##### 解析字符串中的数字

`parseInt()` 用于解析字符串中的数字并转换成整数，但是数字之前只能有空格或者正负号，如果有其它字符，则都会返回 `NaN`。

```javascript
parseInt('3 a'); // => 3
parseInt('  +3'); // => 3
parseInt('0x3'); // => 3
parseInt('-3.2'); // => -3
parseInt('  -+3'); // => NaN
parseInt('.3'); // => NaN
parseInt('$3'); // => NaN
parseInt('~3'); // => NaN
parseInt('a3'); // => NaN
```

`parseInt()` 还可接收第二个参数，用于指定第一个参数的进制。如果第一个参数中的部分数字不属于第二个参数指定的进制，那么就直接忽略。

```javascript
parseInt('10', 2); // => 2
parseInt('112', 2); // => 3
parseInt('077', 8); // => 63
```

`parseFloat()` 与 `parseInt()` 类似，但不接受用于指定进制的第二个参数，其它方面和 `parseInt()` 都相同。

```javascript
parseFloat('3.14 ab 2.13'); // => 3.14
parseFloat('0x112', 16); // => 0
```

##### 对象到原始值的转换

### 映射类型

对象本质上就是属性名（key）和属性值（value）之间的映射表。

```javascript
// 普通对象
Person: {
    "name": "Henry",
    "age": 28
}

// 数组对象
num = [1, 1, 2, 3, 5, 7];

// 函数对象
function add(a, b) {
    return a + b;
}
```

#### 特殊类

```javascript
// 日期类
var date = new Date();

// 正则类
var pattern = /s$/;

// 错误类
var err = new Error();
```

#### 面向对象特性

```js
sort(a); // 结构化编程语言，只能这样对数组排序
a.sort(); // 面向对象语言，调用数组的方法即可
```

下面是可以拥有方法的数据类型。

```javascript
// 对象类型
Person.talk()

// 数字类型
(1.23e+20).toFixed(2)

// 字符串类型
'123-234-345'.split('-')

// 布尔类型
true.toString()
```

#### 全局对象

当 JavaScript 解释器启动时，或者任何 Web 浏览器加载新页面时，就会创建一个新的全局对象，并给它一组自定义的初始属性：

- 全局属性，比如 undefined、Infinity 和 NaN
- 全局函数，比如 isNan()、parseInt() 和 eval()
- 构造函数，比如 Date()、RegExp()、String()、Object() 和 Array()
- 全局对象，比如 Math 和 JSON

全局对象的初始属性并不是保留字，但应该当做保留字来对待。

在代码的最顶级，可以用 JavaScript 关键字 this 来引用全局对象：

```javascript
var global = this; // 定义一个引用全局对象的全局变量
```

对于客户端的 JavaScript，在其表示的浏览器窗口中的所有 JavaScript 代码中，Window 对象充当了全局对象。这个全局 Window 对象有一个属性 window 引用其自身，它可以代替 this 来引用全局对象。Window 对象不只是定义了核心的全局属性，还针对 Web 浏览器和客户端 JavaScript 定义了一小部分的其它全局属性。

```javascript
var global = window;
global.Infinity; // => Infinity
global.isNaN(1); // => false
global.Date(); // => "Fri Sep 22 2017 23:46:10 GMT+0800 (CST)"
global.Math.random() // => 0.26739690031767305
```

初次创建时，全局对象定义了 JavaScript 中所有的预定义全局值。用户自定义的全局值也包含在其中。如果代码中声明了一个全局变量，那么这个全局变量就是全局对象的一个属性。

#### 包装对象

在 JavaScript 中，一般只有对象才有属性和/或方法（方法是不是也可以看作属性的一种？）。但为什么字符串、数字和布尔值也有属性和方法呢？

```javascript
var s = 'hello world'; // 定义字符串
var word = s.substring(s.indexOf(' ') + 1, s.length); // 使用字符串的属性
```

只要引用了字符串 s 的属性，JavaScript 就会将字符串的**值**，通过调用 new String(s) 的方式转换成对象，这个由值转换而来的对象，继承了字符串的方法，并被用来处理**属性的引用**。一旦属性引用结束，这个新创建的对象就会被销毁。

看看下面的代码，思考一下它的执行结果：

```javascript
var s = 'test'; // 创建一个字符串
s.len = 4; // 给它设置一个属性
var t = s.len; // 查询这个属性
```

运行这段代码时，最后得到的 t 的值是 undefined。为什么会这样？原因在第二行代码中。第二行代码创建了一个临时的字符串对象，并给其 len 属性赋值 4，随即就销毁了这个对象。这样一来，原始的字符串 s 其实并没有 len 这个属性。第三行代码通过原始的字符串值创建一个新字符串对象，并尝试读取其 len 属性，而这个属性其实并不存在，结果自然是 undefined 了。

上面的代码说明，在读取字符串、数字和布尔值的属性或方法时，这些类型表现的像对象一样。但不要试图给其属性赋值：修改只是发生在临时对象身上，并且这个临时对象是立即销毁的。

综上所述，存取字符串、数字或布尔值的属性时，所创建的临时对象被称作**包装对象**，它只是偶尔用来区分字符串/数字/布尔类型的值和对象的。

上面的代码隐式创建了包装对象，也可以通过 String()、Number() 或 Boolean() 构造函数来显式创建包装对象：

```javascript
var s = 'test', n = 1, b = true; // 分别创建一个字符串、数字和布尔值
var S = new String(s); // 一个字符串对象
var N = new Number(n); // 一个数值对象
var B = new Boolean(b); // 一个布尔对象
S === s; // => false: s 是一个字符串，而 S 则是一个字符串对象，注意两者的区别
```

### 序列类型（数组？映射类型的子集？）

## 函数

### 函数作用域与声明提前

在 JavaScript 中，虽然没有块级作用域（block scope）的概念，但是有函数作用域（function scope）：在函数体中声明的变量，则在这个函数及内部嵌套的函数中均有定义。

```javascript
function test(o) {
    var i = 0;
    if (typeof o == 'object') {
        var j = 0;
        for (var k = 0; k < 10; k++) {}
        console.log('k1 = ' + k);
    }
    console.log('k2 = ' + k);
    console.log('j = ' + j);
}

test({});
// => k1 = 10
// => k2 = 10
// => j = 0
```

JavaScript 的函数作用域，不仅是指在函数中声明的变量，在函数及内部嵌套的函数中均有定义；而且在函数声明之前就可以被使用。这个特性被称作声明提前（hoisting）。但是，只有函数的**声明**会被“提前”至函数体的顶部，赋值并不会被提前，见下面代码的直接结果。

```javascript
var scope = 'global';
function f() {
    console.log(scope);
    var scope = 'local';
    console.log(scope);
};
f();
// => undefined
// => local
```

上面的函数可以按下面的执行顺序来理解。

```javascript
function f() {
    var scope;
    console.log(scope);
    scope = 'local';
    console.log(scope);
}
```

基于 JavaScript 的这种特性，在函数内定义变量时，可以将变量声明整体放在函数体的顶部，这样能够清晰、准确地反映真实的变量作用域。

---

已阅读至《3.8.3 对象转换为原始值》。
