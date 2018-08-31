<template>
  <div class="market-home">
    <m-head title="商城"></m-head>

    <div class="mui-content">
      <img class="mell" src="../../assets/images/mell_02.jpg" />
    </div>

    <m-tabs tab="3"></m-tabs>
  </div>
</template>

<script>

  // TODO mui插件的初始化问题
  export default {
    name: 'marketHome',
    data () {
      return {}
    },
    mounted:function () {
      $('body').css('background-color', '#efeff4');
    },
    destroyed:function () {
      $('body').css('background-color', '#fff');
    },
  }
</script>

<style scoped>
  body{
    background-color: #efeff4;
  }
</style>
