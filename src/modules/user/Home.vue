<template>
  <div class=" home_one">
    <m-head title="我的">
      <router-link to="/user/setting" class="mui-pull-right" style="color: #ffffff; margin-top: 10px;" slot="right">
        <img class="set-ico" src="../../assets/images/set/set6.png"/>
        <span class="setting">设置</span>
      </router-link>
    </m-head>

    <div class="mui-page-content">
      <div class="me-setting">
        <div class="fl">
          <div class="logo-me-title">
            <router-link to="/user/baseinfo">
              <img class="mui-action-preview" src="../../assets/images/mepic.png" v-show="!userInfo.head"/>
              <img class="mui-action-preview" :src="userInfo.head" v-show="userInfo.head"/>
            </router-link>
          </div>
        </div>
        <div class="fl me-p">
          <p>ID：{{userInfo.username || '未知'}}</p>
          <p>会员等级：{{getVipInfo}}
            <router-link to="/share/vip" class="ffsjfont" style="text-decoration: underline; color: #f5e841;">立即优惠</router-link>
          </p>
          <p>
            联系推荐人：<a :href="'tel:' + userInfo.reference_phone" class="pop-a">{{userInfo.reference_name || userInfo.reference_phone || '无'}}</a>
          </p>
        </div>
        <div class="clear"></div>
      </div>
      <div class="line-silver"></div>

      <!--<ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <router-link to="/insurance/home" class="mui-navigate-right l-font">
            <img class="set-ico" src="../../assets/images/set/set1.png">
            账户保险
            <span class="mui-pull-right r-font" style="margin-top: 2px;">账户保障中</span>
          </router-link>
        </li>
      </ul>-->
      <div class="clear"></div>
      <ul class="mui-table-view me-settings underline">
        <div class="line-line-height"></div>
        <li class="mui-table-view-cell fl" style="width: 50%;">
          <router-link to="/balance" class="l-font">
            <img class="set-ico" src="../../assets/images/set/set2.png">
            账户余额 {{renderMoney(userInfo.money)}}元
            <span class="mui-pull-right r-font"></span>
          </router-link>
        </li>
        <li class="mui-table-view-cell fl" style="width: 50%;">
          <router-link to="/share/vip" class="l-font">
            <img class="set-ico" src="../../assets/images/new/7.png">
            今日分润 {{renderMoney(userInfo.sum_commission_today)}}元
            <span class="mui-pull-right r-font"></span>
          </router-link>
        </li>
        <div style="clear: both;"></div>
      </ul>
      <div class="line-silver"></div>


      <div class="clear"></div>
      <ul class="mui-table-view me-settings">
        <li class="mui-table-view-cell">
          <router-link to="/balance/record" class="mui-navigate-right l-font">
            <img class="set-ico" src="../../assets/images/set/set5.png"/>
            我的账单
            <span class="mui-pull-right r-font"></span>
          </router-link>
        </li>

        <li class="mui-table-view-cell">
          <router-link to="/share/vip" class="mui-navigate-right l-font">
            <img class="set-ico" src="../../assets/images/vip.png">
            团队建设
            <span style="position: absolute;right: 34px;top: 15px;  font-size: 14px; color: red; font-weight: normal;">开通会员 分享好友赚钱</span>
          </router-link>
        </li>
        <!--<li class="mui-table-view-cell">
          <router-link to="/coupon/home" class="mui-navigate-right l-font">
            <img class="set-ico" src="../../assets/images/set/set2.png">
            我的红包
            <span class="mui-pull-right r-font"></span>
          </router-link>
        </li>-->
        <!--<li class="mui-table-view-cell">
         <router-link to="/share/ranks" class="mui-navigate-right l-font">
           <img class="set-ico" src="../../assets/images/set/set5.png"/>
           排行榜
           <span class="mui-pull-right r-font"></span>
         </router-link>
       </li>-->
      </ul>

      <div class="line-silver"></div>

      <ul class="mui-table-view me-settings">
        <li class="mui-table-view-cell">
          <!--<router-link to="/doc/article?id=2" class="mui-navigate-right l-font">-->
          <router-link to="/user/manual" class="mui-navigate-right l-font">
            <img class="set-ico" src="../../assets/images/set/set10.png">
            操作手册
            <span class="mui-pull-right r-font"></span>
          </router-link>
        </li>
        <li class="mui-table-view-cell">
          <router-link to="/card/savings" class="mui-navigate-right l-font">
            <img class="set-ico" src="../../assets/images/set/set9.png"/>
            卡片管理
            <span class="mui-pull-right r-font" >{{computeCardCount()[1]}} 张信用卡，{{computeCardCount()[0]}}张储蓄卡</span>
            <!--推荐人：{{filterRealName(userInfo.real_name || userInfo.phone)}}-->
          </router-link>
        </li>

        <li class="mui-table-view-cell">
          <a href="javascript:void(0)" class="mui-navigate-right l-font" @click="auth">
            <img class="set-ico" src="../../assets/images/set/set13.png"/>
            实名认证
            <span class="mui-badge" :class="'mui-badge-'+getAuthStatus.color">{{getAuthStatus.text}}</span>
          </a>
        </li>
        <li class="mui-table-view-cell">
          <router-link to="/doc/aboutus" class="mui-navigate-right l-font">
            <img class="set-ico" src="../../assets/images/set/set12.png"/>
            关于我们
            <span class="mui-pull-right r-font"></span>
          </router-link>
        </li>
        <li class="mui-table-view-cell"  @click="pop">
          <a   class="mui-navigate-right l-font" :href="'tel:'+ systemInfo.concat.phone" >
            <img class="set-ico" src="../../assets/images/set/set7.png"/>
            客服热线
            <span style="position: absolute;right: 34px;top: 15px;color: #333;  font-size: 12px;">{{systemInfo.concat.phone}}</span>
          </a>
        </li>
      </ul>
    </div>

    <div style="height: 54px;"></div>

    <m-tabs tab="4"></m-tabs>

    <!--<div class="contact-pop"  v-show="nopop">-->
      <!--<div class="contact-img">-->
        <!--<img src="../../assets/images/contact-pop.png" class="contact-pop-img">-->
        <!--<div class="pop-close" @click="poclose">×</div>-->
      <!--</div>-->
      <!--&lt;!&ndash;ljj号码补充&ndash;&gt;-->
      <!--<a :href="'tel:'+ systemInfo.concat.phone" class="pop-a">热线电话：{{systemInfo.concat.phone}}</a>-->
      <!--<a href="javascript:void(0)" class="pop-a">在线咨询</a>-->
      <!--<p class="contact-pp">服务时间：{{systemInfo.concat.time}}</p>-->
    <!--</div>-->
    <!--<div class="contact-pop-bg" v-show="nopop"  @click="poclose"></div>-->
  </div>
</template>

<script>
  import rest from '../rest';
  import helper from '../helper';
  import api from '../api';

  export default {
    name: 'userHome',
    data() {
      return {
        nopop:false,
        cardList: [],
      }
    },
    beforeRouteEnter : function (to, from ,next) {
      next(vm => {
      vm.freshUserInfo();
      });
    },
//    mounted: function () {
//      helper.setJson({'home.pic': 0 });
//    },
    computed: {

      getVipInfo: function () {
        if(this.userInfo.vip){  //隐式转换（0,空字符串,undefind,null等大约6个，都是转化成false），是6个里面的一个就是false，
          return 'VIP'+ this.userInfo.vip;  //1
        }else{
          return '暂无';  //2
        }
      },
      getAuthStatus: function () {
        switch (this.userInfo.auth_status){
          case 1: return {color: 'warning', text: '审核中'};
          case 2: return {color: 'success', text: '已认证'};
          case -2: return {color: 'danger', text: '认证失败'};
          default: return {color: 'warning', text: '未认证'};
        }
      }
    },
    methods: {
      auth: function () {
        if(this.userInfo.auth_status < 1){
          this.$router.push('/user/auth');
        }else{
          if(this.userInfo.auth_status === 1){
            helper.toast('审核中，请耐心等待');
          }
        }
      },
      pop:function(){
        this.nopop = true;
      },
      poclose:function(){
        this.nopop = false;
      },
      computeCardCount:function () {  //获得储蓄卡和信用卡的卡数
        var cardList = helper.getJson('cardList');  //缓存调用过来
        countDisposeCard //信用卡
        var countCreditCard = 0, countDisposeCard = 0;
        for(var i=0; i<cardList.length; i++){
          if(cardList[i].type===1){
            countCreditCard += 1;
          }else{
            countDisposeCard += 1;
          }
        }
         return [countDisposeCard,countCreditCard]
      }
    }
  }
</script>

<style scoped>
  body{
    background-color: #000;
  }
  .line-silver{
    /*background-color: #f6f6f6;*/
    height: 10px;
  }
  .home_one{
    background-color: #f4f3ef;
  }
  .pop-a{
    text-decoration: underline;
    color: rgb(245, 232, 65);
  }
  .mui-table-view-cell>a{
    font-weight: bold;
    color: #333;
  }

</style>
