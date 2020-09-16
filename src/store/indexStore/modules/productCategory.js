import { map } from 'lodash'
import api from '@/api/mainPage'
import * as types from '../mutation-types'

// initial state
const intialState = {
  loading: true,
  error: null,
  list: [],
  activeTab: '',
}

// getters
const getters = {
  tabList(state) {
    return [{
      displayValue: '全部',
      value: '',
    }].concat(map(state.list, ({ code, codeValue }) => ({
      displayValue: codeValue,
      value: code,
    })))
  },
}

// actions
const actions = {
  // 获取全部产品列表
  getProductCategory({ commit }, params) {
    commit(types.GET_PRODUCT_CATEGORY_START)
    return api.getProductTabs(params).then((res) => {
      if (res.data.resultFlag) {
        commit(types.GET_PRODUCT_CATEGORY_SUCCESS, res.data)
      } else {
        commit(types.GET_PRODUCT_CATEGORY_FAIL, res.data.resultMsg)
      }
    }, (error) => {
      commit(types.GET_PRODUCT_CATEGORY_FAIL, error)
    }).finally(() => {
      commit(types.GET_PRODUCT_CATEGORY_END)
    })
  },
  // 设置激活的tab
  setActiveTab({ commit }, params) {
    commit(types.SET_ACTIIVE_CATEGORY, params)
  },
}

// mutations
const mutations = {
  // 获取列表
  [types.GET_PRODUCT_CATEGORY_START](state) {
    state.loading = true
    state.error = null
  },
  [types.GET_PRODUCT_CATEGORY_SUCCESS](state, data) {
    const { resultContent } = data
    state.list = resultContent || []
  },
  [types.GET_PRODUCT_CATEGORY_FAIL](state, error) {
    state.error = error
    state.list = []
  },
  [types.GET_PRODUCT_CATEGORY_END](state) {
    state.loading = false
  },
  // 设置activeTab
  [types.SET_ACTIIVE_CATEGORY](state, activeTab) {
    state.activeTab = activeTab
  },
}

export default {
  state: intialState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
