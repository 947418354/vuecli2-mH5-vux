import api from '@/api/center'
import * as types from '../mutation-types'


// initial state
const initialState = {
  listInfo: [],
  messageUnreadCount: 0,
}

// getters
const getters = {}

// actions
const actions = {
  // 获取消息数量
  getMessageUnread({ commit }) {
    api.getMessageUnread({
      system: 'borwser',
    }).then((res) => {
      if (res.data.success) {
        let count = res.data.value || 0
        if (count > 99) {
          count = 99
        }
        commit(types.MESSAGE_SET_COUNT, count)
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  getMessageList({ commit }, payload) {
    api.getMessageList().then((res) => {
      if (res.data.status) {
        commit(types.MESSAGE_GET_LIST, res.data.result && res.data.result.rows)
      }
    })
    commit(types.MESSAGE_GET_LIST, payload)
  },
}

// mutations
const mutations = {
  [types.MESSAGE_GET_LIST](state, payload) {
    state.listInfo = payload
  },
  [types.MESSAGE_SET_COUNT](state, count) {
    state.messageUnreadCount = count
  },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
