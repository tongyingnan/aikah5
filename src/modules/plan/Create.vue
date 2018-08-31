<template>
  <div class="plan-create bg-white">
    <m-head :title="title" left="back">
      <div slot="right" class="mui-pull-right" @click="submit">提交</div>
    </m-head>
    <div class="repay" v-show="type!=='consume'">
      <div class="mui-input-row">
        <label>还款类型</label>
        <div class="plan-style">
          <span :class="{cur:bool}" @click="bool = true">落地商户</span>
        </div>
        <!--<input type="text" id='showUserPicker' class="mui-input-clear" placeholder="选择还款类型" value="快速还款">-->
      </div>
      <!--选择地区-->
      <div class="mui-input-row" v-show="bool" >
        <label>选择地区</label>
        <select class="sel-com icon" v-model="selectProv" @change="getProv(selectProv)">
          <option v-for="item in provs" :value="item.value">{{item.label}}</option>
        </select>
        <select class="sel-com icon" v-model="selectCity">
          <option v-for="item in citys" :value="item.value">{{item.label}}</option>
        </select>
      </div>
      <!--选择地区-->
      <div class="mui-input-row">
        <label>应还款金额</label>
        <input type="text" class="mui-input-clear" placeholder="请输入应还款金额" v-model="plan_money">
      </div>
      <div class="mui-input-row" v-show="!type">  <!--//点自定义还款不一样的-->
        <label>还款日期</label>
        <a class="dataTime-a" href="#dataTime">
          <input type="text" class="mui-input-clear" placeholder="选择还款日期" v-model="plan_days" readonly>
        </a>
      </div>
      <div class="mui-input-row" v-show="!type"> <!--//点自定义还款不一样的-->
        <label>还款笔数</label>
        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='40'>
          <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
          <input class="mui-input-numbox" type="number" v-model="plan_num" readonly = "readonly">
          <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
      </div>
    </div>

    <div class="repay" v-show="type==='consume'">
      <div class="mui-input-row">
        <label>消费金额</label>
        <input type="text" class="mui-input-clear" placeholder="请输入消费金额" v-model="plan_money">
      </div>
      <div class="mui-input-row">
        <label>消费日期</label>
        <input type="text" class="mui-input-clear datapick" placeholder="选择消费日期" v-model="plan_days" :value="selectDays.join(',')">
      </div>
      <div class="mui-input-row">
        <label>消费笔数</label>
        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='40'>
          <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
          <input class="mui-input-numbox" type="number" v-model="plan_num"/>
          <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
      </div>
    </div>

    <div class="repay-btn-big">
      <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="preview" :disabled="disabledBtn">生成规划列表</button>
    </div>


    <div class="repay-list" v-show="previewInfo.count_repayment">
      <p>本次共规划还款{{previewInfo.count_repayment}}笔，消费{{previewInfo.count_pay}}笔，手续费{{fixed(previewInfo.rate_money / 100, 2)}}元</p>
      <p>请确保该卡可用余额{{fixed(previewInfo.min_money/100)}}元，以免执行还款规划失败</p>
    </div>

    <div class="bg-silver Payment" @click="building">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <!--/coupon/home?isSelect=true-->
          <a href="javascript:void(0)"  class="mui-navigate-right">
            <span class="mui-badge mui-badge-warning">-{{fixed(allSelectedMoney/100)}}.00</span>
            券（还款金）
          </a>
        </li>
      </ul>
    </div>


    <div class="mui-content notop">
      <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <a class="mui-control-item"  href="#item2" v-if="false">账单明细</a>
          <!--<a class="mui-control-item mui-active" :class="{'mui-active': type !== 'consume'}" href="#item3" v-show="type!=='consume'">还款规划</a>-->
          <a class="mui-control-item mui-active"  href="#item3" >预览规划列表</a>
          <a class="mui-control-item" href="#item4" v-if="false">银行服务</a>
          <!--<a class="mui-control-item" :class="{'mui-active': type === 'consume'}" href="javascript:void(0)" v-show="type==='consume'">消费规划</a>-->
        </div>
        <!--切换的-->
        <div class="mui-slider-group">
          <div class="mui-slider-item mui-control-content mui-active"  id="item3" >
            <!--在item3里加这句是为了让它满足条件的时候显示默认是隐藏的v-show="previewInfo.list && previewInfo.list.length > 0"-->
            <ul class="mui-table-view">

              <li class="mui-table-view-cell">
                <span class="plan-dw">
                 <em><i class="ico-radio" style="background-color: rgb(87, 251, 69);"></i>执行成功</em>
                <em><i class="ico-radio" style="background-color: rgb(153, 153, 153);"></i>撤销执行</em>
                <em><i class="ico-radio" style="background-color: rgb(251, 170, 69);"></i>等待执行</em>
                <em><i class="ico-radio" style="background-color: rgb(223, 1,0);"></i>执行失败</em>
                </span>
                <p v-if="previewInfo.list && previewInfo.list.length > 0">制订时间：{{new Date(previewInfo.list[0].create_time).format('yyyy/MM/dd ')}}</p>
              </li>
              <li class="mui-table-view-cell" v-for="item in previewInfo.list">
                <div class="repay-font">
                  <h5 class="fl">快速还款（¥{{fixed(item.money/100)}}）</h5>
                  <h6 class="fr">{{new Date(item.run_time).format('MM-dd')}}</h6>
                  <div class="clear"></div>
                </div>
                <div v-for="pay in item.paylist" class="create-div">
                  <h6 class="fl" ><i class="ico-radio"></i>消费（¥{{fixed(pay.money/100)}}）</h6>
                  <h6 class="fl type-time">{{new Date(pay.run_time).format('MM-dd hh:mm')}}</h6>
                  <div class="clear"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--切换的-->
      </div>
    </div>

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
import api from "../api";
import rest from "../rest";
import helper from "../helper";
import provs from "../../config/provs";
export default {
  name: "planCreate",

  data() {
    var data = Object.assign(
      {
        max_num: 40, // 不超过40笔
        plan_money: "", //还款总金额 和 消费金额
        plan_num: 1, //还款笔数
        plan_days: "", //选择还款日期
        recharge: true,
        validDays: [], //<div v-show="!validDays || validDays.length < 1"><p>无可用日期</p></div>
        selectDays: [], //<input type="text" class="mui-input-clear datapick" placeholder="选择消费日期" v-model="plan_days" :value="selectDays.join(',')">
        cardInfo: {},
        previewInfo: {}, //<p>本次共规划还款{{previewInfo.count_repayment}}笔，消费{{previewInfo.count_pay}}笔，手续费{{fixed(previewInfo.rate_money / 100, 2)}}元</p>
        type: "",
        coupons: [],
        allSelectedMoney: 0, //<span class="mui-badge mui-badge-warning">-{{fixed(allSelectedMoney/100)}}.00</span>券（还款金）
        nopop: false,
        bool: true,
        provs: provs.provs,
        citys: [],
        selectProv: "",
        selectCity: ""
      },
      this.$route.query
    );
    return data;
  },
  watch: {
    plan_money: function() {
      if (this.type === "auto") {
        this.plan_num =
          parseInt(this.plan_money / this.systemInfo.switch.minPlanMoney) || 1; //还款笔数 = 还款总金额 / 最小计划还款金额
        this.plan_num =
          this.plan_num > this.max_num ? this.max_num : this.plan_num; //判断还款笔数如果大于40就为40没有大于40就执行后面一个

        this.selectDays = [];
        $("[data-day]")
          .removeClass("active")
          .slice(0, Math.min(this.plan_num, 40))
          .each((index, item) => {
            $(item).click();
          });
        this.plan_days = this.selectDays.join("、").replace(/\d+-0*/g, "");

        var maxNum = this.selectDays.length * this.systemInfo.switch.maxDayPlan; // 每天最多计划几笔
        this.plan_num = this.plan_num > maxNum ? maxNum : this.plan_num;
        this.previewInfo = {};
      }
      return this.plan_money;
    },
    bool: function() {}
  },
  computed: {
    title: function() {
      switch (this.type) {
        case "consume":
          return "消费规划";
        case "auto":
          return "智能还款规划";
        default:
          return "自定义还款";
      }
    },
    disabledBtn: function() {
      var passed = false;
      if (this.type === "consume") {
        passed = Boolean(this.plan_money && this.plan_days && this.plan_num);
      } else if (this.type === "auto") {
        passed = Boolean(this.plan_money);
      } else {
        passed = Boolean(this.plan_money && this.plan_days && this.plan_num);
      }
      return !passed;
    }
  },
  mounted: function() {
    this.loadValidDay(this.id, this.repayment_day);
    this.coupons = helper.getJson("selectedCoupons") || [];
    this.selectProv = this.provs[0].value;
    this.getProv(this.provs[0].value);

  },
  beforeRouteLeave: function(to, from, next) {
    if (!this.submited && this.plan_money) {
      mui.confirm(
        "",
        "还款计划还未提交，退出将丢失所做计划，确认退出吗？",
        ["退出", "继续编辑"],
        e => {
          if (!e.index) {
            this.removePreview();
          }
          next(!e.index);
        }
      );
    } else {
      next();
    }
  },
  methods: {
    getProv: function(prov) {
      console.log(prov);
      let tempCity = [];
      this.citys = [];
      this.selectCity = "";
      let allCity = provs.allCity;
      for (var val of allCity) {
        if (prov == val.prov) {
          tempCity.push({
            label: val.label,
            value: val.label
          });
        }
      }
      this.citys = tempCity;
      this.selectCity = citys[0];
    },
    computeSelected: function() {
      this.allSelectedMoney = 0;
      for (var i = 0; i < this.coupons.length; i++) {
        this.allSelectedMoney += this.coupons[i].money;
      }
    },
    loadValidDay: function(card_id, repayment_day) {
      rest.get(api.plan.validday, { card_id, repayment_day }).done(res => {
        if (helper.isSuccess(res)) {
          var index = 0;
          var tmpDays = [];
          res.data = res.data || [];
          for (var i = 0; i < res.data.length; i++) {
            tmpDays[index] = tmpDays[index] || {};

            var day = new Date(res.data[i]);
            if (tmpDays[index].month !== day.getMonth()) {
              if (typeof tmpDays[index].month !== "undefined") {
                index += 1;
              }
              tmpDays[index] = {
                month: day.getMonth(),
                list: []
              };
            }
            tmpDays[index].list.push(day.getDate());
          }
          this.validDays = tmpDays;
          if (this.validDays.length < 1) {
            helper.alert(
              "本期无可用还款日期，请于下期账单出来再制定还款规划。",
              "",
              null,
              () => {
                this.$router.go(-1);
              }
            );
          }
        }
      });
    },
    loadRegions: function() {
      let data = { parent_id: this.regionId || 0 };
      rest.get(api.luodi.region, data).done(res => {
        if (helper.isSuccess(res)) {
          if (this.regionId) {
            this.subRegions = res.data;
          } else {
            this.regions = res.data;
          }
        }
      });
    },
    selectDay: function(e) {
      if (this.selectDays.length < 30) {
        var $item = $(e.currentTarget);
        if ($item.hasClass("active")) {
          $item.removeClass("active");
        } else {
          $item.addClass("active");
        }
        this.selectDays = [];
        $("[data-day]")
          .filter(".active")
          .each((index, item) => {
            this.selectDays.push(
              $(item)
                .attr("data-day")
                .replace(/(^\d{1}-)/g, "0$1")
                .replace(/-(\d{1}$)/g, "-0$1")
            );
          });
        this.selectDays.sort();
        this.plan_days = this.selectDays.join("、").replace(/\d+-0*/g, "");
      } else {
        helper.toast("一次规划最多不超过30天");
      }
    },

    // 预览
    preview: function() {
      this.plan_num = mui(".mui-numbox")
        .numbox()
        .getValue();
      if (
        this.selectDays.length > 0 &&
        this.selectDays.length <
          this.plan_num / this.systemInfo.switch.maxDayPlan
      ) {
        helper.toast(
          "每天最多规划" + this.systemInfo.switch.maxDayPlan + "笔消费"
        );
      } else if (
        this.plan_money / this.plan_num <
        this.systemInfo.switch.minPlanMoney
      ) {
        helper.toast(
          "请设置平均数大于" + this.systemInfo.switch.minPlanMoney + "元的金额"
        );
      } else {
        var data = {
          card_id: this.id,
          card_no: this.card_no,
          type: this.type || "",
          plan_money: this.plan_money * 100,
          plan_days: this.selectDays.join(","),
          plan_num: this.plan_num,
          province_id: this.regionId,
          city_id: this.subRegionId
        };
        rest.post(api.plan.preview, data).done(res => {
          if (helper.isSuccess(res)) {
            this.previewInfo = res.data;
          }
        });
      }
    },

    // 提交
    submit: function() {
      if (!this.previewInfo.list) {
        helper.toast("请先预览再提交计划");
      } else {
        mui.confirm(
          "",
          "还款笔数" +
            this.previewInfo.count_repayment +
            "笔<br>消费笔数" +
            this.previewInfo.count_pay +
            "笔<br>服务费" +
            this.fixed(this.previewInfo.rate_money / 100, 2) +
            "元<br>确保卡里可用余额" +
            this.fixed(this.previewInfo.min_money / 100) +
            "元",
          ["确定", "取消"],
          e => {
            if (!e.index) {
              //点击确定的
              rest.post(api.plan.create, { card_id: this.id }).done(res => {
                if (helper.isSuccess(res)) {
                  helper.toast("创建计划成功").done(() => {
                    this.submited = true;
                    this.$router.go(-1);
                  });
                }
              });
            }
          }
        );
      }
    },
    removePreview: function() {
      rest.get(api.plan.removePreview, { card_id: this.id });
    }
  }
};
</script>
<style scoped>
.data-ul {
  display: inline-block;
}
.coupon {
  padding: 10px 0;
}
.mui-input-row label {
  width: 30%;
}
.line-silver {
  height: 10px;
}
/*.notop{
    padding-top: 0;
  }*/
.mui-bar-nav ~ .mui-content {
  padding-top: 0px;
}
.festiv-nei {
  background-color: #fff;
  padding: 15px 0;
  border-radius: 5px;
}
.festiv-nei p {
  color: #333;
}
#sliderSegmentedControl a.mui-active {
  border-bottom: none;
}
.mui-input-row .sel-com {
  width: 30%;
  float: left;
}
</style>
