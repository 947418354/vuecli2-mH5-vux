const initState = {
  cancelTokenList: [],
};

const getters = {
}

const actions = {
};

const mutations = {
  /** 获取统计数据开始 */
  pushToken(state, payload) {
    state.cancelTokenList.push(payload.cancelToken)
  },
  clearToken(state) {
    state.cancelTokenList.forEach((item) => {
      item('路由跳转取消请求')
    })
    state.cancelTokenList = []
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
}
