<template>
  <div class="bg-white applyfor percent-bg">
    <m-head title="新增还款申请" left="back"></m-head>
    <div class="repay">
      <div class="mui-input-row" v-show="!type">
        <label>还款日期</label>
        <a class="dataTime-a mui-navigate-right" href="#dataTime">
          <input type="text" class="mui-input-clear" placeholder="建议选择到期还款日前2天" v-model="plan_days"  readonly >
        </a>
      </div>
      <div class="mui-input-row">
        <label>还款金额</label>
        <input type="text"  class="mui-input-clear"   placeholder="请输入还款总金额"   v-model="plan"  v-on:input="feeplan">
        <!--<input type="text"  class="mui-input-clear" :value="ds"  placeholder="请输入还款总金额"   v-model="plan" >-->
      </div>
      <div class="mui-input-row">
        <label>手续费</label>
        <input type="text" id='showUserPicker' class="mui-input-clear" placeholder="还款金额*1.2%"   >
      </div>
    </div>
    <div class="repay-btn-big">
      <button  type="button" disabled="disabledBtn" class="mui-btn mui-btn-primary mui-btn-block" @click="submit">下一步</button>
    </div>
    <div class="applyfor-cue">提示:您可提前15日进行还款操作，我们将在您申请当日与所选的最终还款日范围内为您生成还款计划</div>

    <!--弹出的日期-->
    <div id="dataTime" class="mui-popover mui-popover-action mui-popover-bottom bgff">
      <div class="header-title">
        <div class="mui-dtpicker-header">
          <a href="#dataTime" class="mui-btn fl"><b>取消</b></a>
          <a href="#dataTime" class="mui-btn mui-btn-blue fr"><b>确定</b></a>
          <div class="clear"></div>
        </div>
      </div>

      <div class="data-content">
        <p>请选择还款日期</p>
        <div v-show="!validDays || validDays.length < 1"><p>无可用日期</p></div>
        <div v-for="month in validDays">
          <p>{{month.month + 1}}月</p>
          <ul class="data-ul">
            <li v-for="day in month.list" :data-day="month.month + 1 + '-' + day" @click="selectDay">{{day}}</li>
          </ul>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api';
  import rest from '../rest';
  import helper from '../helper';

  export default {
    name: 'ApplyFor',
    data () {
      return Object.assign({
        plan_money: '',
        plan_days: '',
        type: '',
        selectDays: [],
        validDays: [],
        max_num: 40, // 不超过40笔
        plan_num: 1,   //还款笔数
        recharge: true,
        cardInfo: {},
        previewInfo: {},//<p>本次共规划还款{{previewInfo.count_repayment}}笔，消费{{previewInfo.count_pay}}笔，手续费{{fixed(previewInfo.rate_money / 100, 2)}}元</p>
        coupons: [],
        allSelectedMoney: 0,
        ds:'',
        plan:'',

      }, this.$route.query);
      return data;
    },
    watch: {
      plan_money: function () {

        if(this.type === 'auto'){
          this.plan_num = parseInt(this.plan_money / this.systemInfo.switch.minPlanMoney) || 1;
          this.plan_num = this.plan_num > this.max_num ? this.max_num : this.plan_num;

          this.selectDays = [];
          $('[data-day]').removeClass('active').slice(0, Math.min(this.plan_num, 40)).each((index, item) => {
            $(item).click();
          });
          this.plan_days = this.selectDays.join('、').replace(/\d+-0*/g, '');

          var maxNum = this.selectDays.length * this.systemInfo.switch.maxDayPlan;
          this.plan_num = this.plan_num > maxNum ? maxNum : this.plan_num;
          this.previewInfo = {};
        }
        return this.plan_money;
      }
    },
    mounted: function () {
      this.loadValidDay(this.id, this.repayment_day);
      this.coupons = helper.getJson('selectedCoupons') || [];
      //this.computeSelected();
    },
    methods: {
      submit:function(){
        this.$router.push('/')
      },
      loadValidDay: function (card_id, repayment_day) {
        rest.get(api.plan.validday, {card_id, repayment_day}).done(res => {
          if(helper.isSuccess(res)){
            var index = 0;
            var tmpDays = [];
            for(var i=0; i<res.data.length; i++){
              tmpDays[index] = tmpDays[index] || {};

              var day = new Date(res.data[i]);
              if(tmpDays[index].month !== day.getMonth()){
                if(tmpDays[index].month){
                  index += 1;
                }
                tmpDays[index] = {
                  month: day.getMonth(),
                  list: []
                }
              }
              tmpDays[index].list.push(day.getDate());
            }
            this.validDays = tmpDays;
//            if(this.validDays.length < 1){
//              helper.alert('本期无可用还款日期，请下期账单出来再制定还款规划。', '',null, ()=> {
//                this.$router.go(-1);
//              });
//            }
          }
        });
      },
      selectDay: function (e) {
  //        if(this.selectDays.length >= 2){
  //          var $item = $(e.currentTarget);
  //          $item.addClass('active');
  //        }
        if(this.selectDays.length < 30){
          var $item = $(e.currentTarget);
          if($item.hasClass('active')){
            $item.removeClass('active');
          }else{
            $item.addClass('active');
          }
          this.selectDays = [];
          $('[data-day]').filter('.active').each((index, item) => {
            this.selectDays.push($(item).attr('data-day').replace(/(^\d{1}-)/g, '0$1').replace(/-(\d{1}$)/g, '-0$1'));
          });
          this.selectDays.sort();
          this.plan_days = this.selectDays.join('、').replace(/\d+-0*/g, '');
        }else{
          helper.toast('一次规划最多不超过30天');
        }
      },
      poclose:function(){
        this.nopop = false;
      },
      feeplan:function(){  //添加金额时手续费的改变
//        console.log(this.plan)
        var fee = document.getElementById("showUserPicker");
        fee.value = this.plan * 0.012;
        if(this.plan === ""){
          fee.value = ""
        }
      }

    }
  }
</script>
<style scoped>

</style>
