import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from 'vuex/dist/logger'
// createLogger()
import common from '@/store/common'

Vue.use(Vuex)

const plugins = process.env.NODE_ENV === 'production' ? [] : []
const rootState = {}

const createStore = (modules = {}, extraPlugins = []) => { // eslint-disable-line
  return new Vuex.Store({
    state: rootState,
    modules: {
      ...common,
      ...modules,
    },
    plugins: plugins.concat(extraPlugins),
    strict: true,
  })
}

export default createStore
