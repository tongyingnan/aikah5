<template>
  <div class="user-setting">
    <m-head title="商务合作" left="back"></m-head>
    <div class="mui-page-content" style="margin-top: 44px;">

      <div class="mui-input-group">
        <div class="mui-input-row">
          <label>联系人</label>
          <input type="text" placeholder="我的联系人">
        </div>
        <div class="mui-input-row">
          <label>联系电话</label>
          <input type="text" placeholder="联系电话">
        </div>
        <div class="mui-input-row">
          <label>合作类型</label>
          <input type="text" class="mui-input-clear" placeholder="合作类型">
        </div>
        <div class="mui-input-row">
          <label>公司网址</label>
          <input type="text" class="mui-input-clear" placeholder="公司网址">
        </div>
      </div>
      <div id="feedback" class="mui-page feedback">
        <div class="row mui-input-row">
          <textarea id='question' class="mui-input-clear question" placeholder="项目描述..."></textarea>
        </div>
      </div>
    </div>



    <div class="sk-next">
      <button type="button" class="mui-btn mui-btn-primary">下一步</button>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'docConcat',
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
