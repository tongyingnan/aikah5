<template>
  <div class="card-import-mail">
    <m-head title="邮箱导入" left="back"></m-head>
    <div class="list">
      <div class="item item-input">
        <span class="input-label">账号</span>
        <input type="text" placeholder="输入账单邮箱"/>
      </div>
      <div class="item item-input">
        <span class="input-label">密码</span>
        <input type="text" placeholder="输入邮箱密码"/>
      </div>
    </div>
    <p>我们将为您开启账单智能收取</p>
    <p>同意<router-link to="/doc/article?id=11">《账单邮箱服务协议》</router-link></p>

    <div class="button button-full button-positive">开始导入账单</div>
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
p{
  padding: 0 16px;
}
</style>
