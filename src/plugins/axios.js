import Vue from 'vue'
import axios from 'axios'
import querystring from 'query-string'
import store from '../vuex/store'

var ajaxCount = 0;

Vue.prototype.$http = axios.create({
  // 기본 API URL
  baseURL: 'http://restapi.gaandev.com/',
  timeout: 30000,
  headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
});

// 요청데이터 전처리
Vue.prototype.$http.interceptors.request.use(function (config) {
  ajaxCount++;
  if(config.data.ajaxAnimation !== false){
    if(ajaxCount == 1){
      store.dispatch("changeAjaxState", {
        isShow: true
      });
    }
  }
  console.log('-------------보낸 데이터--------------');
  console.log(config.url);
  console.log(config.data);
  if(config.data instanceof FormData){
    console.log('폼 데이터 전송');
  }else{
    config.data = querystring.stringify(config.data, {arrayFormat: 'index'});
  }
  
  console.log(config.data);
  console.log('------------------------------------');
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
Vue.prototype.$http.interceptors.response.use(function (response) {
  ajaxCount--;
  if(ajaxCount == 0){
    store.dispatch("changeAjaxState", {
      isShow: false
    });
  }
  console.log('-------------받은 데이터--------------');
  console.log(response);
  console.log('------------------------------------');
  return response.data;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
