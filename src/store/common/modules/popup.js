// import Vue from 'vue'
import * as types from '../mutation-types'

const initState = {
  isVisible: false,
  isShowProtocolDialog: false,
  isShowContractDialog: false,
  isShowCompanyDialog: false,
}
const actions = {
  toggleSharePrompt({ commit }, isVisible) {
    commit(types.SHARE_PROMPT_TOGGLE, isVisible)
  },
  toggleProtocol({ commit }, isVisible) {
    commit(types.DIALOG_PROTOCOL_TOGGLE, isVisible)
  },
  toggleContrant({ commit }, isVisible) {
    commit(types.DIALOG_CONTRACT_TOGGLE, isVisible)
  },
  toggleCompany({ commit }, isVisible) {
    commit(types.DIALOG_COMPANY_TOGGLE, isVisible)
  },
  hideAllDialog({ commit }) {
    commit(types.DIALOG_HIDE_ALL)
  },
}

const mutations = {
  [types.SHARE_PROMPT_TOGGLE](state, isVisible) {
    state.isVisible = isVisible
  },
  [types.DIALOG_PROTOCOL_TOGGLE](state, isVisible) {
    state.isShowProtocolDialog = isVisible
  },
  [types.DIALOG_CONTRACT_TOGGLE](state, isVisible) {
    state.isShowContractDialog = isVisible
  },
  [types.DIALOG_COMPANY_TOGGLE](state, isVisible) {
    state.isShowCompanyDialog = isVisible
  },
  [types.DIALOG_HIDE_ALL](state) {
    state.isVisible = false
    state.isShowProtocolDialog = false
    state.isShowContractDialog = false
    state.isShowCompanyDialog = false
  },
}

export default {
  namespaced: true,
  state: initState,
  actions,
  mutations,
}
