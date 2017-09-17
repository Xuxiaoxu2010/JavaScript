# 《JavaScript 权威指南》学习笔记

## Lexical Structure 词法结构

## Charset: Unicode 字符集

## Case Sensitivity 区分大小写

```js
var a = 0;
var A = 1;
```

## Unicode Escape Sequences Unicode 转义序列

```js
"café" === "caf\u00e9" // => true
```

## Normalization 标准化

```js
// 返回标准化的 Unicode 字符串
"café".normalize() // => "café"
"caf\u00e9".normalize() // => "café"
```

## 注释

```js
// single-line comment 单行注释
/* a comment 注释段 */ // another comment 另一个注释段

/*
* multiple lines comment
* 多行注释
*/
```

## Literal 直接量

```js
12 // number 数字
1.2 // number 小数
"hello js" // string 字符串
'hi' // also string 也是字符串
true // Boolean value 布尔值
/javascript/gi // regular expression literal 正则表达式直接量
null // Absence of an object 空
[1, 2, 3] // array 数组
a = { x: 1, y: 2 }; // object 对象
```

## identifier 标识符

```js
// Below are all legal identifiers 下面的都是合法的标识符
i;
my_variable_name;
v8;
_dummy;
$str;
sí;
π;
```

## Reserved Words 保留字

```js
break
null
/* May be Used in the Future in ES 未来版本的ES中会用到 */
const
super
/* Reserved in Strict Mode 在严格模式下是保留字 */
let
yield
arguments
eval
/* Java Keywords Java的关键字 */
abstract
private
/* Global Variables and Functions 全局变量和函数 */
Infinity
eval
```

## Optional Semicolons 可选的分号

```js
var a
a
=
3
console.log(a)
/* => var a; a = 3; console.log(a); */
```

## Primitive Type 原始类型

```javascript
1.2 // Number Type 数字类型
'Hello' // String Type 字符串类型
true // Boolean Type 布尔类型
null // 空
undefined // 未定义
```

## Object Type 对象类型

```javascript
// Normal Object 普通对象
Person: {
    "name": "Henry",
    "age": 28
}

// Array Object 数组对象
num = [1, 1, 2, 3, 5, 7];

// Function Object 函数对象
function add(a, b) {
    return a + b;
}
```

## Object-Oriented 面向对象特性

```js
sort(a); // 结构化编程语言，只能这样对数组排序
a.sort(); // 面向对象语言，调用数组的方法即可
```
