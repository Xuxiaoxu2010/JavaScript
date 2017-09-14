# [翻译] Promises 从菜鸡到吃鸡

原文链接：[JavaScript Promises for Dummies](https://scotch.io/tutorials/javascript-promises-for-dummies)

译者注：对于刚接触 JavaScript Promises 这个概念的人来说，要真正理解它还是有些困难的，比如我就找了好几篇文章，看来看去也没弄明白。还好在网上看到了上面的这篇文章，全方位、多角度、接地气地为我们把 Promises 的方方面面讲得清清楚楚，妈妈再也不怕我用 Promises 啦。

好，下面开始上课，原文翻译如下。

---

## 理解 Promises

想象这么一个场景：

> 你是一个小孩子，妈妈答应你（promises）下周会给你买一部新手机。

好了，问题来了，在此时此刻，你并不知道下周妈妈到底会不会给你买一部新手机，对不对？她开心的话，也许会给你买一部；但是你要是把妈妈惹生气了的话，新手机？别想了。

嗯，这就是一个 **promise**（承诺）。一个 promise（承诺）有三种状态：

1. 等待（**pending**）承诺的结果：你不知道下周会不会有新手机。
1. 实现了（**resolved**）承诺：妈妈真的给你买了一部新手机诶！
1. 违背了（**rejected**）承诺：你太闹腾了，妈妈不给你买手机了，别想了。

## 立下诺言（Promise）

让我们来把上面的场景转换为实际的 JavaScript 代码：

```
/* ES5 */

// 妈妈的心情是个随机数，得看你作不作
// 就算你不作，妈妈也不一定高兴哦
var isMomHappy = Math.random() > 0.5;

// Promise
var willIGetNewPhone = new Promise(
    function (resolve, reject) {
        if (isMomHappy) {
            var phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone); // 嗯，妈妈心情不错，给你买手机了，实现诺言了
        } else {
            var reason = new Error('mom is not happy');
            reject(reason); // 妈妈不高兴，不要问为什么，不然揍你哦
        }
    }
);
```

上面的代码还算比较容易懂吧？不懂的话就补补相关的基础知识。下面来解释解释这段代码：

1. 