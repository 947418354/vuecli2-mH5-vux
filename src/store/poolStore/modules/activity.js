import api from '@/api/activites'
import * as types from '../mutation-types'

// initial state
const activityState = {
  loading: true,
  info: {},
  broadcastList: [],
  error: null,
}

const getters = {

}

// actions
const actions = {
  getActivity({ commit }, params) {
    commit(types.ACTIVITY_GET_START)
    return api.getActivity(params).then((res) => {
      if (res.data.resultFlag) {
        commit(types.ACTIVITY_GET_SUCCESS, res.data)
      } else {
        commit(types.ACTIVITY_GET_FAIL, res.data.resultMsg)
      }
    }, (error) => {
      commit(types.ACTIVITY_GET_FAIL, error)
    }).finally(() => {
      commit(types.ACTIVITY_GET_END)
    })
  },
  getBroadcastList({ commit }, params) {
    commit(types.ACTIVITY_BROADCAST_GET_START)
    return api.getBroadcastList(params).then((res) => {
      if (res.data.resultFlag) {
        commit(types.ACTIVITY_BROADCAST_GET_SUCCESS, res.data)
      } else {
        commit(types.ACTIVITY_BROADCAST_GET_FAIL, res.data.resultMsg)
      }
    }, (error) => {
      commit(types.ACTIVITY_BROADCAST_GET_FAIL, error)
    }).finally(() => {
      commit(types.ACTIVITY_BROADCAST_GET_END)
    })
  },
  resetProductDetail({ commit }) {
    commit(types.PRODUCT_DETAIL_RESET_INFO)
  },
}

// mutations
const mutations = {
  [types.PRODUCT_DETAIL_RESET_INFO](state) {
    state.loading = false
    state.info = {}
    state.error = null
  },
  [types.ACTIVITY_GET_START](state) {
    state.loading = true
    state.error = null
  },
  [types.ACTIVITY_GET_SUCCESS](state, data) {
    const product = data.resultContent || {}
    state.info = product
  },
  [types.ACTIVITY_GET_FAIL](state, error) {
    state.error = error
    state.info = {}
  },
  [types.ACTIVITY_GET_END](state) {
    state.loading = false
  },
  [types.ACTIVITY_BROADCAST_GET_START](state) {
    state.loading = true
    state.error = null
  },
  [types.ACTIVITY_BROADCAST_GET_SUCCESS](state, data) {
    const broadcast = data.resultContent || []
    state.broadcastList = broadcast
  },
  [types.ACTIVITY_BROADCAST_GET_FAIL](state, error) {
    state.error = error
    state.info = {}
  },
  [types.ACTIVITY_BROADCAST_GET_END](state) {
    state.loading = false
  },
}

export default {
  state: activityState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
