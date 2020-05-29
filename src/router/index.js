import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import postcss from '@/pages/postcss.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'postcss',
      component: postcss
    },
    {
      path: '/microShop',
      name: 'microShop',
      components: {
        default: () => import(/* webpackChunkName: "microShop" */'../pages/microShop/microShop.vue')
      }
    }
  ]
})
