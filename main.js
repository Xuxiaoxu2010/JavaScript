'use strict'

var result = '';

$.ajax({
    url: "https://raw.githubusercontent.com/Dream4ever/JavaScript/master/content.json",
    success: function (data, status) {
        result = JSON.parse(data);

        var vm = new Vue({
            el: '#app',
            data: {
                words: result
            }
        });
    }
});
