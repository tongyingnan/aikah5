<template>
  <div class="bg-white percent-bg">
    <m-head title="申请结果" left="back"> </m-head>
    <div class="sucsess-icon"><img src="../../assets/images/lost-img.png"></div>
    <div class="success-word lost-word">
      <span>很抱歉,申请失败</span>
      <em>您暂时无法使用帮你还</em>
      <button class="mui-btn mui-btn-primary">完成</button>
    </div>
  </div>

</template>

<script>

  export default {
    name: 'loanLost',
    data () {
      return {

      }
    },
    mounted: function () {

    },
    methods: {

    }
  }
</script>
<style scoped>
  .index-box{
    background-color: transparent;
  }
</style>
