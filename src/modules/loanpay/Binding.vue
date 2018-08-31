<template>
  <div class="binding-card">
    <m-head title="帮你还" left="back">
      <router-link to="/loanpay/loanhelp" class="mui-pull-right" style="color: #ffffff; margin-top: 10px;" slot="right">使用说明</router-link>
    </m-head>
    <div class="repay">
      <ul class="mui-table-view back-ul">
        <li class="mui-table-view-cell clearfix mui-transitioning "  v-for="item in cardList" v-if="item.type">

          <!--you修改和删除-->
          <div class="mui-slider-right mui-disabled">
            <button type="button" @click="modifyCard(item.id, item.type)" class="mui-btn mui-btn-yellow">修改<br />信息</button>
            <button type="button" @click="removeCard(item.id, item.type)" class="mui-btn mui-btn-red">卸载<br />卡片</button>
          </div>
          <!--修改和删除-->

          <div :class="'card_up  clearfix bank-bg-' + bank.get(item.card_bank).color">
            <span><i :class="'icon icon-md icon-bank-' + bank.get(item.card_bank).icon"></i></span>
            <em>{{item.card_bank}}</em>
            <em>|</em>
            <!--<i>{{cardInfo.name}}</i>-->
            <i class="end-number">{{item.name}} | 尾号 {{item.card_no_last}}</i>
            <!--<i class="card-begin">正在执行/尚未规划{{ message }}</i>-->
            <i v-show="item.type" >距还款日<em>{{computeCdDay(item.repayment_day)}}</em>天</i>
            <a href="javascript:void(0)" class="card_sx" @click="building"><img src="../../assets/images/card_img3.png"></a>
          </div>


          <div class="back-click">
            <router-link to="/loanpay/plan" >还款历史记录</router-link>
            <router-link to="/loanpay/signin" >获取账单额度</router-link>
          </div>
        </li>
      </ul>
    </div>
    <a href="javascript:void(0)" class="addCard" @click="addCard"><span>+</span> <span>添加信用卡</span></a>
    <!--<div class="binding-card-em">帮你还仅支持本人信用卡</div>-->
  </div>

</template>

<script>
  import helper from '../helper'
  import rest from '../rest'
  import api from '../api'
  import bank from '../../config/bank'
  export default {
    name: 'Binding',
    data () {
      return {
        bank: bank,
        cardList: [],
      }
    },
    mounted: function () {
      this.loadCardList();
    },
    methods: {
      loadCardList: function () {
        rest.get(api.card.list).done(res => {
          if(res.data && res.data.length > 0){
            this.cardList = res.data;
          }else{
            this.nodata = true;
          }
        });
      },
      turnToDetail: function (id, type) {
        if(type){
          this.$router.push('/card/detail?id=' + id);
        }
      },
      modifyCard: function (id, type) {
        this.$router.push('/card/add?action=modify&id='+id+'&type='+type);
      },
      addCard: function () {
        var msg = '尚未完成实名认证，';
        switch(this.userInfo.auth_status){
          case 0: msg += '请在用户中心提交实名认证信息,认证成功才能使用哦'; break;
          case 1: msg += '请耐心等待审核结果'; break;
          case -2: msg += '审核失败，请重新提交认证材料';break;
          case 2: msg = '';break;
        }
        if(msg){
          helper.alert(msg,null,null,() => {
            if(this.userInfo.auth_status < 1){
              this.$router.push('/user/auth');
            }else{
              if(this.userInfo.auth_status === 1){
                helper.toast('审核中，请耐心等待');
              }
            }
          });
        }else{
          this.$router.push('/card/add?type=1');
          //mui('#cardPopover').popover('toggle');
        }
      },
    }
  }
</script>
<style scoped>

</style>
