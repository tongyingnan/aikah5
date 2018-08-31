<template>
  <div class="cash-home">
    <m-head title="信用卡收款" left="back"></m-head>

    <!--TODO 背景图片内容有误-->
    <div class="sk-banner">
      <ul>
        <!--/cash/alipay-->
        <li><a href="javascript:void(0)" @click="building"></a> </li>
        <!--/cash/wechat-->
        <li><a href="javascript:void(0)" @click="building"></a></li>
        <li><a href="javascript:void(0)" @click="turn('/cash/unionpay')"></a></li>
        <li><a href="javascript:void(0)" @click="turn('/cash/specialbusiness')"></a></li>
      </ul>
    </div>

    <div class="sk-page margintop">
      <div class="mui-input-row">
        <label>收款金额</label>
        <input type="text" class="mui-input-clear" placeholder="请输入收款金额" v-model="money">
      </div>
    </div>

    <div class="sk-next">
      <!--<p>费率0.5立即到账，单笔2万，单卡5万，升级VIP降费率</p>-->
        <div class="mui-btn mui-btn-primary" @click="turn('/cash/unionpay')">确定</div>

    </div>

  </div>
</template>

<script>
import helper from '../helper'
  export default {
    name: 'cashHome',
    data () {
      return {}
    },
    methods: {
      turn: function (url) {
        if(!this.money){
          helper.alert('请输入收款金额');
        }else{
          this.$router.push(url + '?money='+this.money);
        }
      }
    }
  }
</script>

<style scoped>
</style>
