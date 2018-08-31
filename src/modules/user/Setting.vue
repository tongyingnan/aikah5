<template>
  <div class="user-setting">
    <m-head title="个人设置" left="back"></m-head>

    <div class="mui-page-content account">
      <ul class="mui-table-view">

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right">
            <router-link to="/user/modifypaypwd">
              <div class="mui-input-row">
                <label>设置支付密码</label>
              </div>
            </router-link>
          </div>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right">
            <router-link to="/user/modifypwd">
              <div class="mui-input-row">
                <label>修改登录密码</label>
              </div>
            </router-link>
          </div>
        </li>


        <!--<li class="mui-table-view-cell padding10">-->
          <!--<div class="mui-navigate-right">-->
            <!--<div class="mui-input-row" @click="building">-->
              <!--<label>登录手势密码</label>-->
              <!--<div class="mui-switch mui-switch-mini">-->
                <!--<div class="mui-switch-handle"></div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</li>-->



        <!--<li class="mui-table-view-cell padding10">-->
          <!--<div class="mui-navigate-right">-->
            <!--<div class="mui-input-row" @click="building">-->
              <!--<label>修改手势密码</label>-->
            <!--</div>-->
          <!--</div>-->
        <!--</li>-->


        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right">
            <div class="mui-input-row" @click="exit">
              <label>安全退出</label>
            </div>
          </div>
        </li>

      </ul>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'userSetting',
    data () {
      return {
        userInfo: {}
      }
    },
    methods: {
      exit: function () {
        this.$store.dispatch('clearVuex')
        this.$router.replace('/user/login');
      },
      developing: function () {
        helper.toast('升级中，敬请期待！');
      }
    }
  }
</script>

<style scoped>
  .mui-input-row label{
    width: 48%;
  }
</style>
