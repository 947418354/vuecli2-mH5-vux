import * as types from '../mutation-types'

// initial state
const customerState = {
  loading: true,
  list: [],
  error: null,
  isPolicyCustomer: false, // 保单客户
  isLossCustomer: false, // 流失客户
  isAddCustomer: false, // 待拓展客户
  isModifyCustomer: 0,
}

// getters
const getters = {}

// actions
const actions = {
  policyCustomer({ commit }) {
    commit(types.CUSTOMER_POLICY)
  },
  addCustomer({ commit }) {
    commit(types.CUSTOMER_ADD)
  },
  lossCustomer({ commit }) {
    commit(types.CUSTOMER_LOSS)
  },
  // 初始化
  resetPolicyCustomer({ commit }) {
    commit(types.CUSTOMER_RESET_POLICY)
  },
  resetAddCustomer({ commit }) {
    commit(types.CUSTOMER_RESET_ADD)
  },
  resetLossCustomer({ commit }) {
    commit(types.CUSTOMER_RESET_LOSS)
  },
  modifyCustomer({ commit }, index) {
    commit(types.CUSTOMER_CHANGE_INFO, index)
  },
  resetModify({ commit }, index) {
    commit(types.CUSTOMER_RESET_STATUS, index)
  },
}

// mutations
const mutations = {
  [types.CUSTOMER_POLICY](state) {
    state.isPolicyCustomer = true
  },
  [types.CUSTOMER_ADD](state) {
    state.isAddCustomer = true
  },
  [types.CUSTOMER_LOSS](state) {
    state.isLossCustomer = true
  },
  [types.CUSTOMER_RESET_POLICY](state) {
    state.isAddCustomer = false
    state.isLossCustomer = false
  },
  [types.CUSTOMER_RESET_ADD](state) {
    state.isPolicyCustomer = false
    state.isLossCustomer = false
  },
  [types.CUSTOMER_RESET_LOSS](state) {
    state.isAddCustomer = false
    state.isPolicyCustomer = false
  },
  [types.CUSTOMER_CHANGE_INFO](state, index) {
    state.isModifyCustomer = index
  },
  [types.CUSTOMER_RESET_STATUS](state, index) {
    state.isModifyCustomer = index
  },
}

export default {
  state: customerState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
