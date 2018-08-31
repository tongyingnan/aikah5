<template>
  <div class="card-import">
    <m-head title="导入账单" left="back"></m-head>
    <div class="list">
      <!--<div class="item">
        短信账单
        <p>一次授权，智能分析各类短信账单</p>
      </div>-->
      <router-link to="/card/importmail" class="item">
        邮箱导入
        <p>绑定账单收取邮箱，一键获取信用卡账单</p>
      </router-link>
      <router-link to="/card/add" class="item">
        手输账单
        <p>没有邮箱、网银账单？请用手动输入账单</p>
      </router-link>
      <div class="item item-divider">网银导入</div>
      <div class="weui-grids">
        <div class="weui-grid js_grid">
          <p class="weui-grid__label">交通银行</p>
        </div>
        <div class="weui-grid js_grid">
          <p class="weui-grid__label">招商银行</p>
        </div>
        <div class="weui-grid js_grid">
          <p class="weui-grid__label">中信银行</p>
        </div>
        <div class="weui-grid js_grid">
          <p class="weui-grid__label">广发银行</p>
        </div>
        <div class="weui-grid js_grid">
          <p class="weui-grid__label">民生银行</p>
        </div>
        <div class="weui-grid js_grid">
          <p class="weui-grid__label">浦发银行</p>
        </div>
        <div class="weui-grid js_grid">
          <p class="weui-grid__label">中国银行</p>
        </div>
        <div class="weui-grid js_grid">
          <p class="weui-grid__label">兴业银行</p>
        </div>
        <div class="weui-grid js_grid">
          <p class="weui-grid__label">农业银行</p>
        </div>
        <div class="weui-grid js_grid">
          <p class="weui-grid__label">工商银行</p>
        </div>
        <div class="weui-grid js_grid">
          <p class="weui-grid__label">广大银行</p>
        </div>
        <div class="weui-grid js_grid">
          <p class="weui-grid__label">邮政银行</p>
        </div>
        <div class="weui-grid js_grid">
          <p class="weui-grid__label">华夏银行</p>
        </div>
        <div class="weui-grid js_grid">
          <p class="weui-grid__label">北京银行</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cardImport',
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
