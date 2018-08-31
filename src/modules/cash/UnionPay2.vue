<template>
  <div class="cash-unionPay">
    <m-head title="信用卡收款" left="back"></m-head>

    <div class="card-content q-center enter-page" style="    margin-top: 43px;">
      <div class="enter-info">
        <p>到账金额 + 代付费</p>
        <h1>{{renderMoney(realMoney * 100)}} + {{(systemInfo.api.cash.fixedAmount / 100)}}</h1>
        <p>收款金额（元）</p>
        <p>{{renderMoney(money * 100)}}</p>
      </div>
      <div class="margin10">
        <div class="mui-input-group">
          <div class="mui-input-row">
            <label>到账储蓄卡</label>
            <div class="bank-bg-x">
              <div class="bankico fl" style="margin-left: -4px;">
                <i :class="'icon icon-xs icon-bank-' + bank.get(nDepositCard.card_bank).icon"></i>
              </div>
              <div class="fl bank-h">
                <h5>{{nDepositCard.card_bank}}({{nDepositCard.card_no_last}})</h5>
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 10px;"></div>
      <div class="margin10">
        <div class="mui-input-group">
          <div class="mui-input-row">
            <label>收款信用卡</label>
            <div class="bank-bg-x">
              <div class="bankico fl" style="margin-left: -4px;">
                <i :class="'icon icon-xs icon-bank-' + bank.get(nCreditCard.card_bank).icon"></i>
              </div>
              <div class="fl bank-h">
                <h5>{{nCreditCard.card_bank}}({{nCreditCard.card_no_last}})</h5>
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="mui-input-group">
        <div class="mui-input-row"  id="myid" >
          <label>手机号</label>
          <input type="text" placeholder="手机号" v-model.trim="phone" readonly>
        </div>
		<div class="mui-input-row" id="code">
          <label>验证码</label>
          <input type="text" placeholder="请输入验证码" v-model.trim="code" maxlength="6">
          <button type="button" class="mui-btn mui-btn-warning get-code-btn" :disabled="Boolean(outSeconds)" @click="getMsgCode">
            {{outSeconds > 0 ? outSeconds + '秒后重发' : '获取验证码'}}
          </button>
        </div>
     
      </div>
      <div class="sk-next" style="margin-top: 40px;">
        <button id="submit" class="mui-btn mui-btn-primary" :disabled="!Boolean(code) "@click="submit">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
import helper from "../helper";
import rest from "../rest";
import api from "../api";
import bank from "../../config/bank";
export default {
  name: "cashUnionPay2",
  data() {
    var nCreditCard = helper.getJson("nCreditCard");
    return {
      outSeconds: 0,
      phone: nCreditCard.phone,
      code: "",
      money: this.$route.query.money,
      realMoney: 0,
      bank: bank,
      nDepositCard: helper.getJson("nDepositCard"),
      nCreditCard: nCreditCard,
      orderId: null,
      channel: this.$route.query.channel,
    };
  },

  mounted: function() {
    this.freshSystemInfo(systemInfo => {
      this.realMoney =
        this.money * (1 - systemInfo.api.cash.feeRate / 100) -
        systemInfo.api.cash.fixedAmount / 100;
    });
    this.initView();
    console.log(this.channel);
  },
  methods: {
    timeout: function() {
      if (this.outSeconds > 0) {
        this.outSeconds--;
        setTimeout(this.timeout, 1000);
      }
    },
    getMsgCode: function() {
      if (this.phone.isMobile()) {
        if (this.outSeconds < 1) {
          var params = {
            source_card_id: this.nCreditCard.id,
            target_card_id: this.nDepositCard.id,
            money: this.money
          };
          rest.post(api.cash.unionpay, params).done(res => {
            if (helper.isSuccess(res)) {
              this.outSeconds = 60;
              this.timeout();
              this.orderId = res.data;
            }
          });
        }
      } else {
        helper.toast("手机号格式不正确");
      }
    },

    submit: function() {
      var params = {
        code: this.code,
        order_id: this.orderId,
        source_card_id: this.nCreditCard.id,
        target_card_id: this.nDepositCard.id,
        money: this.money,
        channel:this.channel
      };
      rest.post(api.cash.unionpay, params).done(res => {
        if (this.systemInfo.channel.cash === "channel_fastpay") {
          if (helper.isSuccess(res)) {
            this.$router.push({
              path: "/cash/cashHtml",
              query: { order: res.data }
            });
          }
        } else {
          if (helper.isSuccess(res)) {
            this.$router.push("/cash/success?cash=true&money=" + this.money);
          }
        }
      });
    },
    initView: function() {
      //console.log(this.systemInfo.channel.cash);
      if (this.systemInfo.channel.cash === "channel_fastpay") {
        document.getElementById("code").style.display = "none"; //隐藏
        document.getElementById("submit").removeAttribute("disabled");
      }
    }
  }
};
</script>

<style scoped>
.bankico {
  margin-top: 4px;
}
</style>



