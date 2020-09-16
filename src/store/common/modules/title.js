// import Vue from 'vue'
import * as types from '../mutation-types'

const initState = {
  title: '',
  type: '',
  rightCb: null,
  rightText: '',
  leftCb: null,
  leftText: '',
}

const actions = {
  setTitleText({ commit }, type) {
    commit(types.COMMON_TITLE_SET_TEXT, type)
  },
  setHeader({ commit }, titleObj) {
    commit(types.COMMON_TITLE_SET_ALL, titleObj)
  },
  setType({ commit }, type) {
    commit(types.COMMON_TITLE_SET_TYPE, type)
  },
  setRightOption({ commit }, option) {
    commit(types.COMMON_TITLE_SET_RIGHT, option)
  },
  setLeftOption({ commit }, option) {
    commit(types.COMMON_TITLE_SET_LEFT, option)
  },
}

const getters = {
}

const mutations = {
  [types.COMMON_TITLE_SET_TEXT](state, cont) {
    if (cont) {
      state.title = cont
      state.rightCb = null
      state.rightText = ''
      state.leftCb = null
      state.leftText = ''
    }
  },
  [types.COMMON_TITLE_SET_ALL](state, titleObj) {
    if (titleObj.title) {
      state.title = titleObj.title
    }
    state.type = 'normal'
    if (titleObj.right) {
      state.rightCb = titleObj.right.cb || null
      state.rightText = titleObj.right.text || ''
    }
    if (titleObj.left) {
      state.leftCb = titleObj.left.cb || null
      state.leftText = titleObj.left.text || ''
    }
  },
  [types.COMMON_TITLE_SET_TYPE](state, cont) {
    state.type = cont
  },
  [types.COMMON_TITLE_SET_RIGHT](state, option) {
    state.rightCb = option.cb
    state.rightText = option.text
    state.type = 'normal'
  },
  [types.COMMON_TITLE_SET_LEFT](state, option) {
    state.leftCb = option.cb
    state.leftText = option.text
    state.type = 'normal'
  },
}

export default {
  namespaced: true,
  state: initState,
  actions,
  getters,
  mutations,
}
