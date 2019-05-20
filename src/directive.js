import Vue from "vue";

// Register a global custom directive called v-focus
Vue.directive('focus', {
    // When the bound element is inserted into the DOM...
    inserted: function (el) {
        el.querySelectorAll('input')[0].focus();
    }
})

Vue.directive('comma', {
    inserted: function (el) {
        var $input = el.querySelectorAll('input')[0];
        $input.addEventListener('keyup', function(){
            $input.value = $input.value.replace(/[^0-9]/g,"").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        })
    }
})
