var app = new Vue({
  el: '#app',   // #app 和html中div#id的 app 对应
  data: {
    wordsList: []  // 变量wordsList可以在html使用
  },
  methods: {
    fetchData: function() {
      axios.get('https://js.xinshengdaxue.com/api/v1/learnJS/course/1/words')
        .then(function (response) {
          app.wordsList = response.data.words;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    sendData: function() {
      //TODO: 对老师说点什么呢？
    }
  }
});

app.fetchData();

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