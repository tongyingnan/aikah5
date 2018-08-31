<template>
  <div class="regist bg-white">
    <m-head title="注册" left="back"></m-head>

    <div class="get-money">
      <div class="mui-input-group">
        <div class="mui-input-row">
          <label>手机号</label>
          <input type="text" placeholder="请输入手机号" v-model.trim="phone" name="phone">
        </div>
        <div class="mui-input-row">
          <label>验证码</label>
          <input type="text" placeholder="请输入验证码" v-model.trim="code" name="code" maxlength="6">
          <button class="mui-btn mui-btn-warning get-code-btn" :disabled="Boolean(outSeconds)" @click="getMsgCode">{{outSeconds > 0 ? outSeconds + '秒后重发' : '获取验证码'}}</button>
        </div>
        <div class="mui-input-row">
          <label>设置密码</label>
          <input type="password" class="mui-input-password" placeholder="请输入密码" v-model="password" name="password">
        </div>
        <div class="mui-input-row">
          <label>确认密码</label>
          <input type="password" class="mui-input-password" placeholder="请再次输入密码" v-model="rpassword">
        </div>
        <div class="mui-input-row">
          <label>邀请码</label>
          <input type="text" class="mui-input-clear" placeholder="请输入邀请码" v-model.trim="referral_code" name="referral_code">
        </div>
      </div>
      <div class="get-money-tag">
        <div class="mui-input-row mui-checkbox mui-left">
          <input value="1" type="checkbox" v-model="agree">
          <label>我已阅读</label>
        </div>
        <router-link to="/doc/article?id=12" id="xieyi">《用户服务协议》</router-link>
      </div>
      <div class="sk-next">
        <button disabled class="mui-btn mui-btn-primary" :disabled="!Boolean(phone && code && password && rpassword && password === rpassword && agree)"
                @click="nextStep">{{referral_code?'注册并下载APP':'注册'}}</button>
      </div>
      <div class="sk-next" v-if="referral_code">
        <a :href="'http://apk.akzngj.com?app='+this.appInfo.package">
          <button class="mui-btn mui-btn-primary">已注册，直接下载APP</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import rest from '../rest';
  import helper from '../helper';
  import api from '../api';
  export default {
    name: 'regist',
    data () {
      return {
        outSeconds: 0,
        phone: '',
        code: '',
        password : '',
        rpassword: '',
        referral_code: this.$route.query.s,
        agree: 0
      }
    },
    methods:{
      timeout: function () {
        if(this.outSeconds > 0){
          this.outSeconds --;
          setTimeout(this.timeout, 1000);
        }
      },
      getMsgCode: function () {
        if(this.phone.isMobile()){
          if(this.outSeconds < 1){
            rest.get(api.user.checkPhone, {phone: this.phone}).done(res => {
              if(helper.isSuccess(res)){
                rest.get(api.sms.code, {phone: this.phone, type: 'regist'}).done(res => {
                  if(helper.isSuccess(res)){
                    this.outSeconds = 60;
                    this.timeout()
                  }
                });
              }
            });
          }
        }else{
          helper.toast('手机号格式不正确');
        }
      },
      nextStep: function () {
        if(this.phone && this.code && this.password){
          var data = {
            phone: this.phone,
            password: this.password,
            code: this.code,
            referral_code: this.referral_code
          }
          rest.post(api.user.regist, data).done(res => {
            if(helper.isSuccess(res)){
              if(this.referral_code){
                mui.confirm('', '注册成功！下载'+this.appInfo.name+'APP登录使用', ['立即下载', '取消'], e=>{
                  if(e.index){
                    location.hash = '/user/login';
                  }else{
                    location.href = 'http://apk.akzngj.com?app='+this.appInfo.package;
                  }
                });
              }else{
                helper.toast('注册成功！').done(()=>{
                  location.hash = '/user/login';
                });
              }
            }
          });
        }
      }
    }
  }

</script>
<style scoped>
  #xieyi{
    font-size: 12px;
    margin-left: 75px;
    margin-top: -31px;
    position: absolute;
  }
</style>
