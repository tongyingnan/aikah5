<template>
  <div class="card-help">
    <m-head title="注意事项" left="back"></m-head>
    <div class="mui-card">
      <div class="mui-card-header">储蓄卡<i data-v-1cda85c1="" class="icon icon-xs icon-list-b"></i></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>招行银卡</p>
          <p>华夏银行</p>
          <p>招行银卡</p>
          <p>平安银行</p>
          <p>建设银行</p>
          <p>交通银行</p>
          <p>兴业银行</p>
          <p>北京银行</p>
          <p>浦发银行</p>
          <p>光大银行</p>
          <p>民生银行</p>
          <p>广发银行</p>
          <p>中信银行</p>
          <p>平安银行</p>
          <p>中国工商银行</p>
          <p>中国农业银行</p>
          <p>邮政储蓄银行</p>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">信用卡<i data-v-1cda85c1="" class="icon icon-xs icon-list-b"></i></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>招行银卡</p>
          <p>华夏银行</p>
          <p>招行银卡</p>
          <p>平安银行</p>
          <p>建设银行</p>
          <p>交通银行</p>
          <p>兴业银行</p>
          <p>北京银行</p>
          <p>浦发银行</p>
          <p>光大银行</p>
          <p>民生银行</p>
          <p>广发银行</p>
          <p>中信银行</p>
          <p>平安银行</p>
          <p>中国工商银行</p>
          <p>中国农业银行</p>
          <p>邮政储蓄银行</p>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">不支持+不建议<i data-v-1cda85c1="" class="icon icon-xs icon-list-b"></i></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <span>不支持卡类型</span>
          <p>贷款卡</p>
          <p>取现卡</p>
          <p>公务员卡</p>
          <p>储贷合一卡</p>
          <span>不建议卡类型</span>
          <p>双币卡</p>
          <p> 车主卡</p>
          <p>旅游联名卡</p>
          <p> 地方性银行卡</p>
          <p>保险卡</p>
          <p>虚拟信用卡</p>
          <p>分期还款卡</p>
          <p>临时额度卡</p>
        </div>
      </div>
    </div>
    <div class="explain-word">PS:除了储贷合一的卡，基本的储蓄卡是可以绑定的，包括地方性银行和商业银行</div>
  </div>
</template>
<script>
  export default{


    name: 'explain',
    data(){
      return {};
    },
    mounted: function () {
      $('.mui-card-header').click(function () {
        var ishidden = $(this).next().is(":hidden");
        if(ishidden){
          $(this).next().show();
          $(this).children("i").addClass("icon-list-t")
        }else{
          $(this).next().hide();
          $(this).children("i").removeClass("icon-list-t")
        }
      })
    }
  }
</script>
<style scoped>
  .card-help{
    margin-top: 45px;
  }
  .mui-card{
    margin: 0;
    box-shadow: none;
  }
  .mui-card-content{
    display: none;
    background-color: #fafafa;
  }
  .mui-card-header{
    color: #333;
    font-size: 15px;
    padding-right: 37px;
  }
  .mui-card-content-inner{
    padding-right: 37px;
  }
</style>
