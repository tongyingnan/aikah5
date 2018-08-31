// 计划
export default [
  {
    path: '/plan/create',
    name: 'planCreate',
    component: resolve => require(['@/modules/plan/Create'], resolve)
  },
  {
    path: '/plan/delete',
    name: 'planDelete',
    component: resolve => require(['@/modules/plan/Delete'], resolve)
  },
  {
    path:'/plan/perfect',
    name:'planPerfect',
    component: resolve => require(['@/modules/plan/Perfect'], resolve)
  }
]
