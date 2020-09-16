import * as types from '../mutation-types'

const registerState = {
  cacheUserinfo: {},
}

const getters = {}

const actions = {
  // 更新缓存的用户信息
  updateCacheUserInfo({ commit }, data) {
    commit(types.UPDATE_CACHE_USER_INFO, data)
  },
  //
  resetCacheUserInfo({ commit }, data) {
    commit(types.RESET_CACHE_USER_INFO, data)
  },
}

const mutations = {
  // 重置缓存用户信息
  [types.RESET_CACHE_USER_INFO](state, data) {
    state.cacheUserinfo = data
  },
  // 更新缓存用户信息
  [types.UPDATE_CACHE_USER_INFO](state, data) {
    state.cacheUserinfo = { ...state.cacheUserinfo, ...data }
  },
}

export default {
  state: registerState,
  actions,
  getters,
  mutations,
  namespaced: true,
}
