# 《JavaScript 权威指南》学习笔记

```text
是否需要重新调整为 JS 文件？各章、节、小节依次是嵌套的对象，输入章、节、小节名称，即输出该小节关键知识点。
Lexical.Charset.CaseSensitive // 输出关键知识点
```

注：本学习笔记的知识结构按照 [《现代 JavaScript 开发：语法基础与工程实践》](https://github.com/wxyyxc1992/Domain-of-ProgrammingLanguage/tree/master/JavaScript/Modern-JavaScript-Development-Foundation) 一文中的目录层级进行了重新整理。

## 目录

- [《JavaScript 权威指南》学习笔记](#%E3%80%8Ajavascript-%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%E3%80%8B%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0)
    - [目录](#%E7%9B%AE%E5%BD%95)
    - [词法结构](#%E8%AF%8D%E6%B3%95%E7%BB%93%E6%9E%84)
    - [类型、值和变量](#%E7%B1%BB%E5%9E%8B%E3%80%81%E5%80%BC%E5%92%8C%E5%8F%98%E9%87%8F)
        - [数据类型分类](#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E5%88%86%E7%B1%BB)
            - [原始类型](#%E5%8E%9F%E5%A7%8B%E7%B1%BB%E5%9E%8B)
            - [可变类型](#%E5%8F%AF%E5%8F%98%E7%B1%BB%E5%9E%8B)
            - [不可变类型](#%E4%B8%8D%E5%8F%AF%E5%8F%98%E7%B1%BB%E5%9E%8B)
        - [类型转换](#%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2)
    - [表达式与控制流](#%E8%A1%A8%E8%BE%BE%E5%BC%8F%E4%B8%8E%E6%8E%A7%E5%88%B6%E6%B5%81)
        - [变量声明与赋值](#%E5%8F%98%E9%87%8F%E5%A3%B0%E6%98%8E%E4%B8%8E%E8%B5%8B%E5%80%BC)
            - [直接量](#%E7%9B%B4%E6%8E%A5%E9%87%8F)
            - [注释](#%E6%B3%A8%E9%87%8A)
            - [字符集](#%E5%AD%97%E7%AC%A6%E9%9B%86)
                - [转义序列](#%E8%BD%AC%E4%B9%89%E5%BA%8F%E5%88%97)
                - [标准化](#%E6%A0%87%E5%87%86%E5%8C%96)
            - [标识符](#%E6%A0%87%E8%AF%86%E7%AC%A6)
            - [区分大小写](#%E5%8C%BA%E5%88%86%E5%A4%A7%E5%B0%8F%E5%86%99)
            - [变量无类型](#%E5%8F%98%E9%87%8F%E6%97%A0%E7%B1%BB%E5%9E%8B)
            - [可选的分号](#%E5%8F%AF%E9%80%89%E7%9A%84%E5%88%86%E5%8F%B7)
            - [保留字](#%E4%BF%9D%E7%95%99%E5%AD%97)
    - [内置数据结构](#%E5%86%85%E7%BD%AE%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)
        - [数值类型与运算符](#%E6%95%B0%E5%80%BC%E7%B1%BB%E5%9E%8B%E4%B8%8E%E8%BF%90%E7%AE%97%E7%AC%A6)
            - [数字](#%E6%95%B0%E5%AD%97)
                - [整型直接量](#%E6%95%B4%E5%9E%8B%E7%9B%B4%E6%8E%A5%E9%87%8F)
                - [浮点型直接量](#%E6%B5%AE%E7%82%B9%E5%9E%8B%E7%9B%B4%E6%8E%A5%E9%87%8F)
            - [算术运算](#%E7%AE%97%E6%9C%AF%E8%BF%90%E7%AE%97)
                - [上溢/下溢](#%E4%B8%8A%E6%BA%A2%E4%B8%8B%E6%BA%A2)
                - [特殊值的判断](#%E7%89%B9%E6%AE%8A%E5%80%BC%E7%9A%84%E5%88%A4%E6%96%AD)
                - [浮点数精度](#%E6%B5%AE%E7%82%B9%E6%95%B0%E7%B2%BE%E5%BA%A6)
        - [字符串](#%E5%AD%97%E7%AC%A6%E4%B8%B2)
            - [字符集和内码](#%E5%AD%97%E7%AC%A6%E9%9B%86%E5%92%8C%E5%86%85%E7%A0%81)
            - [字符串直接量](#%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9B%B4%E6%8E%A5%E9%87%8F)
                - [多行字符串](#%E5%A4%9A%E8%A1%8C%E5%AD%97%E7%AC%A6%E4%B8%B2)
            - [转义字符](#%E8%BD%AC%E4%B9%89%E5%AD%97%E7%AC%A6)
            - [使用字符串](#%E4%BD%BF%E7%94%A8%E5%AD%97%E7%AC%A6%E4%B8%B2)
        - [正则表达式](#%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)
            - [模式匹配](#%E6%A8%A1%E5%BC%8F%E5%8C%B9%E9%85%8D)
        - [日期和时间](#%E6%97%A5%E6%9C%9F%E5%92%8C%E6%97%B6%E9%97%B4)
        - [特殊类型](#%E7%89%B9%E6%AE%8A%E7%B1%BB%E5%9E%8B)
            - [布尔值](#%E5%B8%83%E5%B0%94%E5%80%BC)
                - [布尔运算符](#%E5%B8%83%E5%B0%94%E8%BF%90%E7%AE%97%E7%AC%A6)
            - [null 和 undefined](#null-%E5%92%8C-undefined)
        - [序列类型（数组？映射类型的子集？）](#%E5%BA%8F%E5%88%97%E7%B1%BB%E5%9E%8B%EF%BC%88%E6%95%B0%E7%BB%84%EF%BC%9F%E6%98%A0%E5%B0%84%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%AD%90%E9%9B%86%EF%BC%9F%EF%BC%89)
        - [映射类型（对象？）](#%E6%98%A0%E5%B0%84%E7%B1%BB%E5%9E%8B%EF%BC%88%E5%AF%B9%E8%B1%A1%EF%BC%9F%EF%BC%89)
            - [对象类型](#%E5%AF%B9%E8%B1%A1%E7%B1%BB%E5%9E%8B)
                - [类](#%E7%B1%BB)
                - [面向对象特性](#%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%89%B9%E6%80%A7)
            - [全局对象](#%E5%85%A8%E5%B1%80%E5%AF%B9%E8%B1%A1)

## 词法结构

## 类型、值和变量

### 数据类型分类

#### 原始类型

```javascript
1.2 // 数字类型
'Hello' // 字符串类型
true // 布尔类型
null // 空
undefined // 未定义
```

#### 可变类型

```javascript
// 对象类型
Person.name = "David";

// 数组
a[1] = 12;
```

#### 不可变类型

```javascript
// 数字类型
1.3 = 1 // 毫无意义

// 布尔类型
false = true // 同上

// 空
null = 1 // 同上

// undefined
undefined = true // 同上

// 字符串类型
var str = 'Hello';
str[1] = 'a';
str; // => 'Hello' 无法改变值
```

### 类型转换

```javascript
1 == true // => true
```

---

以上为尚未分类的内容。

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
"café" === "caf\u00e9" // => true: \u00e9 的含义见下面“文本”一节中的“字符集和内码”这一小节里的内容
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

## 内置数据结构

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

##### 上溢/下溢

```javascript
// Infinity and NaN 运算出现特殊值的情况

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
NaN != NaN // => true: 仅能通过此等式或 isNaN() 函数判断是否为 NaN
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

> 不影响基本使用，先 pass 这一部分。

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
'name="myForm"' // 由单引号定界的字符串，里面可以包含双引号，但不能再包含单引号了，否则将以内部出现的第一个单引号作为字符串的结束位置，这样肯定与期望中的字符串不符
"It\"s my life" // 如果由单引号/双引号定界的字符串，内部必须包含相同的引号，则引号左侧一定要加上转义字符 \
"This string\n has two lines" // 字符串内可以包含换行符 \n
```

##### 多行字符串

```javascript
// 在 ES5 中，下面为多行字符串，除了最后一行，其余行行末均需以反斜线结束
// 实际输出时，其实是一行字符串，行末加反斜线，只是为了进行标记，提示下一行还是该字符串的内容，并不是换行
"one\
long\
line"
```

#### 转义字符

反斜线（\）符号后面加一个字符，就不再表示它们的字面含义了。所有的转义字符及其含义如下表所示。

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
greeting = msg + ' ' + name // 字符串直接量和字符串变量的拼接
s.length // 字符串的长度
var s = 'hello, world' // 定义字符串
s.charAt(0) // => 'h': 第一个字符
s.charAt(s.length - 1) // => 'd': 最后一个字符
s.substring(1,4) // => 'ell': 游标在 1~3 之间的字符，即第 2~4 个字符
s.slice(-3) // => 'rld': 最后 3 个字符
s.indexOf('l') // => 2: 字符 l 第一次出现时的游标
s.lastIndexOf('l') // => 10: 字符 l 最后一次出现时的游标
s.indexOf('l', 3) // => 3: 在位置 3 及之后第一次出现字符 l 的位置
s.split(', ') // 用 ', ' 逗号加空格将字符串分割成数组
s.replace('l', 'L') // => 'heLlo, world': 替换字符串中首个小写字符 l 为大写字符 Latin
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
pattern.test(text) // => true: 匹配成功，pattern.test(text) 表示测试 text 中是否匹配 pattern 这个模式
text.search(pattern) // => 9: 首次匹配成功的字符串中第一个字符的位置
text.match(pattern) // => ['1', '2', '3']: 所有匹配成功的内容组成的数组
text.replace(pattern, '#') // => 'testing: #, #, #': 将所有匹配成功的内容换成 replace() 方法中第二个参数里的内容
text.split(/\D+/) // => ['', '1', '2', '3']: 为什么截取出来的数组，第一个元素是空字符串？text.match(/\D+/) 得到的结果也只是 'testing: `，并不包含后面的 `, `
```

### 日期和时间

```javascript
var then = new Date(2011, 0, 1, 17, 10, 30);
var now = new Date();
var elapsed = now - then; // 单位为毫秒
now.getFullYear() // => 2017
now.getMonth() // => 8: 从 0 开始的月份，而不是从 1
now.getDate() // => 19: 从 1 开始的天数
now.getDay() // => 2: 周一至周六分别为 1~6，周日为 0
```

### 特殊类型

#### 布尔值

用途：通常用于 Javascript 的控制结构中。

仅有的几个会被转换成 `false` 的假值（可用 `undefined ? true : false` 进行判断，不能用 `undefined = false` 进行判断）：

```javascript
undefined
null
0
-0
NaN
'' // 空字符串
```

除了上面的几个假值，其余的值全是真值。

```javascript
o !== null // 只要 o 不是 null，表达式就为 true
o // o 必须是真值，表达式才为 true
```

##### 布尔运算符

```javascript
a && b // a 和 b 均为真值时才为真
a || b // a 或 b 至少有一个为真值时就为真
```

#### null 和 undefined

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

### 序列类型（数组？映射类型的子集？）

### 映射类型（对象？）

#### 对象类型

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

##### 类

```javascript
// 数组类
num = [1, 1, 2, 3, 5, 7];

// 函数类
function add(a, b) {
    return a + b;
}

// 日期类
var date = new Date();

// 正则类
var pattern = /s$/;

// 错误类
var err = new Error();
```

##### 面向对象特性

```js
sort(a); // 结构化编程语言，只能这样对数组排序
a.sort(); // 面向对象语言，调用数组的方法即可
```

可以拥有方法的数据类型

```javascript
// 对象类型
Person.talk();

// 数字类型
(1.23e+20).toFixed(2)

// 字符串类型
'123-234-345'.split('-')

// 布尔类型
true.toString()
```

#### 全局对象
