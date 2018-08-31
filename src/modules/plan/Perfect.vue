<template>
  <div class="plan-create">
    <m-head title="业务开通" left="back"></m-head>
    <div class="perfect-main">
      <div class="mui-input-group">
        <div class="mui-input-row">
          <label>银联钱包账户</label>
          <input type="text" placeholder="银联钱包账户" v-model="username">
        </div>
        <div class="mui-input-row">
          <label>银联钱包密码</label>
          <input type="password" placeholder="银联钱包密码" v-model="password" >
        </div>
        <div class="mui-input-row">
          <label>钱包支付密码</label>
          <input type="password" placeholder="钱包支付密码" v-model="paypassword">
        </div>
      </div>

      <div class="sk-next">
        <button type="button" class="mui-btn mui-btn-primary" :disabled="!username || !password || !paypassword" @click="submit">确认开通</button><br/>
      </div>
      <div class="sk-next">
        <router-link to="/doc/article?id=70" class="mui-btn mui-btn-primary">开通银联钱包账户</router-link>
      </div>
    </div>

  </div>
</template>

<script>
  import api from '../api';
  import rest from '../rest';
  import helper from '../helper';

  export default {
    name: 'planPerfect',
    data () {
      return {
        username: '',
        password: '',
        paypassword: ''
      }
    },
    methods: {
      submit: function () {
        rest.post(api.luodi.addAccountNum, {username: this.username, password: this.password, paypassword: this.paypassword}).done(res=>{
          if(helper.isSuccess(res)){
            this.freshUserInfo(()=>{
              this.$router.go(-1);
            })
          }
        });
      }
    }
  }
</script>
<style scoped>

</style>
