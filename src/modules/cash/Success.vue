<template>
  <div class="cash-success">
    <m-head :title="title + '详情'" left="back"></m-head>

    <div class="mui-content">
      <div class="tx-detaile">
        <div>
          <img class="success-ico" src="../../assets/images/success.png" />
        </div>
        <h5>{{renderMoney(realMoney * 100)}}元</h5>
        <p>{{title}}申请成功</p>
      </div>
      <div>
        <ul class="mui-table-view">
          <li class="mui-table-view-cell">
            <a  class=" l-font">
              {{title}}至储蓄卡
              <span class="mui-pull-right tx-right">{{nDepositCard.card_bank}}（尾号{{nDepositCard.card_no_last}}）</span>
            </a>
          </li>
          <li class="mui-table-view-cell">
            <a  class=" l-font">
              {{title}}金额
              <span class="mui-pull-right tx-right">{{renderMoney(realMoney * 100)}}元</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!--ljj-->
    <div class="sk-message">*如未实时到账，一般最晚第二个工作日可到账</div>
    <div class="sk-next">
      <button type="button" @click="goBack" class="mui-btn mui-btn-primary">完成</button>
    </div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        <a  class=" l-font mui-navigate-right " @click="building">
          信用卡还款提醒
          <span class="mui-pull-right tx-right">暂未设置</span>
        </a>
      </li>
    </ul>
    <dl class="success-bottom clearfix">
        <dt class="fl"><img src="../../assets/images/success1.png"> </dt>
        <dd class="fr">
          <span>代还信用卡，超低手续费，实时恢复额度</span>
          <p> <a  href="javascript:void(0)" @click="building">立即还款</a></p>
        </dd>
    </dl>
    <div class="sucess-bottom">如有疑问请联系客服？</div>
  </div>
</template>

<script>
  import rest from '../rest'
  import api from '../api'
  import helper from '../helper'
  import bank from '../../config/bank'
  export default {
    name: 'cashSuccess',
    data () {
      return {
        title: this.$route.query.cash? '收款': '提现',
        bank: bank,
        money: this.$route.query.money,
        nDepositCard: helper.getJson('nDepositCard'),
        nCreditCard: helper.getJson('nCreditCard'),
        realMoney: 0,
      }
    },
    mounted: function () {
      this.freshSystemInfo(systemInfo => {
        this.realMoney = this.money * (1 - systemInfo.api.cash.feeRate/100) - systemInfo.api.cash.fixedAmount/100;
      });

      //因为是收款成功和提现成功公用这一个页面所以要判断一下
      if(this.$route.query.id){
        this.withdrawInfo();
      }

    },
    methods: {
      goBack: function () {
        helper.remove(['nDepositCard', 'nDepositCard']);
        this.$router.go(-2);
      },
      withdrawInfo:function(){
        var id = this.$route.query.id;
        rest.get(api.cash.info,{id}).done(res=>{
          if(helper.isSuccess(res)){
            this.freshUserInfo(()=> {  //刷新用户信息
              this.money = res.data.money;
              this.realMoney = this.money / 100;
              this.nDepositCard = {card_bank: res.data.card_bank, card_no_last: res.data.card_no};
              this.nDepositCard.card_no_last = res.data.card_no.substr(-4); //截取银行卡号后四位
            })
          }
        })
      },

    }
  }
</script>

<style scoped>

</style>
