/*
文档
*/
export default [
  {
    path: '/doc/article',
    name: 'docArticle',
    component: resolve => require(['@/modules/doc/Article'], resolve)
  },
  {
	    path: '/doc/article1',
	    name: 'docArticle1',
	    component: resolve => require(['@/modules/doc/Article1'], resolve)
  },
  {
    path: '/doc/aboutus',
    name: 'docAboutus',
    component: resolve => require(['@/modules/doc/Aboutus'], resolve)
  },
  {
    path: '/doc/concat',
    name: 'docConcat',
    component: resolve => require(['@/modules/doc/Concat'], resolve)
  },
  {
    path: '/doc/notice',
    name: 'docNotice',
    component: resolve => require(['@/modules/doc/Notice'], resolve)
  },
  {
    path: '/doc/finance',
    name: 'docFinance',
    component: resolve => require(['@/modules/doc/Finance'], resolve)
  },
  {
    path: '/doc/help',
    name: 'docHelp',
    component: resolve => require(['@/modules/doc/Help'], resolve)
  },
  {
    path: '/doc/partner',
    name: 'docPartner',
    component: resolve => require(['@/modules/doc/Partner'], resolve)
  },
  {
    path: '/doc/share',
    name: 'docShare',
    component: resolve => require(['@/modules/doc/Share'], resolve)
  },

  {
    path: '/doc/message',
    name: 'Message',
    component: resolve => require(['@/modules/doc/Message'], resolve)
  },
   {
    path: '/doc/common',
    name: 'common',
    component: resolve => require(['@/modules/doc/CommonUrl'], resolve)
  }
]
