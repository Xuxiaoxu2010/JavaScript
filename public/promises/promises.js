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