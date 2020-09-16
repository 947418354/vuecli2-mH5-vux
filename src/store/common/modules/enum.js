import request from '@/api/account'
import * as types from '../mutation-types'

const initState = {
  loading: false,
  error: null,
  result: {},
};

const getters = {
}

const actions = {
  getEnum({ commit }, params) {
    commit(types.GET_ENUM_START)
    return request.enumType(params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res) => {
      if (res.data.resultFlag) {
        commit(types.GET_ENUM_SUCCESS, res.data.resultContent)
      } else {
        commit(types.GET_ENUM_FAIL, '数据返回错误')
      }
    }).catch((err) => {
      commit(types.GET_ENUM_FAIL, err)
    }).finally(() => {
      commit(types.GET_ENUM_END)
    })
  },
};

const mutations = {
  /** 获取统计数据开始 */
  [types.GET_ENUM_START](state) {
    state.loading = true
    state.error = null;
  },
  [types.GET_ENUM_SUCCESS](state, data) {
    state.result = { ...state.result, ...data }
  },
  [types.GET_ENUM_FAIL](state, error) {
    state.error = error;
  },
  [types.GET_ENUM_END](state) {
    state.loading = false
  },
  /** 获取统计数据结束 */

};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
}
