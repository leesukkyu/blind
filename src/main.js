import Vue from 'vue'

import './plugins/vuetify'

import './plugins/axios'

import router from './plugins/router'

import i18n from './plugins/i18n'

import store from './vuex/store'

import './directive'

import './components/util/util'

import App from './App'

// Vue 시작
window.vm = new Vue({
  store,
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
