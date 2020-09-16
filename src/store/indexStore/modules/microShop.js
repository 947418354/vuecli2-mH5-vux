/* eslint-disable */
import api from '@/api/center'
import * as types from "../mutation-types";

const initialState = {
  tabsIndex: 'eCardView'
}

const actions = {
  queryMsProduct({ commit }, params) {
    return api.queryMsProduct(params).then((res) => {
      if (res.data.resultFlag) {
        commit(types.SAVE_QUESTIONS_SUCCESS, res.data.resultContent)
      } else {
        commit(types.SAVE_QUESTIONS_FAIL, res.data.resultMsg)
      }
    })
  },
}

const mutations = {
  mutTabsIndex(state, { payload }) {
    state.tabsIndex = payload
  }
}

export default {
  state: initialState,
  actions,
  mutations,
  namespaced: true,
}
