/* eslint-disable */
import * as types from './mutation-types'
import jquery from 'jquery'
import router from '../plugins/router'
import Vue from 'vue'

// jquery.ajax({
//   type: 'json',
//   method: 'post',
//   url: 'http://restapi.gaandev.com/back_api/member_app_info',
//   data: {
//     member_id: 'test',
//     member_pw: 'jquery'
//   },
//   success: function (rs) {
//     console.log(rs);
//   }
// })

// 로그인
export const login = function (context, payload) {
  Vue.prototype.$http({
    method: 'post',
    url: '/back_api/member_app_info',
    data: {
      member_id : payload.id,
      member_pw : payload.password
    }
  }).then(response => {
    if(response.status == 'Y'){
      response.id = payload.id;
      context.commit(types.CHANGE_LOGIN_USER, {
        rs : response
      });
      router.push('mainPage');
    }else{
      alert('아이디나 비번 확인');
    }
  }).catch(response => {
    console.log(response)
  })
}

// 풍선 도움말
export const changeHelp = function(context){
  context.commit(types.CHANGE_HELP);
}

// 유저탭 추가
export const addUserTab = function (context, payload) {
  context.commit(types.ADD_USER_TAB, payload);
}

// 유저탭 추가
export const delUserTab = function (context, payload) {
  context.commit(types.DEL_USER_TAB, payload);
}

// 스낵바 열기
export const openSnackbar = function (context, payload) {
  context.commit(types.OPEN_SNACKBAR, payload);
}

// 스낵바 열기
export const closeSnackbar = function (context, payload) {
  context.commit(types.CLOSE_SNACKBAR, payload);
}

// AJAX 애니메이션
export const changeAjaxState = function (context, payload) {
  context.commit(types.CHANGE_AJAX_STATE, payload);
}

