<template>
  <div class="applyfor bg-white">
    <div class="back-login-img"><img src="../../assets/images/back-login-img.png"></div>
    <dl class="back-login-dl clearfix">
      <dt class="fl"><img src="../../assets/images/back-login-img1.png"></dt>
      <dd class="fr">
        <span>超低手续费</span>
        <em>无需提交繁琐资料</em>
      </dd>
    </dl>
    <dl class="back-login-dl clearfix">
      <dt class="fl"><img src="../../assets/images/back-login-img2.png"></dt>
      <dd class="fr">
        <span>实时恢复额度</span>
        <em>迅速帮你还清信用卡账单</em>
      </dd>
    </dl>
    <dl class="back-login-dl clearfix">
      <dt class="fl"><img src="../../assets/images/back-login-img3.png"></dt>
      <dd class="fr">
        <span>智能还款计划</span>
        <em>保障信用卡安全</em>
      </dd>
    </dl>
    <div class="back-login-button">
      <button   class="mui-btn mui-btn-primary" @click = "next">开始使用帮你还</button>
    </div>
    <div  class="get-money-tag back-get">
      <div class="mui-input-row mui-checkbox mui-left">
        <input value="1" type="checkbox">
        <label >我已查看并同意</label>
      </div>
      <a  href="javascript:void(0)" class="" id="xieyi">《帮你还使用协议》</a>
    </div>
    <!--弹窗-->
    <div  class="contact-pop contact-pop-one" v-show="nopop">
      <div  class="contact-img">
        <a href="javascript:void(0)">
          <img  src="../../assets/images/back-pop-img.png" class="contact-pop-img">
        </a>
        <div  class="pop-close" @click="poclose">×</div>
      </div>
      <a class="back-pop-word">
        <img src="../../assets/images/back-login-img4.png" class="back-pop-img">
        <span>账户安全由中国人寿财产保险承保</span>
        <img src="../../assets/images/back-login-img5.png" class="back-pop-img1">
      </a>
    </div>
    <div  class="contact-pop-bg" v-show="nopop"></div>
    <!--弹窗-->

  </div>

</template>

<script>

  export default {
    name: 'loanLogin',
    data () {
      return {
        nopop:false,
      }
    },
    mounted: function () {

    },
    methods: {
      pop:function(){
        this.nopop = true;
      },
      poclose:function(){
        this.nopop = false;
      },
      next:function(){
        this.$router.push('/loanpay/binding');
      }
    }
  }
</script>
<style scoped>

</style>
