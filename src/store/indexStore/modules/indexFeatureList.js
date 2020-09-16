import api from '@/api/mainPage'
import * as types from '../mutation-types'
// initial state
const featureState = {
  featureList: [],
}

// getters
const getters = {
}

// actions
const actions = {
  getIndexFeature({ commit }, params) {
    return api.featureProduct(params).then((res) => {
      if (res.data.resultFlag) {
        commit(types.INDEX_FEATURE_GET_SUCCESS, res.data.resultContent)
      } else {
        commit(types.INDEX_FEATURE_GET_FAIL, res.data.resultMsg)
      }
    }, (error) => {
      commit(types.INDEX_FEATURE_GET_FAIL, error)
    })
  },
}

// mutations
const mutations = {
  [types.INDEX_FEATURE_GET_SUCCESS](state, data) {
    state.featureList = data.products
  },
  [types.INDEX_FEATURE_GET_FAIL](state) {
    state.featureList = []
  },
}

export default {
  state: featureState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
