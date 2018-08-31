/*
卡包
*/
export default [
  {
    path: '/card/add',
    name: 'cardAdd',
    component: resolve => require(['@/modules/card/Add'], resolve)
  },
  {
    path: '/card/home',
    name: 'cardHome',
    component: resolve => require(['@/modules/card/Home'], resolve),
    alias: '/card'
  },
  {
    path: '/card/help',
    name: 'cardHelp',
    component: resolve => require(['@/modules/card/Help'], resolve)
  },
  {
    path: '/card/detail',
    name: 'cardDetail',
    component: resolve => require(['@/modules/card/Detail'], resolve)
  },
  {
    path: '/card/import',
    name: 'cardImport',
    component: resolve => require(['@/modules/card/Import'], resolve)
  },
  {
    path: '/card/importmail',
    name: 'cardImportMail',
    component: resolve => require(['@/modules/card/ImportMail'], resolve)
  },
  {
    path: '/card/promote',
    name: 'cardPromote',
    component: resolve => require(['@/modules/card/Promote'], resolve)
  },
  {
    path: '/card/debitcard',
    name: 'debitCard',
    component: resolve => require(['@/modules/card/DebitCard'], resolve)
  },
  {
    path: '/card/savings',
    name: 'savings',
    component: resolve => require(['@/modules/card/Savings'], resolve)
  },
  {
    path: '/card/apply',
    name: 'apply',
    component: resolve => require(['@/modules/card/Apply'], resolve)
  },
  {
    path: '/card/loan',
    name: 'loan',
    component: resolve => require(['@/modules/card/Loan'], resolve)
  },
  {
    path: '/card/Center',
    name: 'center',
    component: resolve => require(['@/modules/card/Center'], resolve)
  },
  {
    path: '/card/Explain',
    name: 'explain',
    component: resolve => require(['@/modules/card/Explain'], resolve)
  },
  {
	    path: '/card/modify',
	    name: 'explain',
	    component: resolve => require(['@/modules/card/ModifySavingsCard'], resolve)
  },  
  {
    path: '/card/modifyCreditCard',
    name: 'explain',
    component: resolve => require(['@/modules/card/ModifyCreditCard'], resolve)
},
{
    path: '/card/reBindCard',
    name: 'explain',
    component: resolve => require(['@/modules/card/ReBindCard'], resolve)
}
]
