import api from '@/api/center'
import * as types from '../mutation-types'


// initial state
const initialState = {
  addressList: [],
}

// getters
const getters = {}

// actions
const actions = {
  getAddressList({ commit }, payload) {
    api.getGgcode().then((res) => {
      if (res.data.resultFlag) {
        commit(types.GET_ADDRESS_LIST, res.data.resultContent)
      }
    })
    commit(types.GET_ADDRESS_LIST, payload)
  },
}

// mutations
const mutations = {
  [types.GET_ADDRESS_LIST](state, payload) {
    state.addressList = payload
  },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
