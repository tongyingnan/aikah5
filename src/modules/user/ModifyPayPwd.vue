<template>
  <div class="user-modifypaypwd">
    <m-head :title="userInfo.hasPayPwd ? '修改支付密码':'设置支付密码'" left="back"></m-head>
    <div class="get-money">
      <div class="mui-input-group">
        <div class="mui-input-row" v-show="userInfo.hasPayPwd">
          <label>旧密码</label>
          <input type="password" placeholder="请输入当前6位支付密码" class="mui-input-password" v-model="password_pay">
        </div>
        <div class="mui-input-row">
          <label>新密码</label>
          <input type="password" placeholder="请输入6位数字支付密码" class="mui-input-password" v-model="npassword_pay">
        </div>
        <div class="mui-input-row">
          <label>新密码确认</label>
          <input type="password" class="mui-input-password" placeholder="请再次输入新支付密码" v-model="rnpassword_pay" @change="valid">
        </div>

      </div>
      <!--TODO 忘记支付密码-->
      <!--<div class="sk-next">
        <div>
          <p class="fl"></p>
          <p class="fr"><router-link to="/user/forgetpwd">忘记密码</router-link> </p>
        </div>
      </div>-->
      <div class="sk-next">
        <button type="button" class="mui-btn mui-btn-primary" :disabled="(userInfo.hasPayPwd && !password_pay) || !npassword_pay || npassword_pay !== rnpassword_pay" @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
  import rest from '../rest'
  import helper from '../helper'
  import api from '../api'
  export default {
    name: 'userModifyPayPwd',
    data () {
      return {
        password_pay: '',
        npassword_pay: '',
        rnpassword_pay: ''
      }
    },
    methods: {
      valid: function () {
        if(this.npassword_pay !== this.rnpassword_pay){
          helper.toast('两次输入密码不一致');
        }
      },
      submit: function () {
        rest.post(api.user.modifypwd, {
          password_pay: this.password_pay,
          npassword_pay: this.npassword_pay
        }).done(res => {
          if(helper.isSuccess(res)){
            this.$store.dispatch('setUserInfo', res.data);
            helper.toast('修改成功').done(() => {
              this.$router.go(-2);
            });
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
