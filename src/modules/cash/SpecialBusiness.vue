<template>
  <div class="cash-specialbusiness">
    <m-head title="特约商户" left="back"></m-head>

    <div class="get-money">
      <div class="mui-input-group">
        <div class="mui-input-row">
          <label>交易金额</label>
          <input type="text" placeholder="请输入交易金额">
        </div>
        <div class="mui-input-row">
          <label>信用卡卡号</label>
          <input type="text" class="mui-input-clear" placeholder="请输入信用卡卡号">
        </div>
        <div class="mui-input-row">
          <label>信用卡有限期</label>
          <input type="text" placeholder="请输入信用卡有限期">
        </div>
        <div class="mui-input-row">
          <label>持卡人CVN2</label>
          <input type="text" class="mui-input-clear" placeholder="请输入持卡人CVN2">
        </div>

        <div class="mui-input-row">
          <label>持卡人手机号</label>
          <input type="text" class="mui-input-clear" placeholder="请输入持卡人手机号">
        </div>
        <div class="mui-input-row">
          <label>验证码</label>
          <input type="text" placeholder="请输入验证码" maxlength="6">
          <button type="button" id="btnBtn" class="mui-btn mui-btn-warning get-code-btn">
            获取验证码
          </button>
        </div>
        <div class="mui-input-row">
          <label>手续费</label>
          <input type="text" class="mui-input-clear" placeholder="请输入手续费">
        </div>
      </div>
      <div class="get-money-tag">
        <p>到账储蓄卡 622********656</p>
        <div>
          <div class="mui-input-row mui-checkbox mui-left">
            <label>立即到账T+0（单卡单天限额10万，封顶35元）</label>
            <input name="checkbox" value="Item 1" type="checkbox" >
          </div>
        </div>
      </div>
      <div class="sk-next">
        <router-link to="/cash/success">
          <div class="mui-btn mui-btn-primary">确认支付</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cashSpecialBusiness',
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
