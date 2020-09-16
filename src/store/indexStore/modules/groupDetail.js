import * as types from '../mutation-types'

const initialState = {
  loading: false,
  info: {},
  error: null,
}

const getters = {
}

const actions = {
  setCurrentDetail({ commit }, params) {
    return commit(types.GET_GROUP_DETAIL_INFO, params)
  },
  clearCurrentDetail({ commit }) {
    commit(types.CLEAR_GROUP_DETAIL_INFO)
  },
}

const mutations = {
  [types.GET_GROUP_DETAIL_INFO](state, data) {
    state.info = data
  },
  [types.GET_GROUP_TAB_FAIL](state) {
    state.info = {}
  },
}

export default {
  state: initialState,
  actions,
  getters,
  mutations,
  namespaced: true,
}
