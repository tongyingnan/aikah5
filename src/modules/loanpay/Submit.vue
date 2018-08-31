<template>
  <div class=" back-submit">
   <m-head title="提交资料" left="back"></m-head>
    <div class="repay">
      <div class="back-submit-form">
        <div class="mui-input-row">
          <span class="submit-span">主要联系人信息1（需直系亲属）</span>
        </div>
        <div class="mui-input-row">
          <label>关系</label>
          <a class="dataTime-a mui-navigate-right">
            <select class="submit-select">
              <option>请选择联系人关系</option>
              <option>父亲</option>
              <option>母亲</option>
              <option>儿子</option>
            </select>
          </a>
        </div>
        <div class="mui-input-row">
          <label>联系人</label>
          <input type="text" class="mui-input-clear" placeholder="请从通讯录选取" >
        </div>
      </div>
      <div class="back-submit-form">
        <div class="mui-input-row">
          <span class="submit-span">主要联系人信息2（需直系亲属）</span>
        </div>
        <div class="mui-input-row">
          <label>关系</label>
          <a class="dataTime-a mui-navigate-right">
            <select class="submit-select">
              <option>请选择联系人关系</option>
              <option>父亲</option>
              <option>母亲</option>
              <option>儿子</option>
            </select>
          </a>
        </div>
        <div class="mui-input-row">
          <label>联系人</label>
          <input type="text" class="mui-input-clear" placeholder="请从通讯录选取" >
        </div>
      </div>
    </div>
    <div class="repay-btn-big">
      <button type="button" disabled="disabled" class="mui-btn mui-btn-primary mui-btn-block">提交</button>
    </div>
  </div>

</template>

<script>

  export default {
    name: 'Submit',
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

</style>
