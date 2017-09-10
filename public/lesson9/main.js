// https://stackoverflow.com/a/42870745/2667665
/*jshint esversion: 6 */

// 如果将js单独写在一个文件中，vue调用axios会失败，所以需要用import引入
// 而import是ES6的语法，目前的浏览器并不支持，又需要用Babel将JS转码才行
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
// 为了让Babel能自动转码，又需要Webpack，真折腾啊……
import axios from '/public/lesson9/axios.min.js';

// 使用ES6的必要性
// https://stackoverflow.com/a/39685721/2667665
// How to Use ES6 for Universal JavaScript Apps
// https://medium.com/javascript-scene/how-to-use-es6-for-isomorphic-javascript-apps-2a9c3abe5ea2
// Trying out JavaScript ES6 using Babel
// https://onsen.io/blog/trying-out-javascript-es6-using-babel/
// 阮一峰的Babel介绍
// http://es6.ruanyifeng.com/#docs/intro#Babel-转码器
// 通过 Babel 使用 ES6 的 import
// https://aotu.io/notes/2016/09/22/es6-import-with-babel/index.html
// import - MDN
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

(function () {

    'use strict';

    var preFix = 'https://js.xinshengdaxue.com/api/v1/learnJS/';

    // words: 心里话       detail: 课程基本信息      catalog: 课程文档信息
    // homework/1 课程作业  teams: 团队信息          sayToMe: 给老师留言

    // 正确写法
    // var apiList =
    //     ['course/1/words',
    //         'course/1/detail',
    //         'course/1/catalog',
    //         'course/1/homework',
    //         'course/1/teams',
    //         'sayToMe']
    //         .map(api => preFix + api);

    // 错误写法
    // apiList =
    //     ['course/1/words',
    //         'course/1/detail',
    //         'course/1/catalog',
    //         'course/1/homework',
    //         'course/1/teams',
    //         'sayToMe']
    //         .map(function (api) {
    //             // function中如果不主动return，返回值就是undefined
    //             api = preFix + api;
    //         });

    // API列表不采用数组形式而是采用对象形式，因为这样使用变量时一目了然
    var api = {
        'words': 'course/1/detail',
        'catalog': 'course/1/catalog',
        'homework': 'course/1/homework',
        'teams': 'course/1/teams',
        'sayToMe': 'sayToMe'
    };

    for (var a in api) {
        api[a] = preFix + api[a];
    }

    var vm = new Vue({
        el: '#app',
        data: {
            wordsList: []
        },
        methods: {
            fetchData: function () {
                // 尽量使用点运算符访问对象属性
                // https://stackoverflow.com/a/13192501/2667665
                axios.get(api.words)
                    .then(function (response) {
                        console.log(response);
                        app.wordsList = response.data.words;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            sendData: function () {
                // TODO
            }
        }
    });

    vm.fetchData();

    var body = {
        'name': '何伟',
        'account': '15564866632',
        'content': '经过这九节课的学习，从最初研究 git 和 GitHub 的使用，到对编程中一些关键概念的思考、理解，包括回调函数、异步函数，一边看文章、看代码琢磨这些概念，一边自己动手写代码，并解决遇到的各种问题，在这个过程中，真正收获了成长。不同于以往的教科书式的学习，这次的课程，通过让大家以听课+自主学习的方式，去走完JS入门学习过程中的几个关键路径，这样能够对JS这门编程语言的方方面面，以及技术团队的实际工作流程及方法有自己的实操经验及领悟。虽然自己在编程方面已经不算是小白了，但是经过这几个星期的课程的学习，所带来的收获是受用终生的。一方面让自己逐渐开始养成了写技术文档的习惯，另外也让自己更加勇于尝试新技术，感觉在课程的学习过程中，渐渐地摸到了"学习的方法"，这种感觉是很美妙的。最后，强烈期待徐老师的进阶课程，这几个星期的学习让自己已经沉迷在JS之中了，真的是停不下来~~~'
    };

    var axios = require('axios');

    axios.post('https://js.xinshengdaxue.com/api/v1/learnJS/sayToMe', body)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
})();