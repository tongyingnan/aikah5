/*
用户
*/

export default [
  {
    path: '/user/login',
    name: 'userLogin',
    component: resolve => require(['@/modules/user/Login'], resolve)
  },
  {
    path: '/user/regist',
    name: 'userRegist',
    component: resolve => require(['@/modules/user/Regist'], resolve)
  },
  {
    path: '/user/modifypwd',
    name: 'userModifyPwd',
    component: resolve => require(['@/modules/user/ModifyPwd'], resolve)
  },
  {
    path: '/user/modifypaypwd',
    name: 'ModifyPayPwd',
    component: resolve => require(['@/modules/user/ModifyPayPwd'], resolve)
  },
  {
    path: '/user/modifyhandpwd',
    name: 'ModifyHandPwd',
    component: resolve => require(['@/modules/user/ModifyHandPwd'], resolve)
  },
  {
    path: '/user/baseinfo',
    name: 'userBaseInfo',
    component: resolve => require(['@/modules/user/BaseInfo'], resolve)
  },
  {
    path: '/user/auth',
    name: 'userAuth',
    component: resolve => require(['@/modules/user/Auth'], resolve)
  },
  {
    path: '/user/forgetpwd',
    name: 'userForgetPwd',
    component: resolve => require(['@/modules/user/ForgetPwd'], resolve)
  },
  {
    path: '/user/setting',
    name: 'userSetting',
    component: resolve => require(['@/modules/user/Setting'], resolve)
  },
  {
    path: '/user/advice',
    name: 'userAdvice',
    component: resolve => require(['@/modules/user/Advice'], resolve)
  },
  {
    path: '/user',
    name: 'userHome',
    component: resolve => require(['@/modules/user/Home'], resolve)
  },
  {
    path: '/user/manual',
    name: 'Manual',
    component: resolve => require(['@/modules/user/Manual'], resolve)
  }

]
