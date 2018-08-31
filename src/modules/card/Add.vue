<template>
  <div class="card-add">
    <m-head :title="title" left="back">
      <!--<router-link slot="right" to="/card/help" class="mui-pull-right"><span class="mui-icon mui-icon-help"></span></router-link>-->
      <router-link slot="right" to="/card/explain" class="mui-pull-right">注意事项</router-link>
    </m-head>
    <div class="get-money">
      <div class="mui-input-group" v-show="type === 1">
        <div class="mui-input-row">
          <label>持卡人</label>
          <input type="text" placeholder="请输入姓名" v-model="name" :value="userInfo.real_name" :readonly="modifyId">
        </div>
        <div class="mui-input-row">
          <label>身份证</label>
          <input type="text" placeholder="请输入本人身份证号码" v-model="idcard" :value="userInfo.idcard" v-type="'idcard'" desc="身份证" :readonly="modifyId">
        </div>
         <div class="mui-input-row">
          <label>信用卡</label>
          <input type="text" placeholder="请输入信用卡卡号"  v-model.trim="card_no" v-type="'number'" desc="信用卡卡号" :readonly="modifyId">
        </div>
        <div class="mui-navigate-right phr2" style="position: relative" v-show="!modifyId">
          <div class="mui-input-row">
            <label>开户银行</label>
            <select class="banksel" v-model="selectBank" >
              <option :value="item" v-for="item in bank.list">{{item.name}}</option>
            </select>
          </div>
        </div>
        <div class="mui-input-row" v-show="!modifyId">
          <label>有效期</label>
          <input type="text" placeholder="请输入有效期月/年（例：0527）" v-model="expiry_date" v-type="'number'" desc="有效期" minlength="4" maxlength="4">
        </div>
        <div class="mui-input-row" v-show="!modifyId">
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
          <input type="text" placeholder="请输入预留手机号" v-model="phone" :value="userInfo.phone" v-type="'mobile'" desc="手机号" :readonly="modifyId">
        </div>
        <div class="mui-input-row" id="code">
          <label>短信验证码</label>
          <input type="text" placeholder="请输入验证码" v-model.trim="code" maxlength="6">
          <button type="button" class="mui-btn mui-btn-warning get-code-btn" :disabled="Boolean(outSeconds)" @click="getMsgCode">
            {{outSeconds > 0 ? outSeconds + '秒后重发' : '获取验证码'}}
          </button>
        </div>
      </div>
      <!--要移走的-->
      <div class="mui-input-group" v-show="type === 0">
        <div class="mui-input-row">
          <label>持卡人</label>
          <input type="text" placeholder="请输入姓名" v-model="name" :value="userInfo.real_name">
        </div>
        <div class="mui-input-row">
          <label>身份证</label>
          <input type="text" placeholder="请输入本人身份证号码" v-model="idcard" :value="userInfo.idcard" v-type="'idcard'" desc="身份证">
        </div>
        <div class="mui-input-row">
          <label>储蓄卡号</label>
          <input type="text" placeholder="请输入储蓄卡卡号" v-model.trim="card_no" v-type="'number'" desc="储蓄卡卡号">
        </div>
        <div class="mui-navigate-right phr2" style="position: relative">
          <div class="mui-input-row">
            <label>开户银行</label>
            <select class="banksel" v-model="selectBank">
              <option :value="item" v-for="item in bank.list">{{item.name}}</option>
            </select>
          </div>
        </div>
         <div class="mui-input-row">
          <label>银行支行</label>
          <input type="text" placeholder="请输入支行名称" v-model.trim="card_branch_name" desc="支行名称">
        </div>
        <div class="mui-input-row">
          <label>手机号</label>
          <input type="text" placeholder="请输入预留手机号" v-model="phone" :value="userInfo.phone" v-type="'mobile'" desc="手机号">
        </div>
      </div>
      <div class="explain-word">温馨提示：填写信息时，请区分好储蓄卡和信用卡类型，点击卡片左滑可卸载卡片</div>
      <div class="sk-next">
        <button type="button" id="submit" class="mui-btn mui-btn-primary" :disabled="!valid" @click="submit">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api'
  import rest from '../rest'
  import helper from '../helper'
  import bank from '../../config/bank'

  export default {
    name: 'cardAdd',
    data () {
      return {
        modifyId: this.$route.query.id,
        type: 1,
        outSeconds: 0,
        bank: bank,
        name: null,
        phone: null,
        email: null,
        code: null,
        idcard: null,
        card_no: null,
        selectBank: null,
        cvv: null,
        expiry_date: null,
        bill_day: null,
        repayment_day: null,
        card_branch_name:null,
		fast_pay_key: null,
		fast_pay_id: null,
        card: {}
      }
    },
    computed: {
      title: function () {
        var title = this.modifyId ? '修改': '添加';
        if(this.type === 1){
          return title + '信用卡';
        }else{
          return title + '储蓄卡'
        }
      },
      valid: function () {
        this.type = Number(this.$route.query.type);
        if(this.modifyId){
          return this.bill_day && this.repayment_day;
        }
        if(this.type === 1){
        	if(this.systemInfo.channel.cash === 'channel_fastpay'){
          	return this.name && this.phone && this.idcard && this.card_no && this.selectBank
            	&& this.cvv && this.expiry_date && this.bill_day && this.repayment_day && this.code ;
        		}else{
          	return this.name && this.phone && this.idcard && this.card_no && this.selectBank
            	&& this.cvv && this.expiry_date && this.bill_day && this.repayment_day ;
        	}
        }else{
          return this.card_no && this.selectBank && this.phone && this.card_branch_name;
        }
      }
    },
    created: function () {
      this.idcard = this.userInfo.idcard;
      this.name = this.userInfo.real_name;
      this.phone = this.userInfo.phone; 
      this.fast_pay_key = this.userInfo.fast_pay_key;
      this.fast_pay_id = this.userInfo.fast_pay_id;
    },
    mounted: function () {
       this.initView();
      if(this.modifyId){
        this.loadCardInfo(this.$route.query.id);
      }
    },
    methods: {
      timeout: function () {
        if(this.outSeconds > 0){
          this.outSeconds --;
          setTimeout(this.timeout, 1000);
        }
      },
      loadCardInfo: function (id) {
        rest.get(api.card.detail, {id}).done(res => {
          if(helper.isSuccess(res)){
            var card = res.data;
            this.card_no = card.card_no;
            this.bill_day = card.bill_day;
            this.repayment_day = card.repayment_day;
          }
        });
      },
  getMsgCode: function () {
        if(this.phone.isMobile()){
           if(this.card_no){
           if(this.outSeconds < 1){
		   let { phone, idcard, card_no,fast_pay_key,fast_pay_id} = this.$data;
            var params = {phone, card_no,fast_pay_key,fast_pay_id};
            rest.post(api.card.getFastPayMsgCode, params).done(res =>{
              //console.log(res);
              if(helper.isSuccess(res)){
            	this.userInfo.fast_pay_key = res.data.fast_pay_key ;
              	this.userInfo.fast_pay_id = res.data.fast_pay_id;
                this.outSeconds = 60;
                this.timeout();
                helper.toast('验证短信发送成功');
              }
            });
          }
           }else{
            helper.toast('请先输入卡号');
           }
        }else{
          helper.toast('手机号格式不正确');
        }
      },
  initView: function () {
		 if(this.systemInfo.channel.cash === 'channel_fastpay' && !this.modifyId){
		    document.getElementById("code").style.display="visible";//显示
		 }else{
		   document.getElementById("code").style.display="none";//隐藏
		 }
      },
      submit: function () {
        var nowTime = Number(new Date().format('hhmm'));
        var startTime = this.systemInfo.switch.addCardTimeRange.startTime,
          endTime = this.systemInfo.switch.addCardTimeRange.endTime;
 		document.getElementById("submit").setAttribute("disabled", true);

        if($('.card-add [error]').length > 0){
          helper.toast($('.card-add [error]').eq(0).attr('error'));
        }else if(nowTime < Number(startTime.replace(/[^\d]+/g, '')) || nowTime > Number(endTime.replace(/[^\d]+/g, '')) ){
          helper.toast('添加信用卡时间：{0} - {1}'.format(startTime, endTime));
        }else{
          let {name, phone, idcard, card_no, selectBank, cvv, expiry_date, bill_day, repayment_day, type ,code} = this.$data;
          var data = {name, phone, idcard, card_no, cvv, expiry_date, bill_day, repayment_day, type,code};

          var url = api.card.add;
          if(this.modifyId){
            url = api.card.modify;
            data = {bill_day, repayment_day, modify_id: this.modifyId}
          }else{
            data.card_bank = selectBank.name;
            data.union_num = selectBank.union_num;
          }
          rest.post(url, data).done(res => {
           document.getElementById("submit").removeAttribute("disabled");
            if(helper.isSuccess(res)){
              var msg = '添加成功';
              if(this.modifyId){
                msg = '修改成功';
              }
              helper.toast(msg).done(()=>{
                this.$router.go(-1);
              });
            }
          });
        }
      }
    }
  }
</script>

<style scoped>
  .mui-input-group:after{
    background-color: transparent;
  }
  .explain-word{
    margin: 3px 15px;
  }
</style>
