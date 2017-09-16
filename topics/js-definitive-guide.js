/* Lexical Structure 词法结构 */

/* Charset: Unicode 字符集 */

/* Case Sensitivity 区分大小写 */
var a = 0;
var A = 1;

/* Unicode Escape Sequences Unicode 转义序列 */
"café" === "caf\u00e9" // => true

/* Normalization 标准化 */
/* 返回标准化的 Unicode 字符串 */
"café".normalize() // => "café"
"caf\u00e9".normalize() // => "café"

// single-line comment 单行注释
/* a comment 注释段 */ // another comment 另一个注释段
/* 
* multiple lines comment
* 多行注释
*/

literal: {
    /* Literal 直接量 */
    12; // number 数字
    1.2; // number 小数
    "hello js"; // string 字符串
    'hi'; // also string 也是字符串
    true; // Boolean value 布尔值
    /javascript/gi; // regular expression literal 正则表达式直接量
    null; // Absence of an object 空
    [1, 2, 3]; // array 数组
    a = { x: 1, y: 2 }; // object 对象
}

identifiers: {
    /* identifier 标识符 */
    /* 下面的都是合法的标识符 */
    i;
    my_variable_name;
    v8;
    _dummy;
    $str;
    sí;
    π;
};

Reserved_Words: {
    /* Reserved Words 保留字 */
    break;
    null;
    /* May be Used in the Future in ES */
    const ;
    super (1, 2)
    /* Reserved in Strict Mode */
    let;
    yield;
    arguments;
    eval;
    /* Java Keywords */
    abstract;
    private;
    /* Global Variables and Functions */
    Infinity;
    Object;
};

/* Optional Semicolons 可选的分号 */
var a
a
=
3
console.log(a)
/* => var a; a = 3; console.log(a); */