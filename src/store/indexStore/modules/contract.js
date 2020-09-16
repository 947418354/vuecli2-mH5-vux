import { isArray } from 'lodash'
import api from '@/api/center'
import * as types from '../mutation-types'

const initialState = {
  loading: false,
  contractList: [],
  curContract: {},
  error: null,
}

const getters = {}

const actions = {
  getContractList({ commit }, params) {
    commit(types.GET_CONTRACT_START)
    return api.getExtensionCode(params).then((res) => {
      if (res.data.resultFlag) {
        commit(types.GET_CONTRACT_SUCCESS, res.data.resultContent)
        return true
      }
      let result
      if (isArray(res.data.resultContent)) {
        result = true
        commit(types.GET_CONTRACT_SUCCESS, res.data.resultContent)
      } else {
        result = false
        const { resultMsg } = res.data
        commit(types.GET_CONTRACT_FAIL, resultMsg)
      }
      return result
    }).catch((error) => {
      commit(types.GET_CONTRACT_FAIL, error.errorMsg || '网络错误')
      return false
    }).finally(() => {
      commit(types.GET_CONTRACT_END)
    })
  },
}

const mutations = {
  [types.GET_CONTRACT_START](state) {
    state.loading = true
    state.error = null
  },
  [types.GET_CONTRACT_SUCCESS](state, data) {
    if (isArray(data)) {
      state.contractList = data
      state.curContract = {}
    } else {
      state.contractList = []
      state.curContract = data
    }
  },
  [types.GET_CONTRACT_FAIL](state, error) {
    state.error = error
    state.contractList = []
    state.curContract = {}
  },
  [types.GET_CONTRACT_END](state) {
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
