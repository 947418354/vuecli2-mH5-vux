import { map } from 'lodash'
import * as types from '../mutation-types'

// initial state
const initState = {
  addLabelList: [],
}

// getters
const getters = {
  addList(state) {
    return map(state.addLabelList, item => ({
      value: item.value,
      delete: 'Y',
    }))
  },
}

// actions
const actions = {
  // 添加list
  updateAddLabelList({ commit }, conf) {
    commit(types.ADD_LABEL_ADD_LIST, conf)
  },
  // 减少list
  removeAddLabelListIndex({ commit }, idx) {
    commit(types.ADD_LABEL_REMOVE_INDEX, idx)
  },
  // 清空list
  clearAddLabelList({ commit }, idx) {
    commit(types.ADD_LABEL_CLEAR, idx)
  },
}

// mutations
const mutations = {
  // 添加
  [types.ADD_LABEL_ADD_LIST](state, conf) {
    state.addLabelList = conf
  },
  // 删除
  [types.ADD_LABEL_REMOVE_INDEX](state, index) {
    state.addLabelList.splice(index, 1)
  },
  // 清空
  [types.ADD_LABEL_CLEAR](state) {
    state.addLabelList = []
  },
}

export default {
  state: initState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
