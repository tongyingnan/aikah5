<template>
  <div class="card-help">
    <m-head title="我的银行卡" left="back"></m-head>
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
        <label>卡号</label>
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
        <label>手机号</label>
        <input type="text" placeholder="请输入预留手机号" v-model="phone" :value="userInfo.phone" v-type="'mobile'" desc="手机号">
      </div>
    </div>
    <div class="sk-next">
      <button type="button" class="mui-btn mui-btn-primary" :disabled="!valid" @click="submit">确认</button>
    </div>
  </div>
</template>
<script>
  export default{
    name: '',
    data(){
      return {};
    },
    mounted: function () {

    }
  }
</script>
<style scoped>

</style>
