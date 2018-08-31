<template>
  <div class="password bg-white">
    <m-head title="信用卡详情" left="back">
      <router-link slot="right" to="/card/help" class="mui-pull-right">帮助中心</router-link>
    </m-head>
    <div class="card-content">
      <ul>
        <li>
          <div :class="'bank-bg-' + bank.get(cardInfo.card_bank).color">
            <div class="bankico fl">
              <i :class="'icon icon-md icon-bank-' + bank.get(cardInfo.card_bank).icon"></i>
            </div>
            <div class="fl bank-h">
              <h5>{{cardInfo.card_bank}}</h5>
              <h5>{{cardInfo.name}} | 尾号 {{cardInfo.card_no_last}}</h5>
            </div>
            <div class="fr bank-data">
              <span class="span1">账单日{{cardInfo.bill_day}}号</span>
              <span class="span1">还款日{{cardInfo.repayment_day}}号</span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="bank-item">
            <div class="fl item">
              <h6>应还款</h6>
              <p>{{renderMoney(cardInfo.repayment_money)}}</p>
              <div class="item-line"></div>
            </div>
            <div class="fl item">
              <h6>未还金额</h6>
              <p>{{renderMoney((cardInfo.repayment_money - cardInfo.repaymented_money))}}</p>
              <div class="item-line"></div>
            </div>
            <div class="fl item">
              <h6>已还金额</h6>
              <p>{{renderMoney(cardInfo.repaymented_money)}}</p>
            </div>
            <div class="clear"></div>
          </div>
          <div class="bank-item bank-item-2">
            <div class="fl item">
              <a href="javascript:void(0)" @click="turnToCreatePlan('auto')">
                <h4>智能还款</h4>
                <div class="item-line"></div>
              </a>
            </div>
            <div class="fl item">
              <a href="javascript:void(0)" @click="turnToCreatePlan()">
                <h4>自定义还款</h4>
                <div class="item-line"></div>
              </a>
            </div>
            <div class="fl item">
              <a href="javascript:void(0)" @click="$router.push('/plan/delete?card_id={0}&card_no={1}'.format(cardInfo.id, cardInfo.card_no))">
                <h4>终止规划</h4>
              </a>
            </div>
            <div class="clear"></div>
          </div>
        </li>

      </ul>
    </div>

    <div class="line-silver"></div>
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <a class="mui-control-item mui-active" href="javascript:void(0)">预览规划列表</a>
      </div>
      <!--还款-->
      <div class="mui-slider-group">
        <div class="mui-slider-item mui-control-content" v-show="plans && plans.length > 0">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell">
              <span class="plan-dw">
                <em><i class="ico-radio" style="background-color: rgb(87, 251, 69);"></i>执行成功</em>
                <em><i class="ico-radio" style="background-color: rgb(153, 153, 153);"></i>撤销执行</em>
                <em><i class="ico-radio" style="background-color: rgb(251, 170, 69);"></i>等待执行</em>
                <em><i class="ico-radio" style="background-color: rgb(223, 1,0);"></i>执行失败</em>
              </span>
              <p v-if="plans && plans.length > 0">制订时间：{{new Date(plans[0].create_time).format('yyyy/MM/dd ')}}</p>
            </li>
            <li class="mui-table-view-cell" v-for="item in plans">
              <!--<p>制订时间：{{new Date(item.create_time).format('yyyy/MM/dd hh:mm:ss')}}</p>-->
              <div class="repay-font">
                <h5 class="fl">快速还款（¥{{fixed(item.money/100)}}）</h5>
                <h6 class="fr">{{new Date(item.run_time).format('MM-dd')}}</h6>
                <div class="clear"></div>
              </div>
              <div v-for="pay in item.paylist">
                <h6 class="fl" ><i class="ico-radio" :style="renderStatus(pay.status)"></i>消费（¥{{fixed(pay.money/100)}}）</h6>
                <h6 class="fr">{{new Date(pay.run_time).format('MM-dd hh:mm')}}</h6>
                <div class="clear"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import helper from '../helper'
  import rest from '../rest'
  import api from '../api'
  import bank from '../../config/bank'

  export default {
    name: 'cardDetail',
    data () {
      return {
        bank: bank,
        hasPlanRunning: false,
        cardInfo: {},
        plans: [],
        coupons: [],
        allSelectedMoney: 0
      }
    },
    mounted: function () {
      this.loadInfo(this.$route.query.id);
      this.coupons = helper.getJson('selectedCoupons') || [];
      window.scrollTo(0,0);
    },
    methods: {
      loadInfo: function (id) {
        rest.get(api.card.detail, {id}).done(res => {
          if(helper.isSuccess(res)){
            this.cardInfo = res.data || {};
            this.loadRangePlanList();
          }
        });
      },
//      loadCardList: function () {
//        rest.get(api.card.list).done(res => {
//          if(res.data && res.data.length > 0){
//            this.cardList = res.data;
//            helper.setJson({'cardList': this.cardList}); //获取缓存在我的那个页面显示卡的个数
//          }else{
//            this.nodata = true;
//          }
//        }),
      loadRangePlanList: function (card_id) {
        var card_id = this.cardInfo.id;
        var start_date = new Date();
        start_date.setDate(this.cardInfo.repayment_day);
        if(start_date.getDate() > new Date().getDate()){
          start_date.setMonth(start_date.getMonth() - 1);
        }
        start_date = this.cardInfo.last_plan_time || start_date;
        var end_date = new Date(start_date);
        end_date.setMonth(end_date.getMonth() + 1);

        rest.get(api.plan.list, {card_id, start_date, end_date}).done(res => {
          if(helper.isSuccess(res)){
            this.plans = res.data || [];
            for(var i=0; i<this.plans.length; i++){
              var day = this.plans[i];
              if(day.paylist && day.paylist.length > 0){
                for(var j=0; j<day.paylist.length; j ++){
                  var plan = day.paylist[j];
                  if(plan.status === 0 || plan.status === 1){
                    this.hasPlanRunning = true;
                    break;
                  }
                }
              }
              if(this.hasPlanRunning){
                break;
              }
            }
          }
        });
      },
      renderStatus: function (status) {
        return 'background-color:' + {
          '-1': '#999',//'预览中',
          '0': '#fbaa45',//'待执行',
          '1': '#fbaa45', //  执行中
          '2': '#57fb45', // 成功
          '3': '#fb4545', // 失败
          '4': '#999' //撤销
        }[status.toString()]
      },
      turnToCreatePlan: function (type) {
        type = type || '';

        var checkBillDay = () => {
          var billDay = new Date(), repayDay = new Date(), nowDay = new Date();
          billDay.setDate(this.cardInfo.bill_day);
          repayDay.setDate(this.cardInfo.repayment_day);

          if(nowDay.getTime() < billDay.getTime()){
            billDay.setMonth(billDay.getMonth() - 1);
          }
          var repayDay = new Date(billDay);
          repayDay.setDate(this.cardInfo.repayment_day);
          if(billDay.getTime() > repayDay.getTime()){
            repayDay.setMonth(repayDay.getMonth() + 1);
          }
          if(nowDay.getTime() > billDay.getTime() && nowDay.getTime() < repayDay.getTime()){
            return true;
          }
          return false;
        };

        if(!this.cardInfo.bill_day || !this.cardInfo.repayment_day){
          helper.alert('请先设置账单日和还款日');
        }else{
          if(!checkBillDay()){
            helper.alert('请在账单日之后再设定还款规划');
          }else if(this.hasPlanRunning){
            helper.alert('本月已设定过还款规划，请先终止规划后再重新设定');
          }else{
            this.$router.push('/plan/create?type={0}&id={1}&repayment_day={2}&card_no={3}'.format(type, this.cardInfo.id, this.cardInfo.repayment_day, this.cardInfo.card_no));
          }
        }
      }
    }
  }
</script>
<style scoped>
  body {
    background-color: #efeff4;
  }
  .bank-item h4{
    font-size: 16px;
  }
  .bank-item .item{
    width: 33%;
  }
  .bank-item .item-line{
    height: 14px;
  }
  .mui-slider .mui-segmented-control.mui-segmented-control-inverted~.mui-slider-group .mui-slider-item{
    border-bottom: 0;
  }
  .mui-h5, h5{
    font-size:14px;
  }
  .line-silver{
    height:10px;
  }
  .card-content{
    margin-top:45px;
  }
  .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active{
    color:#333;
  }
</style>
