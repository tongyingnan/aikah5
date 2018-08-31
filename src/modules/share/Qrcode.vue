<template>
  <div class="share-qrcode" style="background-color: #B41D29;">
    <m-head title="分享二维码" :left="isShared ? '': 'back'">
      <router-link to="" slot="right" class="mui-pull-right" v-if="!isShared">
        <img src="../../assets/images/02.png" class="set-ico" @click="share">
        <!--消息中心-->
      </router-link>
    </m-head>
    <div class="mui-content">
      <div class="mui-content bg-white">
        <div class="y-bg">
          <img class="ic" src="../../assets/images/new/las_01.jpg">
          <div class="share-word">
            <div class="y-p1">推荐人：<span>{{filterRealName(userInfo.real_name || userInfo.phone)}}</span></div>
            <!--<div class="y-p2">邀请码：<span>{{(userInfo.referral_code || '').toUpperCase()}}</span></div>-->
            <div class="y-p2">邀请码：<span>{{userInfo.referral_code || ''}}</span></div>
            <div class="y-p3">已邀请用户：<span>{{userInfo.c_indirect_friends + userInfo.c_direct_friends}}</span>人</div>
            <div>
              <img class="ic2" :src="qrImg"/>
            </div>
            <p class="pword">扫描二维码  关注下载使用</p>
            <p class="pword">注册即是代理  二级裂变  高额返佣</p>
            <p class="pword">分润实时清算  分润日结  立即到账</p>
            <div class="share-click" @click="pop">点击查看更多详情</div>
          </div>
        </div>
      </div>
    </div>
    <div class="share-pop clearfix" v-show="nopop">
      <img src="../../assets/images/new/share-bg1.png" class="share-icon">
      <div class="con">
        <p> 1.常规奖励；直邀一名新用户，最高可获得149元奖励；</p>
        <p> 间邀一名新用户，可获得最高 60元奖励；</p>
        <p> 2.返现奖励：直邀用户交易一万元，最高可获得23元奖励；</p>
        <p> 间邀用户交易一万元，可获得最高7元奖励；</p>
        <p> 3.额外奖励：注册实名认证，绑定信用卡，有机会获得7元奖励；</p>
        <p> 4.加盟代理商，联系客服，更多奖励等你拿；</p>
        <div class="share-btn" @click = "poclose">
          确定
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import helper from '../helper'
  import rest from '../rest'
  import api from '../api'
  export default {
    name: 'shareQrcode',
    data () {
      return {
        qrImg: '',
        nopop:false,
        userInfo: this.userInfo || {},
        isShared: this.$route.query.id ? true: false,

      }
    },
    mounted: function () {
      if(!this.userInfo.id){
        this.loadUserInfo(()=>{
          this.createQrImg();
        });
      }else{
        this.createQrImg();
      }
    },
    methods: {
      pop:function(){
       this.nopop = true;
      },
      poclose:function(){
       this.nopop = false;
      },
      filterRealName: function (text) {
        text = text || '';
        var tmpArr = text.split('');
        for(var i=0;i<tmpArr.length; i++){
          var str = tmpArr[i];
          if((i > 0 && i < tmpArr.length - 1) || (i>0 && i < tmpArr.length - 1)){
            str = '*';
          }
          tmpArr[i] = str;
        }
        return tmpArr.join('');
      },
      createQrImg: function () {
        var url = this.appInfo.domain + '/#/user/regist?s=' + this.userInfo.referral_code;
        this.buildQrImg(url, (imgData) => {
          this.qrImg = imgData;
        });
      },
      share: function () {
//        try catch 方法是补货，如果原生的那边还没有接到，就显示暂未开通
        try{
          nativeIOS.weixinShare('终于可以不用自己还信用卡了', '智能还款 即时到账 操作方便 手续费低 美化账单 安全便捷', this.appInfo.domain +'/#/share/qrcode?id='+this.userInfo.id);
        }catch(e){
          try{
            Wechat.share({
              message: {
                title: "终于可以不用自己还信用卡了",
                description: "智能还款 即时到账 操作方便 手续费低 美化账单 安全便捷",
                mediaTagName: "TEST-TAG-001",
                messageExt: "akzngj",
                messageAction: "<action>dotalist</action>",
                thumb: this.appInfo.domain+'/static/images/logo/'+this.appInfo.pack+'.png',
                media: {
                  type: Wechat.Type.WEBPAGE,
                  webpageUrl: this.appInfo.domain +'/#/share/qrcode?id='+this.userInfo.id
                }
              },
              scene: Wechat.Scene.TIMELINE   // share to Timeline
            }, function () {

            }, function (reason) {
              helper.toast(reason)
            });
          }catch (e){
            helper.toast("暂未开通")
          }
        }
      },
      loadUserInfo: function (callback) {
        var id = this.$route.query.id;
        rest.get(api.user.shareInfo, {id}).done(res=>{
          if(helper.isSuccess(res)){
            this.userInfo = res.data;
            this.appInfo = res.data.appInfo;
            callback();
          }
        });
      }

    }
  }
</script>

<style scoped>

  body {
    background-color: #B41D29;
  }
  .mui-content{
    background-color: #B41D29;
  }
  header{
    background: #B41D29 !important;
  }
</style>
