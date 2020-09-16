
// import request from '@/api/account'
import { map } from 'lodash'
import * as types from '../mutation-types'

const initialState = {
  loading: false,
  companyList: [],
  currentMobile: '',
  currentCode: '',
  currentName: '',
  callback: null,
  error: null,
}

const getters = {}

const actions = {
  setCompanyConf({ commit }, conf) {
    commit(types.COMPANY_SET_CONFIG, conf)
  },
  clearCompanyConf({ commit }, conf) {
    commit(types.COMPANY_CLEAR_CONFIG, conf)
  },
}

const mutations = {
  [types.COMPANY_SET_CONFIG](state, conf) {
    const { data, mobile, callback } = conf
    state.companyList = map(data, item => ({
      agentCode: item.agentCode,
      value: item.companyType,
      mobile: item.mobile,
      name: item.companyType === '1' ? '太平经纪' : '太平财险',
    }))
    state.currentMobile = mobile
    state.callback = callback
  },
  [types.COMPANY_CLEAR_CONFIG](state) {
    state.companyList = []
    state.currentMobile = ''
    state.callback = null
  },
}

export default {
  state: initialState,
  actions,
  getters,
  mutations,
  namespaced: true,
}
