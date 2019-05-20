import * as types from '../mutation-types'

const state = {
  userTabs: []
}

/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const mutations = {
  [types.ADD_USER_TAB](state, payLoad) {
    state.userTabs.push(payLoad);
  },
  [types.DEL_USER_TAB](state, payLoad) {
    state.userTabs.splice(state.userTabs.indexOf(payLoad.item), 1)
  }
}

export default {
  state,
  mutations
}