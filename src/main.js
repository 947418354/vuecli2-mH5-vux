// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueLazyload from 'vue-lazyload'
import vconsole from 'vconsole'
console.dir(Vue)
Vue.config.productionTip = false

Vue.use(vueLazyload)
new vconsole()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
