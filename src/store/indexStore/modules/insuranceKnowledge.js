import api from '@/api/account'
import * as types from '../mutation-types'

const initialState = {
  loading: false,
  list: [],
  detail: {},
  error: null,
}

const getters = {}

const actions = {
  getInsuranceKnowledge({ commit }, params) {
    commit(types.GET_INSURANCE_KNOWLEDGE_START)
    api.insuranceKnowledge(params).then((res) => {
      if (res.data.resultFlag) {
        commit(types.GET_INSURANCE_KNOWLEDGE_SUCCESS, res.data.resultContent)
      } else {
        const { resultMsg } = res.data
        commit(types.GET_INSURANCE_KNOWLEDGE_FAIL, resultMsg)
      }
    }).catch((error) => {
      commit(types.GET_INSURANCE_KNOWLEDGE_FAIL, error.errorMsg || '网络错误')
    }).finally(() => {
      commit(types.GET_INSURANCE_KNOWLEDGE_END)
    })
  },
}

const mutations = {
  [types.GET_INSURANCE_KNOWLEDGE_START](state) {
    state.loading = true
    state.error = null
  },
  [types.GET_INSURANCE_KNOWLEDGE_SUCCESS](state, data) {
    state.list = data
  },
  [types.GET_INSURANCE_KNOWLEDGE_FAIL](state, error) {
    state.error = error
    state.list = []
  },
  [types.GET_INSURANCE_KNOWLEDGE_END](state) {
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
