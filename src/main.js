// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import config from '../config';
import {formType, formLength}from './directives/form-valid';

import Vue from 'vue'
import QRCode from 'qrcode'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import store from './modules/vuex/store';
//import VueResource from 'vue-resource'; 

/*global components*/
import head from './modules/includes/head'
import tabs from './modules/includes/tabs'
import panel from './modules/includes/v-html-panel'
import helper from './modules/helper';
import api from './modules/api';
import rest from './modules/rest';

Vue.component('m-head', head)
Vue.component('m-tabs', tabs)
Vue.component('v-html-panel',panel)
Vue.directive('type', formType)
Vue.directive('length', formLength)
//Vue.use(VueResource) 
Vue.config.productionTip = false
Vue.mixin({
  data(){
    return {
      appInfo: config.appInfo,
      userInfo: this.$store.state.userInfo || {},
      systemInfo: this.$store.state.systemInfo || {},
    }
  },
  mounted: function () {
    let initMuiAction = ()=>{
      mui.init({
        swipeBack:true //启用右滑关闭功能
      });
      mui('.mui-input-row input').input();
      mui('.mui-numbox').numbox();
    };
    initMuiAction();
  },
  methods: {
    freshUserInfo: function (callback) {
      rest.get(api.user.info).done(res => {
        if(helper.isSuccess(res)){
          this.$store.dispatch('setUserInfo', res.data);
          this.userInfo = res.data;
          if(callback){
            callback();
          }
        }
      });
    },
    freshSystemInfo: function (callback) {
      if(!this.systemInfo.lastupdatetime || new Date().getTime() - this.systemInfo.lastupdatetime > 2 * 60 * 1000){
        this.systemInfo.lastupdatetime = new Date().getTime();
        rest.get(api.system.info).done(res => {
          if(helper.isSuccess(res)){
            this.$store.dispatch('setSystemInfo', res.data);
            this.systemInfo = Object.assign(this.systemInfo, res.data);
            if(callback){
              callback(res.data);
            }
          }
        });
      }else{
        if(callback){
          callback(this.systemInfo);
        }
      }
    },
    fixed: function (num, n) {
      n = isNaN(n) ? 0 : n;
      return parseFloat(num).toFixed(n).replace('.00', '');
    },
    building: function (e) {
      helper.toast('升级中，敬请期待！');
    },
    buildQrImg: function (str, callback) {
      QRCode.toDataURL(str, { errorCorrectionLevel: 'H' }, function (err, url) {
        callback(url);
      });
    },
    renderMoney: function (money) {
      money = isNaN(Number(money)) ? 0 : Number(money);
      return parseFloat(money/100).toFixed(2);
    },
    filterHtml: function (html) {
      return (html || '').replace(/<[^>]*>|<\/[^>]*>/gm, '  ');
    },
    // 计算距离下一次还款的天数
    computeCdDay: function (day) {
      var billDate = new Date(),
        nowDate = new Date();

      billDate.setDate(day);
      if(billDate < nowDate){
        billDate.setMonth(new Date().getMonth() + 1);
      }
      var balanceDay = (billDate.getTime() - nowDate.getTime()) / (3600 * 24 * 1000);
      return parseInt(balanceDay);
    },
    turnToPay: function (type, order) {
      mui('#deletePop').popover(type ? 'hide' : 'show');
      if(order){
        if(this.userInfo.username === '17321001793'){
          order.money = 1;
        }
        helper.setJson({order: order});
      }else{
        order = helper.getJson('order');
      }

      /**
       * 微信支付
       */
      let weixinPay = () => {
        let type = 'mweb';
        if(typeof Wechat !== 'undefined'){
          type = 'app';
        }
        rest.post(api.channel.weixin.unifiedorder, {money: order.money, type}).done(res=>{
          if(helper.isSuccess(res)){
            let {appid, partnerid, prepayid, noncestr, timestamp, sign}=res.data;
            try{
              nativeIOS.weixinPay(appid, partnerid, prepayid, res.data.package, noncestr, timestamp, sign);
            }catch(e){
              try{
                if(type === 'app'){
                  Wechat.sendPaymentRequest({partnerid, prepayid, noncestr, timestamp, sign}, function () {
                  }, function (reason) {
                    helper.toast(reason)
                  });
                }else if(type === 'mweb'){
                  if(order.redirect_url){
                    res.data += encodeURIComponent(order.redirect_url);
                  }
                  location.href = res.data;
                }
              }catch(e){
                helper.toast('暂未开通微信支付，请尝试其他支付方式');
              }
            }
          }
        });
      };


      /**
       * 银行卡支付
       */
      let bankPay = () => {
        this.$router.push('/balance/paybank');
      };


      /**
       * 支付宝支付
       */
      let aliPay = () => {
        rest.post(api.channel.alipay.unifiedorder, {money: order.money}).done(res=>{
          if(helper.isSuccess(res)){
            location.href = 'https://openapi.alipay.com/gateway.do?'+res.data;
          }
        });
      };


      /**
       * 支付方式
       */
      switch (type){
        case 'weixin':
          weixinPay(); return;
        case 'paybank':
          bankPay(); return;
        case 'alipay':
          aliPay(); return;
      }
    }
  }
});

var nativeIOS = eval('(nativeIOS)');

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
FastClick.attach(document.body);
$('title').html(config.appInfo.name);


document.addEventListener("deviceready", function () {

  if(navigator.splashscreen){
    setTimeout(function() {
      navigator.splashscreen.hide();
    }, 3000);
    navigator.splashscreen.hide();
  }
}, false);
