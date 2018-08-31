export default [
  {
    path: '/balance/downrecord',
    name: 'balanceDownRecord',
    component: resolve => require(['@/modules/balance/DownRecord'], resolve)
  },
  {
    path: '/balance/record',
    name: 'balanceRecord',
    component: resolve => require(['@/modules/balance/Record'], resolve)
  },
  {
    path: '/balance/paywx',
    name: 'balancePayWx',
    component: resolve => require(['@/modules/balance/PayWx'], resolve)
  },
  {
    path: '/balance/payzfb',
    name: 'balancePayZfb',
    component: resolve => require(['@/modules/balance/PayZfb'], resolve)
  },
  {
    path: '/balance/paybank',
    name: 'balancePayBank',
    component: resolve => require(['@/modules/balance/PayBank'], resolve)
  },
  {
    path: '/balance/recharge',
    name: 'balanceRecharge',
    component: resolve => require(['@/modules/balance/Recharge'], resolve)
  },
  {
    path: '/balance/home',
    name: 'balanceHome',
    component: resolve => require(['@/modules/balance/Home'], resolve),
    alias: '/balance'
  }
]
