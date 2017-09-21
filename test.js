/* ES5 */

var isMomHappy = Math.random() > 0.5;

// 承诺
var willIGetNewPhone = new Promise(
    function (resolve, reject) {
        if (isMomHappy) {
            var phone = {
                '品牌': '苹果',
                '颜色': '亮黑'
            };
            resolve(phone); // 嗯，妈妈心情不错，给你买手机了，实现诺言了
        } else {
            var reason = new Error('妈妈不高兴');
            reject(reason); // 妈妈不高兴，不要问为什么，不然揍你哦
        }
    }
);

// 执行承诺
var askMom = function () {
    willIGetNewPhone
        .then(function (fulfilled) {
            // 哈哈，妈妈真的买手机啦
            console.log(fulfilled);
            // 输出：'品牌': '苹果', '颜色': '亮黑色'
        })
        .catch(function (error) {
            // 唉，妈妈没有买手机
            console.log(error.message);
            // 输出： '妈妈不高兴'
        });
};

// 第二个承诺
var showOff = function (phone) {
    return new Promise(
        function (resolve, reject) {
            var message = '小伙伴们，我有新的' + phone['颜色'] + phone['品牌'] + '手机啦！';

            resolve(message);
        }
    );
};

// 第二个承诺的迷你版
var showOff = function (phone) {
    var message = '小伙伴们，我有新的' + phone['颜色'] + phone['品牌'] + '手机啦！';

    return Promise.resolve(message);
};

// 开始要求兑现承诺
var askMom = function () {
    willIGetNewPhone
        .then(showOff) // 在这里进行链式调用
        .then(function (fulfilled) {
            console.log(fulfilled);
            // 输出：'小伙伴们，我有新的亮黑色苹果手机啦！'
        })
        .catch(function (error) {
            // 唉，妈妈果然还是没给我买手机
            console.log(error.message);
            // 输出： '妈妈不高兴'
        });
};

// 开始要求兑现承诺
var askMom = function () {
    console.log('一会儿要问问妈妈买手机了没'); // 开始调用 promise 之前

    willIGetNewPhone
        .then(showOff) // 在这里进行链式调用
        .then(function (fulfilled) {
            console.log(fulfilled);
            // 输出：'小伙伴们，我有新的亮黑色苹果手机啦！'
        })
        .catch(function (error) {
            // 唉，妈妈果然还是没给我买手机
            console.log(error.message);
            // 输出： '妈妈不高兴'
        });

    console.log('问过妈妈了……'); // 开始调用 promise 之后
};

askMom();

/* ES6 */
const isMomHappy = Math.random() > 0.5;

// 承诺
const willIGetNewPhone = new Promise(
    (resolve, reject) => { // 箭头函数
        if (isMomHappy) {
            const phone = {
                '品牌': '苹果',
                '颜色': '亮黑'
            };
            resolve(phone);
        } else {
            const reason = new Error('妈妈不高兴');
            reject(reason);
        }
    }
);

const showOff = function (phone) {
    const message = '小伙伴们，我有新的' + phone['颜色'] + phone['品牌'] + '手机啦';
    return Promise.resolve(message);
};

// 开始要求兑现承诺
const askMom = function () {
    willIGetNewPhone
        .then(showOff)
        .then(fulfilled => console.log(fulfilled)) // 箭头函数
        .catch(error => console.log(error.message)); // 箭头函数
}

/* ES7 */
const isMomHappy = Math.random() > 0.5;

// 承诺
const willIGetNewPhone = new Promise(
    (resolve, reject) => {
        if (isMomHappy) {
            const phone = {
                '品牌': '苹果',
                '颜色': '亮黑'
            };
            resolve(phone);
        } else {
            const reason = new Error('妈妈不高兴');
            reject(reason);
        }
    }
)

// 第二个承诺
async function showOff(phone) {
    return new Promise(
        (resolve, reject) => {
            var message = '小伙伴们，我有新的' + phone['颜色'] + phone['品牌'] + '手机啦'; // 这里为什么用 var 而不是 const？
            resolve(message);
        }
    )
}

// 开始要求兑现承诺
async function askMom() {
    try {
        console.log('一会儿要问问妈妈买手机了没');

        let phone = await willIGetNewPhone;
        let message = await showOff(phone);

        console.log(message);
        console.log('问过妈妈了……');
    } catch (error) {
        console.log(error.message);
    }
};

(async () => {
    await askMom();
});