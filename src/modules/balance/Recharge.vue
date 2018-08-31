<template>
  <div class="balance-recharge">
    <m-head title="余额充值" left="back"></m-head>

    <div class="mui-page-content" style="margin-top: 44px;">

      <div class="mui-input-group">
        <div class="mui-input-row">
          <label>充值至</label>
          <input type="text" :placeholder="'我的余额 '+renderMoney(userInfo.money)+'元'" v-model="target">
        </div>
        <div class="mui-input-row">
          <label>支付方式</label>
          <select class="mui-input-clear" v-model="card_id">
            <option v-for="item in cards" :value="item.id">{{item.card_bank}}</option>
          </select>
        </div>
        <div class="mui-input-row">
          <label>充值金额</label>
          <input type="text" class="mui-input-clear" placeholder="" v-model="money">
        </div>
      </div>

    </div>

    <div class="sk-next">
      <button type="button" class="mui-btn mui-btn-primary" :disabled="!money || !card_id">下一步</button>
    </div>

  </div>
</template>

<script>
  import api from '../api'
  import helper from '../helper'
  import rest from '../rest'

  export default {
    name: 'balanceRecharge',
    data () {
      return {
        money: '',
        cards: [],
        target: '',
        card_id: '',
      }
    },
    mounted: function () {
      this.loadCardList();
    },
    methods: {
      loadCardList: function () {
        rest.get(api.card.list).done(res => {
          this.cards = res.data;
        });
      },
      submit: function () {
        var data = {
          money: this.money,
          card_id: this.card_id,
          target: this.target
        }
        rest.post(api.balance.recharge, data).done(res => {
          if(helper.isSuccess(res)){
            this.$router.push('/cash/success');
          }
        });
      }
    }
  }
</script>

