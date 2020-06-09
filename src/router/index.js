import Vue from 'vue'
import Router from 'vue-router'
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
      path: '/editECard',
      name: 'editECard',
      components: {
        default: () => import(/* webpackChunkName: "editECard" */'@/pages/eCard/editECard')
      },
    },
    // 电子名片浏览记录页
    {
      path: '/browser',
      name: 'browser',
      components: {
        default: () => import(/* webpackChunkName: "browser" */'@/pages/eCard/browser')
      },
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
