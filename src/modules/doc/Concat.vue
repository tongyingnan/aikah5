<template>
  <div class="user-setting">
    <m-head title="客服中心" left="back"></m-head>
    <div class="mui-content">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right">
            <div class="mui-input-row">
              <label class="w65">招商热线</label>
              <input class="w35" type="text" placeholder="" value="400-8888-888" disabled>
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right">
            <div class="mui-input-row">
              <label class="w65">客服热线</label>
              <input class="w35" type="text" disabled value="0571-8888888" placeholder="">
            </div>
          </div>
        </li>


        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right">
            <div class="mui-input-row">
              <label class="w65">工作时间</label>
              <input class="w35" type="text" disabled value="8：00-22：00" placeholder="" />
            </div>
          </div>
        </li>

      </ul>

      <ul class="mui-table-view">
        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right">
            <div class="mui-input-row">
              <label class="w65">1.微信号：</label>
              <input class="w35" type="text" placeholder="" value="1322098738" disabled>
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right">
            <div class="mui-input-row">
              <label class="w65">2.QQ号：</label>
              <input class="w35" type="text" disabled value="1322098738" placeholder="">
            </div>
          </div>
        </li>


        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right">
            <div class="mui-input-row">
              <label class="w75">3.打开微信，点击右上角"+"添加好友：</label>
              <input class="w25" type="text" disabled  placeholder="" />
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right">
            <div class="mui-input-row">
              <label class="w75">4.搜索框里面粘贴微信号与客服沟通：</label>
              <input class="w25" type="text" disabled  placeholder="" />
            </div>
          </div>
        </li>


      </ul>
      <div class="copy">
        <div class="fl">复制微信号</div>
        <div class="fl">复制QQ号</div>
        <p class="clear"></p>
      </div>
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
