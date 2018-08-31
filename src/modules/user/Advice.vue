<template>
  <div class="user-setting">
    <m-head title="反馈建议" left="back"></m-head>
    <div class="mui-content">
      <h5 class="p-title">您有什么问题或者意见相对我们说？</h5>
      <div class="yjfk">
        <div class="fk-text">
        <textarea placeholder="请输入你的建议">

        </textarea>
        </div>
        <p>请详细描述您遇到的问题，有助于我们快速评估并解决问题或者留下你宝贵的意见，我们会认真评估</p>
      </div>

    </div>

    <div class="sk-next">
      <a class="mui-btn mui-btn-primary">提交</a>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'userAdvice',
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
</style>
