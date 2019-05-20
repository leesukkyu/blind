import Vue from 'vue'

Vue.prototype.$util = {
    copy: function (obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    getNumber: function (str) {
        return str.replace(/[^0-9]/g,"");
    },
    setComma: function (str) {
        return str.replace(/[^0-9]/g,"").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
