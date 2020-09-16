import { map, filter } from 'lodash'
import api from '@/api/mainPage'
import * as types from '../mutation-types'


// initial state
const initialState = {
  loading: true,
  menu: null,
  list: null,
  activeTab: null,
  firstTab: null,
  secondTab: null,
  total: 0,
  listError: null,
  detail: null,
}

// getters
const getters = {
  firstColumnList(state) {
    return map(state.menu, item => ({
      id: item.id,
      state: item.state,
      text: item.text,
    }))
  },
  secondColumnList(state) {
    const arr = filter(state.menu, item => (item.id === state.firstTab))
    return arr.length > 0
      ? (arr[0].children.length > 0 && arr[0].children) || []
      : []
  },
}

// actions
const actions = {
  getCmsMenu({ commit }, params) {
    commit(types.CMSLIST_MENU_GET_START)
    return api.getCmsMenu(params).then((res) => {
      if (res.data.resultFlag && res.data.resultContent.length > 0) {
        commit(types.CMSLIST_MENU_GET_SUCCESS, res.data.resultContent)
      } else {
        commit(types.CMSLIST_MENU_GET_FAIL, res.data.resultMsg)
      }
    }, (error) => {
      commit(types.CMSLIST_MENU_GET_FAIL, error)
    }).finally(() => {
      commit(types.CMSLIST_MENU_GET_END)
    })
  },
  getCmsList({ commit }, params) {
    commit(types.CMSLIST_GET_START)
    return api.getCmsList(params).then((res) => {
      if (params.page === 1) {
        commit(types.CMSLIST_CLEAR)
      }
      let rows = []
      if (res.data.resultFlag) {
        rows = res.data.resultContent.rows
        commit(types.CMSLIST_GET_SUCCESS, res.data.resultContent)
      } else {
        commit(types.CMSLIST_GET_FAIL, res.data.resultMsg)
      }
      return rows.length
    }, (error) => {
      commit(types.CMSLIST_GET_FAIL, error)
    }).finally(() => {
      commit(types.CMSLIST_GET_END)
    })
  },
  // 设置当前激活的Tab
  setCurrentTab({ commit }, params) {
    commit(types.CMSLIST_SET_MENU_CURRENT_TAB, params)
  },
  // 获取资讯详情
  getCmsDetail({ commit }, params) {
    commit(types.CMSLIST_GET_START)
    return api.getCmsDetail(params).then((res) => {
      if (res.data.resultFlag) {
        commit(types.CMSLIST_DETAIL_GET_SUCCESS, res.data.resultContent)
      } else {
        commit(types.CMSLIST_GET_FAIL, res.data.resultMsg)
      }
    }, (error) => {
      commit(types.CMSLIST_GET_FAIL, error)
    }).finally(() => {
      commit(types.CMSLIST_GET_END)
    })
  },
}

// mutations
const mutations = {
  [types.CMSLIST_MENU_GET_START](state) {
    state.loading = true
    state.error = null
  },
  [types.CMSLIST_MENU_GET_SUCCESS](state, data) {
    state.menu = data
    // 初次加载完成  activetab 默认去数组第一个元素的id
    state.activeTab = data[0].id
    state.firstTab = data[0].id
  },
  [types.CMSLIST_MENU_GET_FAIL](state, error) {
    state.error = error
  },
  [types.CMSLIST_MENU_GET_END](state) {
    state.loading = false
  },

  [types.CMSLIST_GET_START](state) {
    state.loading = true
    state.error = null
  },
  [types.CMSLIST_GET_SUCCESS](state, data) {
    state.total = data.total
    state.list = [...state.list.concat(data.rows)]
  },
  [types.CMSLIST_GET_FAIL](state, error) {
    state.error = error
  },
  [types.CMSLIST_GET_END](state) {
    state.loading = false
  },
  [types.CMSLIST_CLEAR](state) {
    state.list = []
  },


  [types.CMSLIST_DETAIL_GET_SUCCESS](state, data) {
    state.detail = data
  },

  [types.CMSLIST_SET_MENU_CURRENT_TAB](state, params) {
    const { id, column } = params
    state.activeTab = id
    if (column === 1) {
      state.firstTab = id
      state.secondTab = null
    } else {
      state.secondTab = id
    }
    state.list = []
  },
  mutCms(state, { payload }) {
    state.cms = payload
  },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
