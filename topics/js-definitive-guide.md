# 《JavaScript 权威指南》学习笔记

> 是否需要重新调整为JS文件？各章、节、小节依次是嵌套的对象，输入章、节、小节名称，即输出该小节关键知识点。
> Lexical.Charset.CaseSensitive // 输出关键知识点

## 词法结构

### 字符集

#### 区分大小写

```js
var a = 0;
var A = 1;
```

#### 转义序列

```js
"café" === "caf\u00e9" // => true
```

#### 标准化

```js
// 返回标准化的 Unicode 字符串
"café".normalize() // => "café"
"caf\u00e9".normalize() // => "café"
```

### 注释

```js
//  单行注释
/* 注释段 */ // 另一个注释段

/*
* 多行注释
*/
```

### 直接量

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

### 标识符

```js
// 下面的都是合法的标识符
i;
my_variable_name;
v8;
_dummy;
$str;
sí;
π;
```

#### 保留字

```js
break
null
/* 未来版本的ES中会用到 */
const
super
/* 在严格模式下是保留字 */
let
yield
arguments
eval
/* Java的关键字 */
abstract
private
/* 全局变量和函数 */
Infinity
eval
```

### 可选的分号

```js
var a
a
=
3
console.log(a)
/* => var a; a = 3; console.log(a); */
```

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

可以拥有方法的数据类型：

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
1.3 = 1.毫无意义

// Boolean 布尔类型
false = 同上

// null 空
null = 同上

undefined
undefined = true // 同上

// 字符串类型
var str = 'Hello';
str[1] = 'a';
str; // => 'Hello' 无法改变值
```

### 类型转换

```javascript
1 == true // true
```

### 变量无类型

```javascript
var a = 1.2;
a = 'Hello';
a = [1, 2, 3];
```

### 数字

#### 整型直接量

```javascript
0
0xff // 十六进制 => 255（十进制）
0377 // 八进制 => 255（十进制） 在ES6的严格模式下是禁止的
```

#### 浮点型直接量

```javascript
3.14
.12
6.07e23
1.2E-15
```

#### 算术运算

```javascript
// Math对象的函数和常量
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
Number.MIN_VALUE / 2 // 0
-Number.MIN_VALUE / 2 // -0
1 / Infinity // 0
-1 / Infinity // -0
```

##### 特殊值的判断

```javascript
NaN != NaN // true 仅能通过此等式或 isNaN() 函数判断是否为 NaN
isFinite(x) // 只有在参数为 NaN、Infinity 或 -Infinity 时才为 false
1 / 0 !== 1 / -0 // 只有在这个时候，0 和 -0 才不相等
```

#### 浮点数精度

```javascript
(.3 - .2) !== (.2 - .1) // true 因为 JS 中的浮点数只是对应实数的近似表示
```

**解决方法**：对于精度要求高的场合，可用大整数进行运算，记得保证最终值的小数点位数不要错就可以。

#### 日期和时间

```javascript
var then = new Date(2011, 0, 1, 17, 10, 30);
var now = new Date();
var elapsed = now - then; // 单位为毫秒
now.getFullYear() // 2017
now.getMonth() // 8，从 0 开始的月份，而不是从 1
now.getDate() // 19，从 1 开始的天数
now.getDay() // 2，周一至周六分别为 1~6，周日为 0
```

### 文本

#### 字符集和内码

> 不影响基本使用，先 pass 这一部分。

JavaScript 采用 UTF-16 编码的 Unicode 字符集，每个字符均用无符号的 16 位值表示。
因为有很多符号要表示，所以 Unicode 是分区定义的，每个区也称为一个平面（plane），可存放 65536（2^16）个字符。
最前面的 65536 个字符位称为基本平面（BMP），它的码点范围为：`0 ~ 2^16 - 1`，对应的 16 进制就是 `U+0000 ~ U+FFFF`。所有最常见的字符都在这个平面，这也是 Unicode 最先定义和公布的一个平面。
剩下的字符都放在辅助平面（SMP），码点范围从 `U+010000` 开始。

```javascript
U+0000 // null，0000 为码点（code point），也是该字符的编号
U+597D // 好
```

参考资料：[Unicode与JavaScript详解](http://www.ruanyifeng.com/blog/2014/12/unicode.html)

1. JavaScript 中并没有表示单个字符的“字符型”，只有字符串这一种类型。
