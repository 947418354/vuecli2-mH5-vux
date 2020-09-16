import * as types from '../mutation-types'

// initial state
const initialState = {
  stars: {},
}

// getters
const getters = {}

// actions
const actions = {
  toggleStar({ commit }, params) {
    commit(types.INDEX_SUBSCRIBE_SET_DATA, params)
  },
  starReset({ commit }) {
    commit(types.INDEX_SUBSCRIBE_RESET)
  },
}

// mutations
const mutations = {
  [types.INDEX_SUBSCRIBE_SET_DATA](state, params) {
    const { stars } = state
    const { favoriteStaus, productId } = params
    state.stars = {
      ...stars,
      [productId]: favoriteStaus === '1',
    }
  },
  [types.INDEX_SUBSCRIBE_RESET](state) {
    state.stars = {}
  },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
