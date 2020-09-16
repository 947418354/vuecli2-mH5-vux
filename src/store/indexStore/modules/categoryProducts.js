import * as types from '../mutation-types'
// initial state
const categoryState = {
  categoryProductsId: 0,
}

// getters
const getters = {
}

// actions
const actions = {
  setCateID({ commit }, params) {
    commit(types.SET_CATEGORY_PRODUCTS_ID, params)
  },
}

// mutations
const mutations = {
  [types.SET_CATEGORY_PRODUCTS_ID](state, ID) {
    state.categoryProductsId = ID
  },
}

export default {
  state: categoryState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
