// import Vue from 'vue'
import request from '@/api/center'
import cookie from 'js-cookie'
import * as types from '../mutation-types'

const ua = window.navigator.userAgent
const state = {
  isIos: /iPhone OS/.test(ua),
}

const actions = {
  getSystemVersion({ commit }) {
    const Version = cookie.get('http_appVersion')
    if (Version) {
      commit(types.SYSTEM_SET_VERSION, Version)
    }
  },
  setSystemType({ commit }, type) {
    commit(types.SYSTEM_SET_TYPE, type)
  },
  queryAppInfo({ commit }, params) {
    commit(types.GET_APP_INFO_START)
    return request.queryAppInformation(params).then((res) => {
      if (res.data.success) {
        commit(types.GET_APP_INFO_SUCCESS, res.data)
      } else {
        commit(types.GET_APP_INFO_FAIL, res.data.errorMsg)
      }
    }, (error) => {
      commit(types.GET_APP_INFO_FAIL, error)
    }).finally(() => {
      commit(types.GET_APP_INFO_END)
    })
  },
}

const isWechat = /MicroMessenger/i.test(ua)
const isInApp = !!cookie.get('http_ostype') || (window.webkit && window.webkit.messageHandlers && !isWechat)

const getters = {
  isInApp() {
    const isInWechat = /MicroMessenger/i.test(ua)
    return !!cookie.get('http_ostype') || (window.webkit && window.webkit.messageHandlers && !isInWechat) || global.isYxx
  },
  isInBrowser(state) {
    return state.type === 'browser'
  },
  isInAndroid() {
    return ua.indexOf('Android') > -1
  },
  getAppName() {
    return cookie.get('channel')
  },
  getAppVersion() {
    // 从cookie里面获取，如果没有且不在APP，则默认取GXB-方便调试
    return cookie.get('http_appVersion') || (!isInApp && 'GXB')
  },
}

const mutations = {
  [types.SYSTEM_SET_VERSION](state, version) {
    state.version = version
  },
  [types.SYSTEM_SET_TYPE](state, type) {
    state.type = type
  },
  [types.GET_APP_INFO_START](state) {
    state.loading = true
    state.error = null
  },
  [types.GET_APP_INFO_SUCCESS](state, data) {
    state.info = data.value
  },
  [types.GET_APP_INFO_FAIL](state, error) {
    state.error = error
    state.info = {}
  },
  [types.GET_APP_INFO_END](state) {
    state.loading = false
  },
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
}
