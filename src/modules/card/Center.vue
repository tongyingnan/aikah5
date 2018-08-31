<template>
  <div class="card-Home ">
    <m-head title="我的银行卡" left="back">
    </m-head>
    <!--更改-->
    <div class="main_card card-help bg-white">
      <div class="card-f-bg">
        <img src="../../assets/images/agent.png" alt="">
        <div id="card-f-login">
          <form id="loginForm" class="form-horizontal">
            <input type="hidden" name="mobileLogin" value="true">
            <div class="form-group">
              <input type="text" placeholder="请输入手机号" name="username" id="user_phone" class="user-name">
              <label><img src="../../assets/images/icon-person.png" alt="" class="user-img"></label>
            </div>
            <div class="form-group">
              <input type="password" placeholder="请输入密码" name="password" id="user_pwd" class="user-pwd">
              <label><img src="../../assets/images/icon-pwd.png" alt="" class="pwd-img"></label>
            </div>
          </form>
          <div class="btn-submit">
            <span>登录</span>
          </div>
        </div>
      </div>
    </div>
    <!--更改-->
    <!--底部导航-->
    <nav  class="mui-bar mui-bar-tab">
      <router-link  class="mui-tab-item-p " to="/card/loan">
        <span class="mui-icon mui-icon-person" ></span>
        <span  class="mui-tab-label">网贷</span>
      </router-link>
      <router-link  id="cardList" class="mui-tab-item-p" to="/card/apply">
        <span class="mui-icon  iconfont icon-huankuan"></span>
        <span  class="mui-tab-label">信用卡</span>
      </router-link>
      <router-link class="mui-tab-item-p  mui-active " to="/card/center">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">个人中心</span>
      </router-link>
    </nav>
    <!--底部导航-->
  </div>
</template>

<script>
  export default {
    name: 'center',
    data () {
      return {

      }
    },
    mounted: function () {

    },
    methods: {

      },

  }
</script >
<style scoped>
  .card-help{
    margin-top:44px;
    margin-bottom:79px;
  }
  body{
    background-color: #fff;
  }
</style>
