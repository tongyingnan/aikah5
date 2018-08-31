<template>
  <div class="balance-home">
    <m-head title="账户余额" left="back"></m-head>
    <div class="mui-content">
      <div class="my_yue_all clearfix">
        <!--<div class="my_yue">
          <p class="my_yu_hi">账户余额（元）</p>
          <p class="my_yu_lo">{{renderMoney(userInfo.money)}}</p>
        </div>-->
        <div class="my_yue">
          <p class="my_yu_hi">可提现余额（元）</p>
          <p class="my_yu_lo">{{renderMoney(userInfo.money)}}</p>
        </div>
      </div>
      <ul class="mui-table-view my_yue_ul">
        <!--<li class="mui-table-view-cell">-->
          <!--<router-link to="/balance/recharge" class="mui-navigate-right">-->
            <!--<div class="img_kuanga">-->
              <!--<img src="../../assets/images/ka.png">-->
            <!--</div>-->
            <!--<p>&nbsp;&nbsp;充值</p>-->
          <!--</router-link>-->
          <!--<div class="line"></div>-->
        <!--</li>-->
        <li class="mui-table-view-cell">
          <router-link to="/cash/draw" class="mui-navigate-right">
            <div class="img_kuanga">
              <img src="../../assets/images/qianbao.png">
            </div>
            <p>&nbsp;&nbsp;提现</p>
          </router-link>
          <div class="line"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'balanceHome',
    data () {
      return {}
    }
  }
</script>

<style scoped>
  .list .item{
    font-size: 14px;
  }
  .item h1{
    font-size: 30px;
  }
</style>
