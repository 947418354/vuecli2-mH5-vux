import api from '@/api/account'
import * as types from '../mutation-types'

const initialState = {
  loading: false,
  list: [],
  error: null,
}

const getters = {}

const actions = {
  getSignAgreement({ commit }, params) {
    commit(types.GET_SIGN_AGREEMENT_START)
    api.getSignAgreement(params).then((res) => {
      if (res.data.resultFlag) {
        commit(types.GET_SIGN_AGREEMENT_SUCCESS, res.data.resultContent)
      } else {
        const { resultMsg } = res.data
        commit(types.GET_SIGN_AGREEMENT_FAIL, resultMsg)
      }
    }).catch((error) => {
      commit(types.GET_SIGN_AGREEMENT_FAIL, error.errorMsg || '网络错误')
    }).finally(() => {
      commit(types.GET_SIGN_AGREEMENT_END)
    })
  },
}

const mutations = {
  [types.GET_SIGN_AGREEMENT_START](state) {
    state.loading = true
    state.error = null
  },
  [types.GET_SIGN_AGREEMENT_SUCCESS](state, data) {
    state.list = data
  },
  [types.GET_SIGN_AGREEMENT_FAIL](state, error) {
    state.error = error
    state.info = []
  },
  [types.GET_SIGN_AGREEMENT_END](state) {
    state.loading = false
  },
}

export default {
  state: initialState,
  actions,
  getters,
  mutations,
  namespaced: true,
}
