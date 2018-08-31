<template>
  <div class="card-add">
    <m-head :title="title" left="back">
      <!--<router-link slot="right" to="/card/help" class="mui-pull-right"><span class="mui-icon mui-icon-help"></span></router-link>-->
      <router-link slot="right" to="/card/explain" class="mui-pull-right">注意事项</router-link>
    </m-head>
    <div class="get-money">
      <div class="mui-input-group" >
        <div class="mui-input-row">
          <label>持卡人</label>
          <input type="text" placeholder="请输入姓名" v-model="name" :value="userInfo.real_name" >
        </div>
        <div class="mui-input-row">
          <label>身份证</label>
          <input type="text" placeholder="请输入本人身份证号码" v-model="idcard" :value="userInfo.idcard" v-type="'idcard'" desc="身份证" >
        </div>
         <div class="mui-input-row">
          <label>信用卡</label>
          <input type="text" placeholder="请输入信用卡卡号"  v-model.trim="card_no" v-type="'number'" desc="信用卡卡号" >
        </div>
        <div class="mui-navigate-right phr2" style="position: relative" >
          <div class="mui-input-row">
            <label>开户银行</label>
            <select class="banksel" v-model="selectBank" >
              <option :value="item" v-for="item in bank.list">{{item.name}}</option>
            </select>
          </div>
        </div>
        <div class="mui-input-row" >
          <label>有效期</label>
          <input type="text" placeholder="请输入有效期月/年（例：0527）" v-model="expiry_date" v-type="'number'" desc="有效期" minlength="4" maxlength="4">
        </div>
        <div class="mui-input-row" >
          <label>验证码(cv2)</label>
          <input type="text" placeholder="请输入卡片背后3位验证码" v-model="cvv" v-type="'number'" desc="验证码" minlength="3" maxlength="3">
        </div>
        <div class="mui-input-row">
          <label>账单日</label>
          <input type="text" class="mui-input-clear"  placeholder="格式如5号，输入5" v-model="bill_day" v-type="'number'" desc="账单日" minlength="1" maxlength="2">
        </div>
        <div class="mui-input-row">
          <label>还款日</label>
          <input type="text" class="mui-input-clear"  placeholder="格式如25号，输入25" v-model="repayment_day" v-type="'number'" desc="还款日" minlength="1" maxlength="2">
        </div>
        <div class="mui-input-row">
          <label>手机号</label>
          <input type="text" placeholder="请输入预留手机号" v-model="phone" :value="userInfo.phone" v-type="'mobile'" desc="手机号" >
        </div>
        <div class="mui-input-row" id="code">
          <label>短信验证码</label>
          <input type="text" placeholder="请输入验证码" v-model.trim="code" maxlength="6">
          <button type="button" class="mui-btn mui-btn-warning get-code-btn" :disabled="Boolean(outSeconds)" @click="getMsgCode">
            {{outSeconds > 0 ? outSeconds + '秒后重发' : '获取验证码'}}
          </button>
        </div>
      </div>
      <div class="sk-next">
        <button type="button" id="submit" class="mui-btn mui-btn-primary" :disabled="!valid" @click="submit">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api";
import rest from "../rest";
import helper from "../helper";
import bank from "../../config/bank";

export default {
  name: "cardModyfiy",
  data() {
    return {
      ifFromSavings: this.$route.query.ifFromSavings||'',
      outSeconds: 0,
      bank: bank,
      name: null,
      phone: null,
      code: null,
      idcard: null,
      card_no: null,
      selectBank: null,
      cvv: null,
      expiry_date: null,
      bill_day: null,
      repayment_day: null,
      fast_pay_key: null,
      fast_pay_id: null,
      cardList: [],
      card: {},
      index: 0
    };
  },
  computed: {
    title: function() {
      var title = "修改信用卡";
      return title;
    },
    valid: function() {
      return (
        this.name &&
        this.phone &&
        this.idcard &&
        this.card_no &&
        this.selectBank &&
        this.cvv &&
        this.expiry_date &&
        this.bill_day &&
        this.repayment_day &&
        this.code
      );
    }
  },
  created: function() {
    this.idcard = this.userInfo.idcard;
    this.name = this.userInfo.real_name;
    this.phone = this.userInfo.phone;
    this.fast_pay_key = this.userInfo.fast_pay_key;
    this.fast_pay_id = this.userInfo.fast_pay_id;
  },
  mounted: function() {
    this.loadCardInfo(this.userInfo.id);
  },
  methods: {
    timeout: function() {
      if (this.outSeconds > 0) {
        this.outSeconds--;
        setTimeout(this.timeout, 1000);
      }
    },
    loadCardInfo: function(id) {
      rest.get(api.card.getUserCreditCardList, { id }).done(res => {
        this.cardList = res.data;
        if (helper.isSuccess(res)) {
          if (this.cardList && this.cardList.length > 0) {
            this.index = 0;
            this.card = this.cardList[this.index];
            this.card_no = this.card.card_no;
            this.bill_day = this.card.bill_day;
            this.repayment_day = this.card.repayment_day;
            this.cvv = this.card.cvv;
            this.expiry_date = this.card.expiry_date;
          } else {
            this.userInfo.is_need_rebind = 0;
            if (this.ifFromSavings) {
              this.$router.go(-2);
            } else {
              this.$router.go(-1);
            }
          }
        }
      });
    },
    getMsgCode: function() {
      if (this.phone.isMobile()) {
        if (this.card_no) {
          if (this.outSeconds < 1) {
            let {
              phone,
              idcard,
              card_no,
              fast_pay_key,
              fast_pay_id
            } = this.$data;
            var params = { phone, card_no, fast_pay_key, fast_pay_id };
            //console.log(this.$data);
            //console.log(params);
            rest.post(api.card.getFastPayMsgCode, params).done(res => {
              if (helper.isSuccess(res)) {
                this.outSeconds = 60;
                this.timeout();
                this.userInfo.fast_pay_key = res.data.fast_pay_key;
                this.userInfo.fast_pay_id = res.data.fast_pay_id;
                helper.toast("验证短信发送成功");
              }
            });
          }
        } else {
          helper.toast("请先输入卡号");
        }
      } else {
        helper.toast("手机号格式不正确");
      }
    },

    submit: function() {
      var nowTime = Number(new Date().format("hhmm"));
      var startTime = this.systemInfo.switch.addCardTimeRange.startTime,
        endTime = this.systemInfo.switch.addCardTimeRange.endTime;
      document.getElementById("submit").setAttribute("disabled", true);
      if ($(".card-add [error]").length > 0) {
        helper.toast(
          $(".card-add [error]")
            .eq(0)
            .attr("error")
        );
      } else if (
        nowTime < Number(startTime.replace(/[^\d]+/g, "")) ||
        nowTime > Number(endTime.replace(/[^\d]+/g, ""))
      ) {
        helper.toast("添加信用卡时间：{0} - {1}".format(startTime, endTime));
      } else {
        let {
          name,
          phone,
          idcard,
          card_no,
          selectBank,
          cvv,
          expiry_date,
          bill_day,
          repayment_day,
          type,
          code
        } = this.$data;
        var data = {
          name,
          phone,
          idcard,
          card_no,
          cvv,
          expiry_date,
          bill_day,
          repayment_day,
          type,
          code
        };

        var url = api.card.modifyCreditCard;
        data.card_bank = selectBank.name;
        data.union_num = selectBank.union_num;
        rest.post(url, data).done(res => {
          document.getElementById("submit").removeAttribute("disabled");
          if (helper.isSuccess(res)) {
            this.index++;
            if (this.index < this.cardList.length) {
              var msg =
                "修改成功，请继续绑定：" + this.cardList[this.index].card_no;
              mui.confirm("提示", msg, ["确定"], e => {
                if (!e.index) {
                  this.card = this.cardList[this.index];
                  this.card_no = this.card.card_no;
                  this.bill_day = this.card.bill_day;
                  this.repayment_day = this.card.repayment_day;
                  this.code = "";
                  this.cvv = this.card.cvv;
                  this.selectBank = null;
                  this.expiry_date = this.card.expiry_date;
                }
              });
            } else {
              helper.toast("绑定成功");
              this.userInfo.is_need_rebind = 0;
              if (this.ifFromSavings) {
                this.$router.go(-2);
              } else {
                this.$router.go(-1);
              }
            }
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.mui-input-group:after {
  background-color: transparent;
}
.explain-word {
  margin: 3px 15px;
}
</style>
