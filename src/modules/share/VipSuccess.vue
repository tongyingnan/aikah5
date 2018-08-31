<template>
  <div class="share-vip bg-white vip-success">
    <m-head title="购买成功" >
      <div slot="left" class="mui-icon mui-icon-left-nav mui-pull-left" @click="turnBack"></div>
      <span slot="right" class="mui-pull-right" @click="turnBack">完成</span>
    </m-head>


    <div class="vip-page" v-if="vipInfo">
      <img src="../../assets/images/vipsuccess.png" class="vip-success-img">
      <div class="vip-sucess-word">
        <p>{{vipInfo.price/100}}元<span>vip</span>{{vipInfo.name}}套餐</p>
        <p>购买成功</p>
      </div>
      <ul class="toogle">
        <li>
          <h5>恭喜您成为VIP会员，获得刷卡还款分润优惠</h5>
          <div class="go">
            <p>
            <table style="width: 100%">
                <tr>
                  <td>办卡推广分润</td>
                  <td>直推 <span>{{fixed(vipInfo.share.registcard[0] * 100)}}%</span></td>
                  <td>间推 <span>{{fixed(vipInfo.share.registcard[1] * 100)}}%</span></td>
                </tr>
                <tr>
                  <td>贷款推广分润</td>
                  <td>直推 <span>{{fixed(vipInfo.share.loan[0] * 100)}}%</span></td>
                  <td>间推 <span>{{fixed(vipInfo.share.loan[1] * 100)}}%</span></td>
                </tr>
                <tr>
                  <td>升级VIP分佣</td>
                  <td>直推 <span>{{fixed(vipInfo.share.upvip[0] * 100)}}%</span></td>
                  <td>间推 <span>{{fixed(vipInfo.share.upvip[1] * 100)}}%</span></td>
                </tr>
                <tr>
                  <td>收款推广分润</td>
                  <td>直推万 <span>{{fixed(vipInfo.share.cash[0] * 10000)}}</span></td>
                  <td>间推万 <span>{{fixed(vipInfo.share.cash[1] * 10000)}}</span></td>
                </tr>
                <tr>
                  <td>帮你还分润</td>
                  <td>直推万 <span>{{fixed(vipInfo.share.loanpay[0] * 10000)}}</span></td>
                  <td>间推万 <span>{{fixed(vipInfo.share.loanpay[1] * 10000)}}</span></td>
                </tr>
                <tr>
                  <td>智能还款分润</td>
                  <td>直推万 <span>{{fixed(vipInfo.share.repayment[0] * 10000)}}</span></td>
                  <td>间推万 <span>{{fixed(vipInfo.share.repayment[1] * 10000)}}</span></td>
                </tr>
              </table>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import helper from '../helper'
  import api from '../api'
  import rest from '../rest'
  export default {
    name: 'Vipsuccess',
    data () {
      return {
        vipInfo: null
      }
    },
    mounted: function () {
      this.freshSystemInfo( () => {
        this.vipInfo = this.systemInfo.vip[this.$route.query.vip];
      });
    },
    methods: {
      'turnBack': function () {
        this.$router.go(-2);
      }
    }
  }
</script>

<style scoped>
  .mui-table-view-cell a{
    color: #FF3B30;
  }
  .vip-page span{
    color: #f66363;
  }
  .icon-list-b,.icon-list-t{
    margin: 0;
    margin-top: -3px;
    right: 4px;
  }
</style>
