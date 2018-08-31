import Vue from 'vue'
import Router from 'vue-router'
import user from './user'
import card from './card'
import coupon from './coupon'
import doc from './doc'
import balance from './balance'
import share from './share'
import plan from './plan'
import insurance from './insurance'
import market from './market'

import cash from './cash'
import loanpay from './loanpay'
Vue.use(Router)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: resolve => require(['@/modules/Home'], resolve)
  },
  {
    path: '/',
    redirect: '/user/login'
  }
].concat(user, card, coupon, doc, balance, share, plan, insurance, cash, market,loanpay)
routes.push({
  path: '*',
  redirect: '/card'
});


export default new Router({
  routes,
  linkActiveClass: 'activated'
})
