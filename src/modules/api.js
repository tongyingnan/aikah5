export default {
  sms: {
    code: '/sms/code',
  },
  channel: {
    helibao: {
      sendValidCode: '/channel/helibao/sendValidCode',
      cancelOrder: '/channel/helibao/cancelOrder'
    },
    weixin: {
      unifiedorder: '/channel/weixin/unifiedorder'
    },
    alipay: {
      unifiedorder: '/channel/alipay/unifiedorder'
    }
  },
  user: {
    login: '/user/login',
    checkPhone: '/user/checkPhone',
    regist: '/user/regist',
    info: '/user/info',
    shareInfo: '/user/shareInfo',  // 分享頁面
    resetpwd: '/user/resetpwd',  // 找回密码
    modifypwd: '/user/modifypwd',  // 修改密码（登录密码，支付密码，手势密码）;
    modifyBaseInfo: '/user/modifyBaseInfo',
    upvip: '/user/upvip',
    friends: '/user/friends'
  },
  user_auth: {
    add: '/user_auth/add'
  },
  card: {
    add: '/card/add',
    modify: '/card/modify',
    list: '/card/list',
    detail: '/card/detail',
    detailByUserId: '/card/detailByUserId',
    modifySavinsCard: '/card/modifySavinsCard',
    getFastPayMsgCode: '/card/getFastPayMsgCode',
    getUserCreditCardList: '/card/getUserCreditCardList',
    modifyCreditCard: '/card/modifyCreditCard',
    remove: '/card/remove'
  },
  plan: {
    list: '/plan/list',
    create: '/plan/create',
    delete: '/plan/delete',
    preview: '/plan/preview',
    removePreview: '/plan/removePreview',
    validday: '/plan/validday', //获取可用天
  },
  balance: {
    recharge: '/balance/recharge',
    record: '/balance/record',
    bankpay: '/balance/bankpay',
    weixinpay: '/balance/weixinpay'
  },
  order: {
    info: '/order/info',
    list_new: '/order/list/new',
    list_filter: '/order/list/filter',
  },
  doc: {
    article: '/doc/article',
    list: '/doc/list',
    nearly: '/doc/nearly',
  },
  system: {
    info: '/system/info' // 加载系统配置信息
  },
  cash: {
    draw: '/cash/draw',
    info: '/cash/info',
    unionpay: '/cash/unionpay'
  },
  coupon: {
    list: '/coupon/list',
    info: '/coupon/info'
  },
  luodi: {
    addAccountNum: '/luodi/addAccountNum',
    region: '/luodi/region'
  }
}
