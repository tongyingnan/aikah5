<template>
  <div class="user-setting">
    <m-head title="帮助中心" left="back"></m-head>

    <div class="mui-content">
      <h5 class="p-title">使用攻略</h5>
      <ul class="help">
        <li>
          <router-link to="/doc/article?id=13"></router-link>
        </li>
        <li>
          <router-link to="/doc/article?id=14"></router-link>
        </li>
        <li>
          <router-link to="/doc/article?id=15"></router-link>
        </li>
      </ul>
      <div class="clear"></div>
      <h5 class="p-title">使用攻略</h5>
      <ul class="mui-table-view">

        <li class="mui-table-view-cell padding10" @click="$router.push('/doc/article?id=16')">
          <div class="mui-navigate-right">
            <div class="mui-input-row">
              <label class="w65">如何使用{{appInfo.subname}}借款？</label>
              <input class="w35" type="text" placeholder="" value="" disabled>
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10" @click="$router.push('/doc/article?id=17')">
          <div class="mui-navigate-right">
            <div class="mui-input-row">
              <label class="w65">如何还款</label>
              <input class="w35" type="text" disabled placeholder="">
            </div>
          </div>
        </li>


        <li class="mui-table-view-cell padding10" @click="$router.push('/doc/article?id=18')">
          <div class="mui-navigate-right">
            <div class="mui-input-row">
              <label class="w65">借款利息是多少</label>
              <input class="w35" type="text" disabled placeholder="" />
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10" @click="$router.push('/doc/article?id=19')">
          <div class="mui-navigate-right">
            <div class="mui-input-row">
              <label class="w65">支持哪些银行的信用卡</label>
              <input class="w35" type="text" disabled placeholder="" />
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10" @click="$router.push('/doc/article?id=20')">
          <div class="mui-navigate-right">
            <div class="mui-input-row">
              <label class="w65">申请成功后额度会一直有效吗？</label>
              <input class="w35" type="text" disabled placeholder="" />
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10" @click="$router.push('/doc/article?id=21')">
          <div class="mui-navigate-right">
            <div class="mui-input-row">
              <label class="w65">如何提升{{appInfo.subname}}额度？</label>
              <input class="w35" type="text" disabled placeholder="" />
            </div>
          </div>
        </li>

      </ul>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'userHelp',
    data () {
      return {}
    }
  }
</script>

<style scoped>

  .icon{
    color: #ef473a;
  }
  .exit{
    text-align: center;
  }
  .mui-input-row input.w35{
    width: 6%;
  }
</style>
