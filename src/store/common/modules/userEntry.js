import { filter, includes, forEach, sortBy } from 'lodash'
import api from '@/api/center'
import * as types from '../mutation-types'

const initialState = {
  loading: false,
  list: [],
  error: null,
}

const getters = {
  // 首页导航
  indexTabList(state) {
    const filterArr = filter(state.list, (item) => {
      const arr = [
        'inviteFriend', 'autoInsure', 'renewal', 'group', 'customer',
        'housekeeper', 'microShop', 'posterlist', 'attendance', 'teamoffer',
      ]
      if (includes(arr, item.tabbarCode)) {
        return item
      }
      return false
    })
    return sortBy(filterArr, item => item.index)
  },
  // 我的导航
  userNavList(state) {
    const filterArr = filter(state.list, (item) => {
      const arr = [
        'carOrder', 'orderList', 'group', 'customer',
        'subscribe', 'honor', 'score', 'businessCard',
      ]
      if (includes(arr, item.tabbarCode)) {
        return item
      }
      return false
    })
    return sortBy(filterArr, item => item.index)
  },
  // 我的菜单列表
  userMenuList(state) {
    const filterArr = filter(state.list, (item) => {
      const arr = ['payslip', 'taxCalculator', 'suggestion', 'about', 'question']
      if (includes(arr, item.tabbarCode)) {
        return item
      }
      return false
    })
    return sortBy(filterArr, item => item.index)
  },
}

const actions = {
  getUserEntryList({ commit }, params) {
    commit(types.GET_USER_ENTRY_START)
    return api.getUserEntry(params).then((res) => {
      if (res.data.resultFlag) {
        commit(types.GET_USER_ENTRY_SUCCESS, res.data.resultContent)
      } else {
        const { resultMsg } = res.data
        commit(types.GET_USER_ENTRY_FAIL, resultMsg)
      }
      return res.data.resultFlag
    }).catch((error) => {
      commit(types.GET_USER_ENTRY_FAIL, error.errorMsg || '网络错误')
      return false
    }).finally(() => {
      commit(types.GET_USER_ENTRY_END)
    })
  },
}

const mutations = {
  [types.GET_USER_ENTRY_START](state) {
    state.loading = true
    state.error = null
  },
  [types.GET_USER_ENTRY_SUCCESS](state, data) {
    forEach(data, (item) => {
      // 'inviteFriend', 'autoInsure', 'renewal', 'group', 'customer',
      // 'housekeeper', 'honor', 'microShop', 'posterlist', 'attendance',

      // 'carOrder', 'orderList', 'group', 'customer',
      // 'subscribe', 'honor', 'score', 'businessCard',

      // 'payslip', 'taxCalculator', 'suggestion', 'about', 'question'

      if (item.tabbarCode === 'inviteFriend') item.index = 1
      if (item.tabbarCode === 'autoInsure') item.index = 2
      if (item.tabbarCode === 'renewal') item.index = 3
      if (item.tabbarCode === 'group') item.index = 4
      if (item.tabbarCode === 'customer') item.index = 5
      if (item.tabbarCode === 'housekeeper') item.index = 6
      if (item.tabbarCode === 'honor') item.index = 7
      if (item.tabbarCode === 'microShop') item.index = 8
      if (item.tabbarCode === 'posterlist') item.index = 9
      if (item.tabbarCode === 'attendance') item.index = 10

      if (item.tabbarCode === 'carOrder') item.index = 1
      if (item.tabbarCode === 'orderList') item.index = 2
      if (item.tabbarCode === 'subscribe') item.index = 6
      if (item.tabbarCode === 'score') item.index = 8
      if (item.tabbarCode === 'businessCard') item.index = 9

      if (item.tabbarCode === 'payslip') item.index = 11
      if (item.tabbarCode === 'taxCalculator') item.index = 12
      if (item.tabbarCode === 'suggestion') item.index = 13
      if (item.tabbarCode === 'question') item.index = 14
      if (item.tabbarCode === 'about') item.index = 16
    })
    state.list = data
  },
  [types.GET_USER_ENTRY_FAIL](state, error) {
    state.error = error
    state.list = []
  },
  [types.GET_USER_ENTRY_END](state) {
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
