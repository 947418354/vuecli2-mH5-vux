import { filter, includes } from 'lodash'
import api from '@/api/account'
import * as types from '../mutation-types'

const initialState = {
  loading: false,
  channeltiplist: [],
  subagrtlist: [],
  teamSubagrtlist: [],
  currentCode: '',
  currentName: '',
  isSaveProtocolCode: true, // 点击确定按钮的时候是否保存选择的协议
  confirmCallback: null,
  error: null,
}

const getters = {}

const actions = {
  saveProtocolType({ commit }, conf) {
    commit(types.PROTPCOL_SAVE_TYPE, conf)
  },
  getProtocolList({ commit }, params) {
    commit(types.GET_PROTPCOL_START)
    return api.getUserSalesMan(params).then((res) => {
      const { filterChannel } = params
      if (res.data.resultFlag) {
        commit(types.GET_PROTPCOL_SUCCESS, {
          filterChannel,
          data: res.data.resultContent,
        })
      } else {
        const { resultMsg } = res.data
        commit(types.GET_PROTPCOL_FAIL, resultMsg)
      }
      return res.data.resultFlag
    }).catch((error) => {
      commit(types.GET_PROTPCOL_FAIL, error.errorMsg || '网络错误')
      return false
    }).finally(() => {
      commit(types.GET_PROTPCOL_END)
    })
  },
  userSaveSalesMan({ commit }, item) {
    const params = {
      solutionType: item.solutionType,
      solutioncode: item.solutioncode,
      channeltipcode: item.solutioncode
        ? undefined
        : item.channeltipcode,
    }
    return api.userSaveSalesMan(params).then((res) => {
      if (!res.data.resultFlag) {
        const { resultMsg } = res.data
        return {
          status: false,
          message: resultMsg,
        }
      }
      commit(types.PROTPCOL_SAVE_DATA, item)
      return { status: true }
    }).catch(err => ({
      status: false,
      message: err.statusText || '网络异常',
    }))
  },
}

const mutations = {
  [types.PROTPCOL_SAVE_TYPE](state, conf) {
    const { type, callback } = conf
    state.isSaveProtocolCode = type
    state.confirmCallback = callback
  },
  [types.GET_PROTPCOL_START](state) {
    state.loading = true
    state.error = null
  },
  [types.GET_PROTPCOL_SUCCESS](state, result) {
    const { filterChannel, data } = result
    // 如果需要过滤
    if (filterChannel) {
      const channeltiplist = data.personal.channeltiplist || []
      const arr = ['02010201', '02010401', '02010404', '02010502', '02010602', '02010701']
      const filterArr = filter(channeltiplist, item => !includes(arr, item.channeltipcode))
      // console.log(filterArr)
      state.channeltiplist = filterArr
    } else {
      state.channeltiplist = data.personal.channeltiplist || []
    }
    state.subagrtlist = data.personal.subagrtlist || []
    if (data.team && data.team.subagrtlist) {
      state.teamSubagrtlist = data.team.subagrtlist
    } else {
      state.teamSubagrtlist = []
    }
  },
  [types.GET_PROTPCOL_FAIL](state, error) {
    state.error = error
    state.channeltiplist = []
    state.subagrtlist = []
    state.teamSubagrtlist = []
  },
  [types.GET_PROTPCOL_END](state) {
    state.loading = false
  },
  [types.PROTPCOL_SAVE_DATA](state, data) {
    if (data.solutioncode) {
      state.currentCode = data.solutioncode
      state.currentName = data.intermediarycnname || data.cooperatesitecname
    } else if (data.channeltipcode) {
      state.currentCode = data.channeltipcode
      state.currentName = data.channeltipname
    }
  },
}

export default {
  state: initialState,
  actions,
  getters,
  mutations,
  namespaced: true,
}
