import isEmpty from 'lodash/isEmpty'
import includes from 'lodash/includes'

import api from '@/api/account'

import * as types from '../mutation-types'

// initial state
const initialState = {
  // 获取用户信息
  loading: false,
  info: {},
  error: null,
  // 用户登录
  loginLoading: false,
  loginSuccess: false,
  loginError: null,
  loginErrorCode: null,
  // 用户登出
  logoutLoading: false,
  logoutSuccess: false,
  logoutError: null,
  // 用户是否允许登录
  isAllowedLogin: false,
  isAllowedMsg: '',
}

const getters = {
  isLogin(state) {
    return !isEmpty(state.info)
  },
  // 用户手机号
  getUserMobile(state) {
    return state.info.mobile
  },
  logoutError(state) {
    return state.logoutError
  },
  // 是否需要图形验证码
  isShowVFCode(state) {
    return includes(['1000203', '1000206'], state.loginErrorCode)
  },
}

// actions
const actions = {
  // 检查用户是否允许登录
  checkUserAllowedLogin({ commit }) {
    return api.checkUserAllowedLogin().then((res) => {
      commit(types.USER_CHECK_ALLOWED_LOGIN, res.data)
      return res.data.resultFlag
    }).catch(() => {
      commit(types.USER_CHECK_ALLOWED_LOGIN)
      return false
    })
  },
  // 获取用户信息
  getUserInfo({ commit }, params) {
    commit(types.GET_USER_INFO_START)
    return api.getUser({ ...params, t: Date.now() }).then((res) => {
      if (res.data.success) {
        commit(types.GET_USER_INFO_SUCCESS, res.data)
      } else {
        commit(types.GET_USER_INFO_FAIL, res.data.errorMsg)
      }
      return res.data && res.data.success
    }, (error) => {
      commit(types.GET_USER_INFO_FAIL, error)
      return false
    }).finally(() => {
      commit(types.GET_USER_INFO_END)
    })
  },

  // 帐号密码登录
  loginByAccount({ commit, dispatch }, params) {
    commit(types.USER_LOGIN_START)
    return api.userLoginByAccount(params).then((res) => {
      console.log('账号密码登录接口http层正常then res', res)
      if (res.data.success) {
        commit(types.USER_LOGIN_SUCCESS, res.data)
        // 登录成功立即调用getUserInfo
        dispatch('getUserInfo')
      } else {
        commit(types.USER_LOGIN_FAIL, res.data)
      }
      return res
    }, (error) => {
      commit(types.USER_LOGIN_FAIL, error)
    }).finally(() => {
      commit(types.USER_LOGIN_END)
    })
  },
  // 短信验证码登录
  loginByMobile({ commit, dispatch }, params) {
    commit(types.USER_LOGIN_START)
    return api.userLoginByMobile(params).then((res) => {
      if (res.data.success) {
        commit(types.USER_LOGIN_SUCCESS, res.data)
        // 登录成功立即调用getUserInfo
        dispatch('getUserInfo')
      } else {
        commit(types.USER_LOGIN_FAIL, res.data)
      }
      return res
    }, (error) => {
      commit(types.USER_LOGIN_FAIL, error)
    }).finally(() => {
      commit(types.USER_LOGIN_END)
    })
  },
  logoutByBrowser({ commit }, params) {
    commit(types.USER_LOGOUT_START)
    return api.userLogout(params).then((res) => {
      if (res.data.success) {
        commit(types.USER_LOGOUT_SUCCESS)
      } else {
        commit(types.USER_LOGOUT_FAIL, res.data.errorMsg)
      }
      return res.data.success
    }, (error) => {
      commit(types.USER_LOGOUT_FAIL, error)
      return false
    }).finally(() => {
      commit(types.USER_LOGOUT_END)
    })
  },
}

// mutations
const mutations = {
  // const resultMsg = typeof error === 'object' ? error.statusText : error
  // 获取用户信息
  [types.GET_USER_INFO_START](state) {
    state.loading = true
    state.error = null
  },
  [types.GET_USER_INFO_SUCCESS](state, data) {
    state.info = data.value
    state.logoutSuccess = false
  },
  [types.GET_USER_INFO_FAIL](state, error) {
    state.error = error
    state.info = {}
  },
  [types.GET_USER_INFO_END](state) {
    state.loading = false
  },
  // 用户登录
  [types.USER_LOGIN_START](state) {
    state.loginLoading = true
    state.info = {}
    state.loginError = null
    state.loginErrorCode = null
  },
  [types.USER_LOGIN_SUCCESS](state) {
    state.loginSuccess = true
    // 把用户登出状态变为false
    state.logoutSuccess = false
  },
  [types.USER_LOGIN_FAIL](state, error) {
    state.loginError = error.errorMsg
    state.loginSuccess = false
    state.loginErrorCode = error.errorCode
  },
  [types.USER_LOGIN_END](state) {
    state.loginLoading = false
  },
  // 用户登出
  [types.USER_LOGOUT_START](state) {
    state.logoutLoading = true
    state.logoutError = null
  },
  [types.USER_LOGOUT_SUCCESS](state) {
    state.logoutSuccess = true
    // 清空用户信息和登录成功状态
    state.loginSuccess = false
    // state.info = {}
    // 退出账号后，清空活动的会话
    sessionStorage.removeItem('mainActivity')
  },
  [types.USER_LOGOUT_FAIL](state, error) {
    state.logoutError = error
    state.logoutSuccess = false
  },
  [types.USER_LOGOUT_END](state) {
    state.logoutLoading = false
  },
  [types.USER_CHECK_ALLOWED_LOGIN](state, result) {
    const { resultFlag, resultMsg } = result || {}
    state.isAllowedLogin = resultFlag || false
    state.isAllowedMsg = resultMsg || ''
  },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
