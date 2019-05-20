import * as types from '../mutation-types'

const state = {
  loginInfo : {
    id : null
  }
}

/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const mutations = {
  [types.CHANGE_LOGIN_USER] (state, payLoad) {
    state.loginInfo = payLoad.rs;
  }
}

export default {
  state,
  mutations
}