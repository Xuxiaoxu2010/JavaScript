// 让jshint支持es6，不再提示箭头函数的事情
// https://stackoverflow.com/a/42870745/2667665
/*jshint esversion: 6 */

// 2017年09月11日更新：今天调用axios又没问题了……这是什么fuck？

// 如果将js单独写在一个文件中，vue调用axios会失败，所以需要用import引入
// 而import是ES6的语法，目前的浏览器并不支持，又需要用Babel将JS转码才行
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
// 为了让Babel能自动转码，又需要Webpack，真折腾啊……
// import axios from '/public/lesson9/axios.min.js';

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

// SOF上一篇非常到位的解答，说明了在JS文件中为什么要用IIFE将整个文件里的代码全部封装起来
// https://stackoverflow.com/a/2421949/2667665
(function () {

    'use strict';

    // words: 心里话       detail: 课程基本信息      catalog: 课程文档信息
    // homework/1 课程作业  teams: 团队信息          sayToMe: 给老师留言

    // TODO
    // API列表也改成从json文件中读取？

    // API列表不采用数组形式而是采用对象形式，这样使用变量的时候从字面上就能够看出来调用的是什么接口
    var api = {
        'words': 'course/1/words',
        'detail': 'course/1/detail',
        'catalog': 'course/1/catalog',
        'homework': 'course/1/homework',
        'teams': 'course/1/teams',
        'sayToMe': 'sayToMe'
    };

    var preFix = 'https://js.xinshengdaxue.com/api/v1/learnJS/';

    // jshint提示不要使用for in？不过尝试一下别的遍历对象属性的方法也是蛮不错的
    // https://stackoverflow.com/a/14379351/2667665
    Object.keys(api).forEach(function (key) {
        api[key] = preFix + api[key];
    });

    // 箭头函数中如果有大括号，就必须有return，如果没有大括号，比如下面的形式，可以不return
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

    var myWord = {
        'name': '何伟',
        'account': '15564866632',
        'content': '经过这九节课的学习，从最初研究 git 和 GitHub 的使用，到对编程中一些关键概念的思考、理解，包括回调函数、异步函数，一边看文章、看代码琢磨这些概念，一边自己动手写代码，并解决遇到的各种问题，在这个过程中，真正收获了成长。不同于以往的教科书式的学习，这次的课程，通过让大家以听课+自主学习的方式，去走完JS入门学习过程中的几个关键路径，这样能够对JS这门编程语言的方方面面，以及技术团队的实际工作流程及方法有自己的实操经验及领悟。虽然自己在编程方面已经不算是小白了，但是经过这几个星期的课程的学习，所带来的收获是受用终生的。一方面让自己逐渐开始养成了写技术文档的习惯，另外也让自己更加勇于尝试新技术，感觉在课程的学习过程中，渐渐地摸到了"学习的方法"，这种感觉是很美妙的。最后，强烈期待徐老师的进阶课程，这几个星期的学习让自己已经沉迷在JS之中了，真的是停不下来~~~'
    };

    // TODO
    // 编写函数从json文件中读取内容，并对不同的数据采用不同的处理方式
    // 然后将本js中的links和articles删除

    var vm = new Vue({
        el: '#app',
        data: {
            wordsList: [],
            name: '',
            account: '',
            content: '',
            fetchStatus: false,
            links: {
                'home': 'http://js.xinshengdaxue.com',
                'logo': 'https://o4a7cbihz.qnssl.com/picture/57140c0c-4ffa-4dde-9757-570b53f96796',
                'avatar': 'https://ws1.sinaimg.cn/large/006tKfTcgy1fi7s7vo8y0j30hs0hsaay.jpg',
                'github': 'https://github.com/xugy0926/',
                'my_github': 'https://github.com/Dream4ever/',
                'segmentfault': 'https://segmentfault.com/u/samsara0511/articles/',
                'new_index': 'https://dream4ever.github.io/JavaScript/index2.html'
            },
            teammates: [
                {
                    'name': '何伟',
                    'github': 'https://github.com/Dream4ever/',
                    'avatar': 'https://avatars2.githubusercontent.com/u/2596367?v=4&s=460'
                },
                {
                    'name': '王颖',
                    'github': 'https://github.com/MaggieWong27',
                    'avatar': 'https://avatars3.githubusercontent.com/u/30827246?v=4&s=460'
                },
                {
                    'name': '王沙沙',
                    'github': 'https://github.com/shashawang',
                    'avatar': 'https://avatars3.githubusercontent.com/u/20803305?v=4&s=460'
                },
                {
                    'name': '谢泓升',
                    'github': 'https://github.com/Risexie',
                    'avatar': 'https://avatars1.githubusercontent.com/u/30618014?v=4&s=460'
                },
                {
                    'name': '伍帆',
                    'github': 'https://github.com/french5',
                    'avatar': 'https://avatars3.githubusercontent.com/u/20951309?v=4&s=460'
                }
            ],
            articles: {
                '前端相关资源汇总': 'https://github.com/Dream4ever/Coding-Life/blob/master/Front-End/Front-End%20Resource%20Collection.md',
                'Git 实战笔记': 'https://github.com/xugy0926/getting-started-with-javascript/blob/master/topics/Git%E5%AE%9E%E6%88%98%E7%AC%94%E8%AE%B0.md',
                '《JavaScript 权威指南》勘误表中文版': 'https://dream4ever.github.io/Chinese-Errata-for-JavaScript-The-Definitive-Guide/',
                '茴字的七种写法 - 论 Web 页面中的相对路径': 'https://github.com/Dream4ever/JavaScript/blob/master/topics/relative-path.md',
                'VSCode 应用笔记': '#'
            },
            feature: {
                '轮播图加链接': '#',
                '我的GitHub里程碑': '#',
                '展示团队成员': '#',
                '上传所有用到的图片并改用相对路径': '#',
                '待定': ''
            }
        },
        methods: {
            mounted: function() {
                // $('.carousel-inner').first().children().addClass('active');
                // $('.carousel').carousel();
            },
            fetch: function () {

                // 尽量使用点运算符访问对象属性
                // https://stackoverflow.com/a/13192501/2667665
                axios.get(api.words)
                    .then(function (response) {
                        if (response.status.toString() === '200' && response.statusText.toString() === 'OK') {
                            vm.wordsList = response.data.words;
                            // this.fetchStatus = true;
                        } else {
                            // this.fetchStatus = false;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            submit: function () {

                // extract();
                JSON.parse(JSON.stringify({
                    // 为什么必须用这种写法才能检测出空值？
                    'name': this.name.trim() || myWord.name,
                    'account': this.account.trim() || myWord.account,
                    'content': this.content.trim() || myWord.content
                }));

                // TODO
                // 增加对用户输入的检查，必须全部填写内容后才可发送

                // TODO
                // 用户发送成功或者失败，都要有反馈

                axios.post(api.sayToMe, myWord)
                    .then(function (response) {
                        console.log('data posted:\n');
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            extract: function () {

                // 字符串空值的检测在下面的myWord赋值语句中无效，放到前面这里才行，为什么？
                // var user_name = this.name.trim() || myWord.name,
                //     user_account = this.account.trim() || myWord.account,
                //     user_content = this.content.trim() || myWord.content;

                // 为什么必须先stringify再parse才能成功？不能直接parse？
                // 因为axois接收的data是JSON字符串，而如果直接把对象传过去，
                // axios就会先按照默认的行为将其转换成字符串，转换结果和stringify是不一样的
                // 而且不再parse一下的话，就只是单纯的字符串而不是JSON，所以无法得到预期的结果
                return JSON.parse(JSON.stringify({
                    // 为什么必须用这种写法才能检测出空值？
                    'name': this.name.trim() || myWord.name,
                    'account': this.account.trim() || myWord.account,
                    'content': this.content.trim() || myWord.content
                }));
            }
        }
    });

    vm.fetch();
})();