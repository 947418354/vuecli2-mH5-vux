import api from '@/api/mainPage'
import * as types from '../mutation-types'

// initial state
const hotState = {
  loading: true,
  list: [],
  error: null,
  loadloading: false,
  loaderror: false,
  pageNum: 2,
  maxListData: 0,
}

// getters
const getters = {
  listLength(state) {
    return state.list.length
  },
}

// actions
const actions = {
  getHotProducts({ commit }, params) {
    commit(types.HOT_PRODUCTS_GET_START)
    return api.getHotProductList(params).then((res) => {
      if (res.data.resultFlag) {
        commit(types.HOT_PRODUCTS_GET_SUCCESS, res.data)
      } else {
        commit(types.HOT_PRODUCTS_GET_FAIL, res.data.resultMsg)
      }
    }, (error) => {
      commit(types.HOT_PRODUCTS_GET_FAIL, error)
    }).finally(() => {
      commit(types.HOT_PRODUCTS_GET_END)
    })
  },
}

// mutations
const mutations = {
  [types.HOT_PRODUCTS_GET_START](state) {
    state.loading = true
    state.error = null
  },
  [types.HOT_PRODUCTS_GET_SUCCESS](state, data) {
    // const { products: { rows, total } } = data.resultContent.rows
    const rows = data.resultContent.rows
    const total = data.resultContent.total
    state.list = rows || []
    state.maxListData = total || 0
  },
  [types.HOT_PRODUCTS_GET_FAIL](state, error) {
    state.error = error
    state.list = []
  },
  [types.HOT_PRODUCTS_GET_END](state) {
    state.loading = false
  },
  // 加载更多的 mutations
  [types.HOT_PRODUCTS_LOADING_START](state) {
    state.loadloading = true
    state.loaderror = false
  },
  [types.HOT_PRODUCTS_LOADING_SUCCESS](state, data) {
    // const { products: { rows } } = data.resultContent
    const rows = data.resultContent.rows
    state.list = state.list.concat(rows || [])
    state.pageNum += 1
  },
  [types.HOT_PRODUCTS_LOADING_FAIL](state) {
    state.loaderror = true
    state.pageNum = state.pageNum -= 1
  },
  [types.HOT_PRODUCTS_LOADING_END](state) {
    state.loadloading = false
  },
}

export default {
  state: hotState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
