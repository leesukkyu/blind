import * as types from '../mutation-types'

const state = {
  help : false
}

/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const mutations = {
  [types.CHANGE_HELP] (state) {
    state.help = !state.help;
  }
}

export default {
  state,
  mutations
}