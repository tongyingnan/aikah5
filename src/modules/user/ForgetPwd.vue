<template>
  <div class="user-forgetpwd user_one">
    <m-head title="忘记密码" left="back"></m-head>

    <div class="get-money">
      <div class="mui-input-group">
        <div class="mui-input-row">
          <label>手机号</label>
          <input type="text" placeholder="请输入手机号" v-model.trim="phone">
        </div>
        <div class="mui-input-row">
          <label>验证码</label>
          <input type="text" placeholder="请输入验证码" v-model.trim="code" maxlength="6">
          <button type="button" class="mui-btn mui-btn-warning get-code-btn"
                  :disabled="Boolean(outSeconds)"
                  @click="getMsgCode">{{outSeconds > 0 ? outSeconds + '秒后重发' : '获取验证码'}}</button>
        </div>
        <div class="mui-input-row">
          <label>新密码</label>
          <input type="password" class="mui-input-password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="mui-input-row">
          <label>确认密码</label>
          <input type="password" class="mui-input-password" placeholder="请再次输入密码" v-model="rpassword">
        </div>

      </div>
      <div class="sk-next">
        <button type="button" :disabled="!passed" @click="submit" class="mui-btn mui-btn-primary">确认修改</button>
      </div>
    </div>

  </div>
</template>

<script>
  import rest from '../rest';
  import helper from '../helper';
  import api from '../api';

  export default {
    name: 'userForgetPwd',
    data () {
      return {
        outSeconds: 0,
        phone: '',
        code: '',
        password: '',
        rpassword: ''
      }
    },
    computed: {
      passed: function () {
        return this.phone && this.phone.isMobile() && this.code && this.password && this.rpassword === this.password;
      }
    },
    methods: {
      timeout: function () {
        if(this.outSeconds > 0){
          this.outSeconds --;
          setTimeout(this.timeout, 1000);
        }
      },
      getMsgCode: function () {
        if(this.phone.isMobile()){
          if(this.outSeconds < 1){
            rest.get(api.sms.code, {phone: this.phone, type: 'resetpwd'}).done(res => {
              if(helper.isSuccess(res)){
                this.outSeconds = 60;
                this.timeout()
              }
            });
          }
        }else{
          helper.toast('手机号格式不正确');
        }
      },
      submit: function () {
        rest.post(api.user.resetpwd, {
          phone: this.phone,
          code: this.code,
          password: this.password
        }).done(res => {
          if(helper.isSuccess(res)){
            helper.toast('密码修改成功!').done(()=>{
              this.$router.go(-1);
            });

          }
        });
      }
    }
  }
</script>
