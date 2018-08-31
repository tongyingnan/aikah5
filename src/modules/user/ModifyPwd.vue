<template>
  <div class="user-modifypwd">
    <m-head title="修改登录密码" left="back"></m-head>

    <div class="get-money">
      <div class="mui-input-group">
        <div class="mui-input-row">
          <label>旧密码</label>
          <input type="password" placeholder="请输入当前密码" class="mui-input-password" v-model="password">
        </div>
        <div class="mui-input-row">
          <label>新密码</label>
          <input type="password" placeholder="请输入新密码" class="mui-input-password" v-model="npassword">
        </div>
        <div class="mui-input-row">
          <label>新密码确认</label>
          <input type="password" class="mui-input-password" placeholder="请再次输入新密码" v-model="rnpassword" @change="valid">
        </div>

      </div>
      <div class="sk-next">
        <div>
          <p class="fl"></p>
          <p class="fr"><router-link to="/user/forgetpwd">忘记密码</router-link> </p>
        </div>
      </div>
      <div class="sk-next">
        <button type="button" :disabled="!password || !npassword || npassword !== rnpassword" class="mui-btn mui-btn-primary" @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import rest from '../rest'
  import helper from '../helper'
  import api from '../api'
  export default {
    name: 'userModifyPwd',
    data () {
      return {
        password: '',
        npassword: '',
        rnpassword: ''
      }
    },
    methods: {
      valid: function () {
        if(this.npassword !== this.rnpassword){
          helper.toast('两次输入密码不一致');
        }
      },
      submit: function () {
        rest.post(api.user.modifypwd, {
          password: this.password,
          npassword: this.npassword
        }).done(res => {
          if(helper.isSuccess(res)){
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
