<template>
  <div class="card-add">
    <m-head :title="title" left="back">
      <router-link slot="right" to="/card/explain" class="mui-pull-right">注意事项</router-link>
    </m-head>
    <div class="get-money">
      <div class="mui-input-group" >
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
      <div class="sk-next">
        <button type="button" class="mui-btn mui-btn-primary" :disabled="!valid" @click="submit">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api'
  import rest from '../rest'
  import helper from '../helper'
  import bank from '../../config/bank'
  import store from './../../modules/vuex/store.js'
  export default {
    name: 'cardAdd',
    data () {
      return {
        bank: bank,
        name: null,
        phone: null,
        idcard: null,
        card_no: null,
        card_branch_name:null,
        selectBank: null,
        card: {}
      }
    },
    store: store,
    computed: {
      title: function () {
          var title = '修改储蓄卡';
          return title;
      },
      valid: function () {
        return this.name &&this.idcard&& this.card_no && this.selectBank && this.phone && this.card_branch_name;
      }
    },
    created: function () {
      this.idcard = this.userInfo.idcard;
      this.name = this.userInfo.real_name;
      this.phone = this.userInfo.phone; 
    },
    mounted: function () {
        this.loadCardInfo(this.userInfo.id);
    },
    methods: {
      loadCardInfo: function (id) {
        rest.get(api.card.detailByUserId, {id}).done(res => {
          if(helper.isSuccess(res)){
            this.card = res.data;
            this.card_no = this.card.card_no;
          }
        });
      },
      submit: function () {
        let {name, phone, idcard, card_no, card_branch_name,selectBank} = this.$data;
            this.card.name=name;
            this.card.phone= phone;
            this.card.idcard=idcard;
            this.card.card_no= card_no;
            this.card.card_branch_name =card_branch_name;
            this.card.card_bank = selectBank.name;
            this.card.union_num = selectBank.union_num;
          var url = api.card.modifySavinsCard;
          //console.log(url);
          rest.post(url, this.card).done(res => {
            if(helper.isSuccess(res)){
              var msg = '修改成功';
              this.userInfo.fast_pay_key = res.data.fast_pay_key ;
              this.userInfo.fast_pay_id = res.data.fast_pay_id;
              this.userInfo.card_branch_name = res.data.card_branch_name;
              //console.log(this.userInfo);
              helper.toast(msg).done(()=>{
                if(this.userInfo.is_need_rebind == 1){
                   this.$router.push("/card/modifyCreditCard?ifFromSavings=" + 1);
                }else{
                   this.$router.go(-1);
                }
              });
            }
          });
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
