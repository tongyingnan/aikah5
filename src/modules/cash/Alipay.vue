<template>
  <div class="cash-alipay">
    <m-head title="支付宝扫码" left="back"></m-head>
    <div  style="margin-top: 44px;">
      <img width="100%" src="../../assets/images/ban.jpg" />
    </div>

    <div class="sk-page" style="margin-top: 0px;">
      <div class="mui-input-row">
        <label>收款金额</label>
        <input type="text" class="mui-input-clear" placeholder="请输入收款金额">
      </div>
    </div>

    <div class="get-money-tag" style="padding-bottom: 0px">
      <p>到账储蓄卡 622********656</p>
      <div>
        <div class="mui-input-row mui-checkbox mui-left">
          <label>立即到账T+0（单笔2000，单天1万）</label>
          <input name="checkbox" value="Item 1" type="checkbox" >
        </div>
      </div>
    </div>


    <div class="sk-next" style="margin-top: 0px;">
      <div class="mui-btn mui-btn-primary">生成二维码</div>
    </div>

    <div class="ewm">
      <img width="50%" src="../../assets/images/002.png" />
      <p>长按二维码保存，两部设备扫码成功率更高</p>
      <p>支付由中国人民财产保险公司承担</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cashAlipay',
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
