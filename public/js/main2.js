(function () {
    'use strict';

    var bg = 'https://raw.githubusercontent.com/Dream4ever/Pics/master/matrix.jpg';

    var vm = new Vue({
        el: '#app',
        methods: {
            mounted: function () {
                axios.get(bg)
                    .then(changeBg())
                    .catch(err => console.log(err));
            }
        }
    });

    vm.mounted();

    function changeBg() {
        var rootDiv = $('#app');
        rootDiv.css('background-image', 'url(' + bg + ')');
    }
})();