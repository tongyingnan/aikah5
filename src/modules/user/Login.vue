<template>
  <div class="regist bg-white user-login">
    <m-head title="登录"></m-head>

    <div class="get-money">
      <img class="logo" :src="'static/images/logo/'+appInfo.package+'.png'"/>
      <div class="mui-input-group">
        <div class="mui-input-row">
          <label><img src="../../assets/images/login_img1.png" class="icon icon-xs"></label>
          <input type="text" placeholder="请输入账号" v-model.trim="username"/>
        </div>
        <div class="mui-input-row">
          <label><img src="../../assets/images/login_img2.png" class="icon icon-xs"></label>
          <input type="password" class="mui-input-password" placeholder="请输入密码" v-model="password"/>
        </div>
        <div class="mui-input-row" style="display: none;">
          <label>验证码</label>
          <input type="text" placeholder="请输入验证码" v-model.trim="code" maxlength="6"/>
          <button type="button" id="btnBtn" class="mui-btn mui-btn-warning get-code-btn">获取验证码</button>
        </div>

      </div>
      <div class="sk-next">
        <button class="mui-btn mui-btn-primary" :disabled="!Boolean(username && password)" @click="login">登录</button>
        <router-link to="/user/regist" class="mui-btn mui-btn-outlined mui-btn-warning" style="margin: 10px auto">注册</router-link>
        <div>
          <p class="fl mui-input-row mui-checkbox mui-left">
            <input class="login-che" type="checkbox" v-model="hold" v-bind:true-value="'on'" v-bind:false-value="'off'"/>
            <label>记住密码</label>
          </p>
          <p class="fr sk-wj"><router-link to="/user/forgetpwd">忘记密码</router-link> </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import rest from '../rest';
  import helper from '../helper';
  import api from '../api';
  import {isLogin} from'../util'
  export default {
    name: 'login',
    data () {
      return {
        outSeconds: 0,
        username: '',
        code: '',
        password : '',
        hold: helper.get('hold') || 'on'
      }
    },
    mounted: function () {
      this.username = helper.get('username') || '';
      if(this.$route.query.exit){
        this.$store.dispatch('clearVuex');
      }else{
        if(isLogin()){
          if(this.hold === 'on'){
            this.$router.replace('/card');
          }else{
            this.$store.dispatch('clearVuex');
          }
        }
      }
      // 清楚缓存的卡片列表
      helper.remove(['cardList']);
    },
    methods:{
      timeout: function () {
        if(this.outSeconds > 0){
          this.outSeconds --;
          setTimeout(this.timeout, 1000);
        }
      },
      getMsgCode: function () {
        if(this.outSeconds < 1){
          rest.get(api.sms.code, {phone: this.phone, type: 'regist'}).done(function (res) {
            if(helper.isSuccess(res)){
              this.outSeconds = 60;
              this.timeout()
            }
          });
        }
      },
      exit: function () {
        this.$store.dispatch('clearVuex');
      },
      login: function () {
        rest.post(api.user.login, {username: this.username, password: this.password}).done(res => {

          if(helper.isSuccess(res)){
            // 清除登录状态
            this.$store.dispatch('clearVuex');
            // 保存token
            this.$store.dispatch('setUserInfo', res.data);
            this.userInfo = res.data;
            helper.set({username: this.userInfo.username});
            helper.set({hold: this.hold});
            this.$router.replace('/card');
          }
        });
      }
    }
  }
</script>

<style scoped>
  .regist{
    background: url("../../assets/images/banner_login.jpg");
  }
  .regist .button-small{
    position: absolute;
    right: 16px;
    bottom: 6px;
  }
  .password-tip{
    text-align: center;
    line-height: 100px;
    color: #9e9e9e;
  }
  .xieyi{
    position: absolute;
    text-align: center;
    width:100%;
    bottom: 20px;
    color: #9e9e9e;
    font-size: 12px;
  }
  .xieyi a{
    text-decoration: none;
  }
  .mui-input-row label{
    text-align: center;
  }
  .user-login  .mui-input-group .mui-input-row{
    height:46px;
    width: 90%;
    margin: 0 auto;
  }
  .mui-input-group:after{
    background-color: transparent;
  }
  .mui-input-group .mui-input-row:after{
    left: 0;
  }
</style>
