# 《JavaScript 权威指南》学习笔记

> 是否需要重新调整为JS文件？各章、节、小节依次是嵌套的对象，输入章、节、小节名称，即输出该小节关键知识点。
> Lexical.Charset.CaseSensitive => 输出关键知识点

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

### Type Convertion 类型转换

```javascript
1 == true // true
```

### Untyped Variable 变量无类型

```javascript
var a = 1.2;
a = 'Hello';
a = [1, 2, 3];
```

### Number 数字

#### Integer Lietrals 整型直接量

```javascript
0
0xff // 十六进制 => 255（十进制）
0377 // 八进制 => 255（十进制） 在ES6的严格模式下是禁止的
```

#### Floating-Point Lietrals 浮点型直接量

```javascript
3.14
.12
6.07e23
1.2E-15
```

#### Arithmetic 算术运算

```javascript
// Math对象的函数和常量
Math.pow(2, 53)
Math.PI
Math.random()
```

```javascript
// Infinity and NaN 运算出现特殊值的情况
```
