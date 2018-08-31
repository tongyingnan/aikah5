<template>
  <div class="balance-pay">
    <m-head title="网银支付" left="back"></m-head>

    <div class="rep">
      <h5>付款金额</h5>
      <h1><span>￥</span>{{renderMoney(order.money)}}</h1>
    </div>


    <div class="get-money" style="margin-top: 10px;">
      <div class="mui-input-group">
        <div class="mui-input-row">
          <select class="sel-com icon" v-model="card_id">
            <option v-for="item in cardList" :value="item.id">{{item.card_bank}}  {{renderCardNo(item.card_no)}}</option>
          </select>
        </div>
      </div>

      <div class="marginTop10">
        <div class="mui-input-group ">
        <div class="mui-input-row">
          <label>手机号</label>
          <input type="text" placeholder="手机号" v-model.trim="phone">
        </div>
        <div class="mui-input-row">
          <label>验证码</label>
          <input type="text" placeholder="请输入验证码" v-model.trim="code" maxlength="6">
          <button type="button" class="mui-btn mui-btn-warning get-code-btn" :disabled="Boolean(outSeconds)" @click="getMsgCode">
            {{outSeconds > 0 ? outSeconds + '秒后重发' : '获取验证码'}}
          </button>
        </div>
      </div>
      </div>
      <div class="sk-next">
        <button class="mui-btn mui-btn-primary" @click="submit" :disabled="!phone || !code || !card_id">确认支付</button>
      </div>
    </div>

  </div>
</template>

<script>
  import rest from '../rest'
  import api from '../api'
  import helper from '../helper'
  import bank from '../../config/bank'
  export default {
    name: 'balancePayBank',
    data () {
      let nCreditCard = helper.getJson('nCreditCard');
      let order = helper.getJson('order');
      return {
        outSeconds: 0,
        phone: nCreditCard.phone,
        code: '',
        money: this.$route.query.money,
        realMoney: 0,
        nDepositCard: helper.getJson('nDepositCard'),
        nCreditCard: nCreditCard,
        cardList: [],
        card_id: 0,
        bank: bank,
        order: order
      }
    },
    mounted: function () {
      this.loadCardList();
    },
    selectCard: function (card_id) {
      this.card_id = card_id;
    },
    methods: {
      timeout: function () {
        if(this.outSeconds > 0){
          this.outSeconds --;
          setTimeout(this.timeout, 1000);
        }
      },
      getMsgCode: function () {
        if(this.phone.isMobile()){
          if(this.outSeconds < 1){
            rest.get(api.sms.code, {phone: this.phone, type: 'unionpay'}).done(res => {
              if(helper.isSuccess(res)){
                this.outSeconds = 60;
                this.timeout();
              }
            });
          }
        }else{
          helper.toast('手机号格式不正确');
        }
      },
      loadCardList: function () {
        rest.get(api.card.list).done(res => {
          this.cardList = res.data || [];
          if(this.cardList.length < 1){
            helper.toast('请先添加一张银行卡');
          }else{
            this.card_id = this.cardList[0].id;
          }
        });
      },
      submit: function () {
        var params = {
            code: this.code,  //验证码
            phone: this.phone,
            card_id: this.card_id,
            money: this.order.money
        };
        rest.post(api.balance.bankpay, params).done(res => {
          if(helper.isSuccess(res)){
            this.order.id = res.data;
            this.order.status = 1;
            helper.setJson({order: this.order});
            this.$router.go(-1);
          }
        });
      },
      renderCardNo: function (card_no) {
        return card_no.replace(card_no.substring(4, card_no.length - 4), '*********');
      }
    }
  }
</script>
<style scoped>
  .mui-input-row select{
    height: 47px;
  }
  .mui-input-group:after{
    background-color:  transparent;
  }
</style>
