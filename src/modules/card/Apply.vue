<template>
  <div class="card-Home ">
    <m-head title="我的银行卡" left="back">
    </m-head>
    <!--更改-->
    <div class="main_card card-help bg-white">
      <div id="slider1" class="mui-slider" >
        <div class="mui-slider-group mui-slider-loop">
          <!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
          <div class="mui-slider-item mui-slider-item-duplicate">
            <a href='javascript:void(0)'>
              <img style="width: 100%" src="../../assets/images/banner.jpg">
            </a>
          </div>
          <!-- 第一张 -->
          <div class="mui-slider-item">
            <a href='javascript:void(0)'>
              <img style="width: 100%" src="../../assets/images/banner.jpg">
            </a>
          </div>
          <!-- 第二张 -->
          <div class="mui-slider-item">
            <a href='javascript:void(0)'>
              <img style="width: 100%" src="../../assets/images/banner1.jpg">
            </a>
          </div>
          <!-- 第二张 -->
          <div class="mui-slider-item">
            <a href='javascript:void(0)'>
              <img style="width: 100%" src="../../assets/images/banner2.jpg">
            </a>
          </div>

          <!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
          <div class="mui-slider-item mui-slider-item-duplicate">
            <a href='javascript:void(0)'>
              <img style="width: 100%" src="../../assets/images/banner.jpg">
            </a>
          </div>
        </div>
        <div class="mui-slider-indicator">
          <div class="mui-indicator mui-active"></div>
          <div class="mui-indicator"></div>
          <div class="mui-indicator"></div>
        </div>
      </div>
      <ul class="card-f-ul card-f-ul-one clearfix">
        <li>
          <a href="javascript:void(0)">
            <img src="../../assets/images/bank/ico1.png"/>
            <div class="card-f-line">
              <p>广大银行</p>
              <em>淘宝享积分，还能当钱花</em>
            </div>
            <p class="card-f-down">
              <span>奖金￥</span>
              <em>85.0</em>
            </p>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <img src="../../assets/images/bank/ico2.png"/>
            <div class="card-f-line">
              <p>建设银行</p>
              <em>淘宝享积分，还能当钱花</em>
            </div>
            <p class="card-f-down">
              <span>奖金￥</span>
              <em>85.0</em>
            </p>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <img src="../../assets/images/bank/ico3.png"/>
            <div class="card-f-line">
              <p>广发银行</p>
              <em>淘宝享积分，还能当钱花</em>
            </div>
            <p class="card-f-down">
              <span>奖金￥</span>
              <em>85.0</em>
            </p>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <img src="../../assets/images/bank/ico4.png"/>
            <div class="card-f-line">
              <p>广大银行</p>
              <em>淘宝享积分，还能当钱花</em>
            </div>
            <p class="card-f-down">
              <span>奖金￥</span>
              <em>85.0</em>
            </p>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <img src="../../assets/images/bank/ico5.png"/>
            <div class="card-f-line">
              <p>建设银行</p>
              <em>淘宝享积分，还能当钱花</em>
            </div>
            <p class="card-f-down">
              <span>奖金￥</span>
              <em>85.0</em>
            </p>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <img src="../../assets/images/bank/ico6.png"/>
            <div class="card-f-line">
              <p>广发银行</p>
              <em>淘宝享积分，还能当钱花</em>
            </div>


            <p class="card-f-down">
              <span>奖金￥</span>
              <em>85.0</em>
            </p>
          </a>
        </li>
      </ul>
    </div>
    <!--更改-->
    <!--底部导航-->
    <nav  class="mui-bar mui-bar-tab">
      <router-link  class="mui-tab-item-p " to="/card/loan">
        <span class="mui-icon mui-icon-person" ></span>
        <span  class="mui-tab-label">网贷</span>
      </router-link>
      <router-link  id="cardList" class="mui-tab-item-p mui-active " to="/card/apply">
        <span class="mui-icon  iconfont icon-huankuan"></span>
        <span  class="mui-tab-label">信用卡</span>
      </router-link>
      <router-link class="mui-tab-item-p" to="/card/center">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">个人中心</span>
      </router-link>
    </nav>
    <!--底部导航-->
  </div>
</template>

<script>
  export default {
    name: 'apply',
    data () {
      return {

      }
    },
    mounted: function () {
      var slider = mui("#slider1");
      slider.slider({
        interval: 3000
      });
    },
    methods: {

      },

  }
</script >
<style scoped>
  .card-help{
    margin-top:44px;
    margin-bottom:79px;
  }
  body{
    background-color: #fff;
  }
</style>
