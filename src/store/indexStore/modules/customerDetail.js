import api from '@/api/center'
import * as types from '../mutation-types'

// initial state
const initialState = {
  loading: true,
  info: {},
  list: [],
  error: null,
  resultMsg: '',
}

// getters
const getters = {
}

// actions
const actions = {
  getCustomerInfo({ commit }, params) {
    commit(types.CUSTOMER_DETAIL_LOADING_START)
    return api.getCustomerOrderList(params)
      .then((res) => {
        if (res.data.resultFlag) {
          commit(types.CUSTOMER_DETAIL_GET_INFO_SUCCESS, res.data.resultContent)
        } else {
          commit(types.CUSTOMER_DETAIL_GET_INFO_FAIL, res.data.errorMsg)
        }
        return res.data.resultFlag
      })
      .catch((error) => {
        commit(types.CUSTOMER_DETAIL_GET_INFO_FAIL, error)
        return false
      })
      .finally(() => {
        commit(types.CUSTOMER_DETAIL_LOADING_END)
      })
  },
  setCustomerInfo({ commit }, params) {
    commit(types.CUSTOMER_DETAIL_SET_INFO, params)
  },
  clearCustomerInfo({ commit }) {
    commit(types.CUSTOMER_DETAIL_CLEAR_INFO)
  },
}

// mutations
const mutations = {
  [types.CUSTOMER_DETAIL_LOADING_START](state) {
    state.info = {}
    state.list = []
    state.loading = true
  },
  [types.CUSTOMER_DETAIL_LOADING_END](state) {
    state.loading = false
  },
  [types.CUSTOMER_DETAIL_GET_INFO_SUCCESS](state, oData) {
    const { id, cstmrName, certiNo, email, mobile, birthday, gender, orderVOs } = oData
    state.info = { id, cstmrName, certiNo, email, mobile, birthday, gender }
    state.list = orderVOs
    state.error = false
  },
  [types.CUSTOMER_DETAIL_GET_INFO_FAIL](state, errorMsg) {
    // console.log(typeof errorMsg)
    const resultMsg = typeof errorMsg === 'object' ? errorMsg.statusText : errorMsg
    state.error = true
    state.resultMsg = resultMsg
  },
  [types.CUSTOMER_DETAIL_SET_INFO](state, params) {
    state.list = []
    state.info = params
  },
  [types.CUSTOMER_DETAIL_CLEAR_INFO](state) {
    state.list = []
    state.info = {}
  },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
