import { map, filter, includes } from 'lodash'
import api from '@/api/center'
import * as types from '../mutation-types'

const initialState = {
  loading: false,
  list: [],
  error: null,
}

const getters = {
  // 首页导航
  groupTabList(state) {
    const filterArr = filter(state.list, (item) => {
      const arr = ['organization', 'team', 'ranking', 'examination']
      if (includes(arr, item.tabbarCode)) {
        return item
      }
      return false
    })
    return map(filterArr, (item) => {
      // 组织  organization
      // 小组  team
      // 排行  ranking
      // 考核  examination
      if (item.tabbarCode === 'organization') {
        item.value = '1'
      }
      if (item.tabbarCode === 'team') {
        item.value = '2'
      }
      if (item.tabbarCode === 'ranking') {
        item.value = '3'
      }
      if (item.tabbarCode === 'examination') {
        item.value = '4'
      }
      item.name = item.tabbarName
      return item
    })
  },
  initTabName(state) {
    const firstItem = state.list[0]
    return firstItem && firstItem.tabbarCode
  },
}

const actions = {
  getGroupTabList({ commit }, params) {
    commit(types.GET_GROUP_TAB_START)
    return api.getUserEntry(params).then((res) => {
      if (res.data.resultFlag) {
        commit(types.GET_GROUP_TAB_SUCCESS, res.data.resultContent)
      } else {
        const { resultMsg } = res.data
        commit(types.GET_GROUP_TAB_FAIL, resultMsg)
      }
      return res.data.resultFlag
    }).catch((error) => {
      commit(types.GET_GROUP_TAB_FAIL, error.errorMsg || '网络错误')
      return false
    }).finally(() => {
      commit(types.GET_GROUP_TAB_END)
    })
  },
}

const mutations = {
  [types.GET_GROUP_TAB_START](state) {
    state.loading = true
    state.error = null
  },
  [types.GET_GROUP_TAB_SUCCESS](state, data) {
    state.list = data
  },
  [types.GET_GROUP_TAB_FAIL](state, error) {
    state.error = error
    state.list = []
  },
  [types.GET_GROUP_TAB_END](state) {
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
