// 帮你还

export default [
  {
    path: '/loanpay/applyfor',
    name: 'ApplyFor',
    component: resolve => require(['@/modules/loanpay/ApplyFor'], resolve)
  },
  {
    path: '/loanpay/binding',
    name: 'Binding',
    component: resolve => require(['@/modules/loanpay/Binding'], resolve)
  },
  {
    path:'/loanpay/loandetail',
    name:'loanDetail',
    component: resolve => require(['@/modules/loanpay/LoanDetail'], resolve)
  },
  {
    path:'/loanpay/eventdetail',
    name:'EventDetail',
    component: resolve => require(['@/modules/loanpay/EventDetail'], resolve)
  },
  {
    path:'/loanpay/login',
    name:'loanLogin',
    component: resolve => require(['@/modules/loanpay/Login'], resolve)
  },
  {
    path:'/loanpay/lost',
    name:'loanLost',
    component: resolve => require(['@/modules/loanpay/Lost'], resolve)
  },
  {
    path:'/loanpay/plan',
    name:'loanPlan',
    component: resolve => require(['@/modules/loanpay/Plan'], resolve)
  },
  {
    path:'/loanpay/repay',
    name:'loanRepay',
    component: resolve => require(['@/modules/loanpay/Repay'], resolve)
  },
  {
    path:'/loanpay/submit',
    name:'Submit',
    component: resolve => require(['@/modules/loanpay/Submit'], resolve)
  },
  {
    path:'/loanpay/success',
    name:'loanSuccess',
    component: resolve => require(['@/modules/loanpay/Success'], resolve)
  },
  {
    path:'/loanpay/fee',
    name:'loanFee',
    component: resolve => require(['@/modules/loanpay/Fee'], resolve)
  },
  {
    path:'/loanpay/signin',
    name:'SignIn',
    component: resolve => require(['@/modules/loanpay/SignIn'], resolve)
  },
  {
    path:'/loanpay/loanhelp',
    name:'LoanHelp',
    component: resolve => require(['@/modules/loanpay/LoanHelp'], resolve)
  },
  {
    path:'/loanpay/loanget',
    name:'LoanGet',
    component: resolve => require(['@/modules/loanpay/LoanGet'], resolve)
  }
]
