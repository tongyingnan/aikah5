<template>
  <div class="cash-draw">
    <m-head title="提现" left="back"></m-head>
    <div class="card-content">
      <ul>
        <li>
          <a href="#cardPopover">
            <div :class="'bank-bg-' + bank.get(nCard.card_bank).color">
              <div class="bankico fl">
                <i :class="'icon icon-md icon-bank-' + bank.get(nCard.card_bank).icon"></i>
              </div>
              <div class="fl bank-h">
                <h5>{{nCard.card_bank}}</h5>
                <h5>{{nCard.name}} | 尾号 {{nCard.card_no_last}}</h5>
              </div>
              <div class="r-jt">
                <img src="../../assets/images/r.png" />
              </div>
              <div class="clear"></div>
            </div>
          </a>
        </li>

      </ul>

      <div class="margin10">
        <div class="mui-input-group">
          <div class="mui-input-row">
            <label>提现金额</label>
            <input type="text" :placeholder="'当前余额：'+ renderMoney(userInfo.money) +'元'" v-model="money"/>
          </div>
        </div>
      </div>
    </div>

    <div class="sk-next" style="margin-top: 0px;">
      <p class="mui-text-left"> 单笔提现金额范围100-10000元、每笔手续费2元</p>
      <button type="button" class="mui-btn mui-btn-primary" :disabled="!nCard.id || !money" @click="submit">两小时到账，确认提现</button>
    </div>

    <div id="cardPopover" class="mui-popover mui-popover-action mui-popover-bottom">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell" @click="changeCard(index)" v-for="(item, index) in cardList">
          <a href='javascript:void(0)' style="color: #FF3B30;">{{item.card_bank}}</a>
        </li>
      </ul>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <a href="#cardPopover"><b>取消</b></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import helper from '../helper'
  import rest from '../rest'
  import api from '../api'
  import bank from '../../config/bank'
  export default {
    name: 'cashDraw',
    data () {
      return {
        bank: bank,
        cardList: [],
        nCard: {},
        types: [],
        orders: [],
        npage: 1,
        money:"",
      }
    },
    mounted: function () {
      this.loadCardList();
    },
    methods: {
      loadCardList: function () {
        rest.get(api.card.list).done(res => {
          res.data = res.data || [];
          for(var i=0; i<res.data.length; i++){
            var bank = res.data[i];
            if(bank.type === 0){
              this.cardList.push(bank);
            }
          }
          if(this.cardList.length > 0){
            this.nCard = this.cardList[0];
          }else{
            helper.alert('尚未添加储蓄卡，请先到我的卡包中添加一张储蓄卡。');
          }
        });
      },
      changeCard: function (index) {
        mui('#cardPopover').popover('toggle');
        this.nCard = this.cardList[index];
      },
      submit: function () {
        if(this.money >= 100 && this.money <= 10000){
          if(this.userInfo.money < this.money * 100){
            helper.toast('账户余额不足');
          }else{
            rest.post(api.cash.draw, {card_id: this.nCard.id, money: this.money * 100, type: 1}).done(res => {
              if(helper.isSuccess(res)){
                this.$router.push('/cash/success?id='+res.data);
              }
            });
          }
        }else{
          helper.toast('分润提现金额限制100-10000元');
        }
      }
    }
  }
</script>

<style scoped>

  .mui-input-group .mui-input-row{
    height: 38px;
  }
  .mui-input-row label{
    font-weight: bold;
    color: #666;
  }
</style>
