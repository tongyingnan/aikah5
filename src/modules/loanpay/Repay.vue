<template>
  <div class=" back-submit">
    <m-head title="新增还款申请" left="back"></m-head>
    <div class="repay">
      <div class="back-repay-img">
        <img src="../../assets/images/back-repay-img.png" class="back-icon">
        <span>授权以下银行卡使用帮你还服务</span>
      </div>
      <ul class="mui-table-view back-ul">
        <li class="mui-table-view-cell clearfix">
          <dl class=" clearfix">
            <dt class="fl"><img src="../../assets/images/icon4.png"></dt>
            <dd class="fl">
              <span>华夏银行</span>
              <span>舒蝶名|尾号5944</span>
            </dd>
          </dl>
        </li>
      </ul>
      <div class="back-submit-form">
        <div class="mui-input-row">
          <label>还款金额</label>
          <input type="text" class="mui-input-clear" placeholder="请输入预约还款金额" >
        </div>
        <div class="mui-input-row">
          <label>手续费</label>
          <input type="text" class="mui-input-clear" placeholder="还款金额*1.2%" >
        </div>
      </div>
      <div class="back-submit-form">
        <div class="mui-input-row">
          <label>CVN2</label>
          <input type="text" class="mui-input-clear" placeholder="请输入卡背面末三位" >
        </div>
        <div class="mui-input-row">
          <label>有效期</label>
          <input type="text" class="mui-input-clear" placeholder="示例：09/20,输入0920" >
        </div>
      </div>
    </div>
    <div class="repay-btn-big">
      <button  type="button" disabled="disabled" class="mui-btn mui-btn-primary mui-btn-block">提交申请</button>
    </div>
    <div class="applyfor-cue">请仔细核对您输入的CVN2与有效期，输入错误将导致还款失败哦</div>
  </div>

</template>

<script>

  export default {
    name: 'loanRepay',
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
