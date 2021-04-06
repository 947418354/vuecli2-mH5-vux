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
      path: '/eCard',
      name: 'eCard',
      components: {
        default: () => import(/* webpackChunkName: "eCard" */'@/pages/eCard/eCard')
      },
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
    // 电子名片浏览记录详情页
    {
      path: '/browserDetail',
      name: 'browserDetail',
      components: {
        default: () => import(/* webpackChunkName: "browserDetail" */'@/pages/eCard/browserDetail')
      },
    },
    // 电子名片评论列表页
    {
      path: '/comment',
      name: 'comment',
      components: {
        default: () => import(/* webpackChunkName: "comment" */'@/pages/eCard/comment')
      },
    },
    {
      path: '/form',
      name: 'form',
      components: {
        default: () => import(/* webpackChunkName: "form" */'@/pages/form/form')
      },
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      components: {
        default: () => import(/* webpackChunkName: "qrcode" */'@/pages/eCard/qrcode')
      },
    },
    {
      path: '/microShop',
      name: 'microShop',
      components: {
        default: () => import(/* webpackChunkName: "microShop" */'../pages/microShop/microShop.vue')
      }
    },
    {
      path: '/cardList',
      name: 'cardList',
      components: {
        default: () => import(/* webpackChunkName: "cardList" */'../pages/cardList/cardList.vue')
      }
    },
    {
      path: '/layout',
      name: 'layout',
      components: {
        default: () => import(/* webpackChunkName: "layout" */'../pages/layout/layout.vue')
      }
    },
    {
      path: '/autograph',
      name: 'autograph',
      components: {
        default: () => import(/* webpackChunkName: "autograph" */'../pages/autograph/autograph.vue')
      }
    },
  ]
})
