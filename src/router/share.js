// 分享
export default [
  {
    path: '/share',
    name: 'shareHome',
    component: resolve => require(['@/modules/share/Home'], resolve)
  },
  {
    path: '/share/team',
    name: 'shareTeam',
    component: resolve => require(['@/modules/share/Team'], resolve)
  },
  {
    path: '/share/friends',
    name: 'shareFriends',
    component: resolve => require(['@/modules/share/Friends'], resolve)
  },
  {
    path: '/share/ranks',
    name: 'shareRanks',
    component: resolve => require(['@/modules/share/Ranks'], resolve)
  },
  {
    path: '/share/qrcode',
    name: 'shareQrcode',
    component: resolve => require(['@/modules/share/Qrcode'], resolve)
  },
  {
    path: '/share/vip',
    name: 'shareVip',
    component: resolve => require(['@/modules/share/Vip'], resolve)
  },
  {
    path: '/share/viphelp',
    name: 'Viphelp',
    component: resolve => require(['@/modules/share/VipHelp'], resolve)
  },
  {
    path: '/share/vipsuccess',
    name: 'Vipsuccess',
    component: resolve => require(['@/modules/share/VipSuccess'], resolve)
  },
  {
    path: '/share/state',
    name: 'State',
    component: resolve => require(['@/modules/share/State'], resolve)
  }
]
