<template>
  <div class="binding-card">
    <m-head title="费用说明" left="back"></m-head>
    <div class="fee">
      <div class="small-word blue tc">服务费用和利率等级根据风险评级和借款期限综合评估</div>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          合同金额
          <span class="back-span">￥50000.00</span>
        </li>
        <li class="mui-table-view-cell">
          借款期限
          <span class="back-span">1个月</span>
        </li>
        <li class="mui-table-view-cell">
          合同月利率
          <span class="back-span">1.2%</span>
        </li>
        <li class="mui-table-view-cell">
          到期还款额
          <span class="back-span">￥50600.00</span>
        </li>
      </ul>
      <div class="small-word gray wordbg-white">
        借款资金到个人账户后，按时还款可提高信用，额度立即恢复，利率越用越低。若您出现逾期的情况，可能会降低您的信用额度，而且每笔借款都会进行在线仲裁，逾期严重会纳入法院失信人黑名单及行业协会风险共享，全网可查法院公示，失信将对自己的生活和工作造成严重的影响，珍惜信用，诚信为本！好借好还，再借不难。
      </div>
      <div class="signature">
        <label>借款人签名</label>
        <input type="text" placeholder="请输入您的姓名">
      </div>
      <div  class="get-money-tag back-get">
        <div class="mui-input-row mui-checkbox mui-left">
          <input data-v-07f82714="" value="1" type="checkbox">
          <label data-v-07f82714="">我已查看并同意</label>
        </div>
        <a  href="javascript:void(0)" class="" id="xieyi">《帮你还使用协议》</a>
      </div>
      <div class="sk-next"><button  type="button" disabled="disabled" class="mui-btn mui-btn-primary">确定</button></div>
    </div>
    <!--<div class="binding-card-em">帮你还仅支持本人信用卡</div>-->
  </div>

</template>

<script>

  export default {
    name: 'loanFee',
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
