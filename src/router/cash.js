// 收款（套现）
export default [
  {
    path: '/cash/home',
    name: 'cashHome',
    component: resolve => require(['@/modules/cash/Home'], resolve)
  },
  {
    path: '/cash/draw',
    name: 'cashDraw',
    component: resolve => require(['@/modules/cash/Draw'], resolve)
  },
  {
    path: '/cash/wechat',
    name: 'cashWechat',
    component: resolve => require(['@/modules/cash/Wechat'], resolve)
  },
  {
    path: '/cash/alipay',
    name: 'cashAlipay',
    component: resolve => require(['@/modules/cash/Alipay'], resolve)
  },
  {
    path: '/cash/unionpay',
    name: 'cashUnionPay',
    component: resolve => require(['@/modules/cash/UnionPay'], resolve)
  },
  {
    path: '/cash/unionpay2',
    name: 'cashUnionPay2',
    component: resolve => require(['@/modules/cash/UnionPay2'], resolve)
  },
  {
	    path: '/cash/CashHtml',
	    name: 'cashHtml',
	    component: resolve => require(['@/modules/cash/CashHtml'], resolve)
  },
  {
    path: '/cash/specialbusiness',
    name: 'cashSpecialBusiness',
    component: resolve => require(['@/modules/cash/SpecialBusiness'], resolve)
  },
  {
    path: '/cash/success',
    name: 'cashSuccess',
    component: resolve => require(['@/modules/cash/Success'], resolve)
  }
]
