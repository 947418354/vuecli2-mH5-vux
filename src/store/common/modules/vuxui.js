import * as types from '../mutation-types'

const vuxState = {
  // 是否显示loading组件
  isLoading: false,
  // 是否显示Toast组件
  isVuxToast: 0,
  // 二维码组件
  qrCode: '',
  // Toast参数
  VuxToastCof: {
    type: 'text',
    isShowMask: true,
    text: '网络异常',
  },
  // 是否显示popup组件---电话号码和拍照上传
  isVuxPopupTel: false,
  qrCodeDiscribe: '',
}

// actions
const actions = {
  // 显示加载中组件
  showLoading({ commit }) {
    commit(types.VUX_LOADER_SHOW);
  },
  // 隐藏加载中组件
  hideLoading({ commit }) {
    commit(types.VUX_LOADER_HIDE);
  },
  showVuxToast({ commit }, config) {
    commit(types.VUX_TOAST_SHOW, config);
  },
  showTelPopup({ commit }) {
    commit(types.VUX_POPUP_TEL_SHOW);
  },
  hideTelPopup({ commit }) {
    commit(types.VUX_POPUP_TEL_HIDE);
  },
  showQrCode({ commit }, params) {
    commit(types.VUX_QRCODE_SHOW, params)
  },
  hideQrCode({ commit }) {
    commit(types.VUX_QRCODE_HIDE)
  },
}

// mutations
const mutations = {
  [types.VUX_LOADER_SHOW](state) {
    state.isLoading = true;
  },
  [types.VUX_LOADER_HIDE](state) {
    if (state.isLoading) {
      state.isLoading = false;
    }
  },
  [types.VUX_TOAST_SHOW](state, config) {
    Object.keys(state.VuxToastCof).forEach((item) => {
      if (config[item]) {
        state.VuxToastCof[item] = config[item]
      }
    })
    state.isVuxToast += 1;
  },
  [types.VUX_POPUP_TEL_SHOW](state) {
    state.isVuxPopupTel = true
  },
  [types.VUX_POPUP_TEL_HIDE](state) {
    state.isVuxPopupTel = false
  },
  [types.VUX_QRCODE_SHOW](state, params) {
    state.qrCode = params.url;
    state.qrCodeDiscribe = params.discribe;
  },
  [types.VUX_QRCODE_HIDE](state) {
    state.qrCode = ''
  },
}

export default {
  namespaced: true,
  state: vuxState,
  actions,
  mutations,
}
