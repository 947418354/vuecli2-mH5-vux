import api from '@/api/mainPage'
import * as types from '../mutation-types'

// initial state
const bannerState = {
  loading: true,
  error: null,
  indexTop: [],
}

// getters
const getters = {
}

// actions
const actions = {
  getBannerList({ commit }, params) {
    commit(types.INDEX_BANNER_GET_START)
    return api.getAdvertise(params).then((res) => {
      if (res.data.resultFlag) {
        commit(types.INDEX_BANNER_GET_SUCCESS, res.data)
      } else {
        commit(types.INDEX_BANNER_GET_FAIL, res.data.resultMsg)
      }
    }, (error) => {
      commit(types.INDEX_BANNER_GET_FAIL, error)
    }).finally(() => {
      commit(types.INDEX_BANNER_GET_END)
    })
  },
}

// mutations
const mutations = {
  [types.INDEX_BANNER_GET_START](state) {
    state.loading = true
    state.error = null
  },
  [types.INDEX_BANNER_GET_SUCCESS](state, data) {
    const rows = data.resultContent
    state.indexTop = rows.indexTop ? rows.indexTop.slice(0, 5) : []
  },
  [types.INDEX_BANNER_GET_FAIL](state, error) {
    state.error = error
    state.indexTop = []
    state.indexCenter = []
    state.indexFoot = []
    state.mineBanner = []
  },
  [types.INDEX_BANNER_GET_END](state) {
    state.loading = false
  },
}

export default {
  state: bannerState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
