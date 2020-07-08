import axios from 'axios'
import Vue from 'vue'
import { debounce } from 'lodash'


const axiosInstance = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? '/legacy' : '/api',
  baseURL: process.env.NODE_ENV === 'development' ? 'https://ydzy.etaiping.com/api/' : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

//  记录请求个数
let requestCount = 0;

// 1s内所有请求都返回的话，就不显示loading
const debouncedShowLoading = debounce(() => {
  if (requestCount > 0) {
    Vue.$vux.loading.show({
      text: '数据加载中',
    })
  }
}, 1000)

axiosInstance.interceptors.request.use((config) => {
  const { isNeedLoader } = config
  requestCount += 1
  // eslint-disable-next-line no-constant-condition
  if (isNeedLoader) {
    debouncedShowLoading()
  }
  // 中断未完成的请求
  // config.cancelToken = new axios.CancelToken((() => {
  //   console.log(Vue.$vux, Vue.$store, Vue.$router)
  //   // store.commit('cancelToken/pushToken', { cancelToken: cancel })
  // }))
  return config
}, (error) => {
  Vue.$vux.loading.hide()
  return Promise.reject(error);
})
axiosInstance.interceptors.response.use((response) => {
  requestCount -= 1
  Vue.$vux.loading.hide()
  return response
}, (error) => {
  // error是一个对象
  Vue.$vux.loading.hide()
  Vue.$vux.alert.show({
    title: '请求错误',
    content: error.message,
  })
  return Promise.reject(error);
})
export default axiosInstance
