<template>
  <div class="cash-unionPay">
    <m-head title="信用卡收款" left="back"></m-head>

    <div class="card-content q-center">
      <div class="margin10">
        <div class="mui-input-group">
          <div class="mui-input-row">
            <label>收款信用卡</label>
            <a href="#cardPopover1">
              <div class="bank-bg-x">
                <div class="bankico fl" style="margin-left: -4px;">
                  <i :class="'icon icon-xs icon-bank-' + bank.get(nCreditCard.card_bank).icon"></i>
                </div>
                <div class="fl bank-h">
                  <h5>{{nCreditCard.card_bank}} {{nCreditCard.card_no_last}}</h5>
                </div>
                <div class="r-jt">更换</div>
                <div class="clear"></div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="margin10">
        <div class="mui-input-group">
          <div class="mui-input-row">
            <label>到账储蓄卡</label>
            <!--<a href="#cardPopover0">-->
            <a href="javascript:void(0)">
              <div class="bank-bg-x">
                <div class="bankico fl" style="margin-left: -4px;">
                  <i :class="'icon icon-xs icon-bank-' + bank.get(nDepositCard.card_bank).icon"></i>
                </div>
                <div class="fl bank-h">
                  <h5>{{nDepositCard.card_bank}} {{nDepositCard.card_no_last}}</h5>
                </div>
                <!--<div class="r-jt">更换</div>-->
                <div class="clear"></div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="margin10">
      <div class="mui-input-row">
            <label>收款通道</label>
            <a href="#channelPopover">
              <div class="bank-bg-x">
                <div class="bankico fl" style="margin-left: -4px;">
                  <i :class="'icon icon-xs icon-unionpay' "></i>
                </div>
                <div class="fl bank-h">
                  <h5> {{channel.name}}</h5>
                </div>
                <div class="r-jt">切换</div>
                <div class="clear"></div>
              </div>
            </a>
      </div>
      </div>
      <div style="height: 10px;"></div>
      <div class="margin10">
        <div>
          <div class="mui-input-row">
            <label>收款金额</label>
          </div>
        </div>
        <div class="mui-input-group">
          <div class="mui-input-row" style="height: auto">
            <label class="yu-ico">￥</label>
            <input class="yu-input" type="text" placeholder="0.00" v-model.number="money"/>
          </div>
        </div>
        <p style="font-size: 12px; padding: 15px;"></p>
      </div>
      <div class="sk-next" style="margin-top: 0px; z-index: 2; position: relative;">
        <button id="btn" class="mui-btn mui-btn-primary" :disabled="!money" @click="submit">下一步</button>
      </div>
    </div>
    <p id="tip">收款时间：{{startTime}} - {{endTime}}</p>
    <div id="cardPopover0" class="mui-popover mui-popover-action mui-popover-bottom">
      <ul class="mui-table-view">
        <li class="card-style">到账储蓄卡列表</li>
        <li class="mui-table-view-cell" @click="changeCard(0, index)" v-for="(item, index) in cardList0">
          <a href='javascript:void(0)' style="color: #FF3B30;">{{item.card_bank}}</a>
        </li>
      </ul>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <a href="#cardPopover0"><b>取消</b></a>
        </li>
      </ul>
    </div>
    <div id="cardPopover1" class="mui-popover mui-popover-action mui-popover-bottom">
      <div class="mui-scroll-wrapper">
        <div class="mui-scroll">
          <ul class="mui-table-view">
            <li class="card-style">取现信用卡列表</li>
            <li class="mui-table-view-cell" @click="changeCard(1, index)" v-for="(item, index) in cardList1">
              <a href='javascript:void(0)' style="color: #FF3B30;">{{item.card_bank}}</a>
            </li>
          </ul>
        </div>
      </div>
      <ul class="mui-table-view unionPay-bottom">
        <li class="mui-table-view-cell">
          <a href="#cardPopover1"><b>取消</b></a>
        </li>
      </ul>
    </div>
    <div id="channelPopover" class="mui-popover mui-popover-action mui-popover-bottom">
      <div class="mui-scroll-wrapper" style="bottom: 53px">
        <div class="mui-scroll">
          <ul class="mui-table-view">
            <li class="card-style">通道列表</li>
            <li class="mui-table-view-cell"  v-for="(item, index) in channelList">
              <a  href='javascript:void(0)' style="color: #FF3B30;padding-right:50px;padding-left:50px;" @click="changeChannel(index)">{{item.name}}
              </a>
              <img src="/static/images/question-frame.png" style="width: 28px;display: inline;float: right;position: absolute;right:20px; top:10px" 
               @click="showPop(index)"/>
            </li>
          </ul>
        </div>
      </div>
      <ul class="mui-table-view unionPay-bottom">
        <li class="mui-table-view-cell">
          <a href='#channelPopover'><b>取消</b></a>
        </li>
      </ul>
    </div>

      <div class="fesTiv" id="fesTiv"  v-show="nopop" >
      <div class="festiv-dw">
        <div class="festiv-nei"  >
          <div data-v-1b5ef610="" class="pop-close"  @click="poclose">×</div>
          <a href="javascript:void(0)" v-html="notice.content" >
          </a>
        </div>
      </div>
      <div class="festiv-dw text"></div>
    </div>
  </div>
</template>

<script>
import helper from "../helper";
import rest from "../rest";
import api from "../api";
import bank from "../../config/bank";
export default {
  name: "cashUnionPay",
  data() {
    return {
      money: "",
      bank: bank,
      cardList0: [],
      cardList1: [],
      channelList: [],
      channel: "",
      nDepositCard: { card_no: "" },
      nCreditCard: { card_no: "" },
      startTime: "",
      endTime: "",
      nopop: false, 
      notice: {
        content: ""
      }
    };
  },
  mounted: function() {
    this.channelList = this.systemInfo.fastpay;
    this.channel = this.channelList[0];
    //解决输入收款金额时下一步和下面的小字重叠
    $(window).load(function() {
      var wgd = $(window).height();
      $(".cash-unionPay").height(wgd);
    });
    this.freshSystemInfo(systemInfo => {
      (this.startTime = this.systemInfo.switch.cashTimeRange.startTime),
        (this.endTime = this.systemInfo.switch.cashTimeRange.endTime);
    });
    this.loadCardList();
    mui(".mui-scroll-wrapper").scroll();
  },
  methods: {
    loadCardList: function() {
      //实名认证
      var msg = "尚未完成实名认证，";
      switch (this.userInfo.auth_status) {
        case 0:
          msg += "认证成功才能使用哦";
          break;
        case 1:
          msg += "请耐心等待审核结果";
          break;
        case -1:
          msg = "系统平台升级,请重新提交认证材料";
          break;
        case -2:
          msg += "审核失败，请重新提交认证材料";
          break;
        case 2:
          msg = "";
          break;
      }
      if (msg) {
        //          helper.toast(msg);
        mui.confirm(msg, "", ["确认", "取消"], e => {
          if (!e.index) {
            if (this.userInfo.auth_status < 1) {
              this.$router.push("/user/auth");
            } else {
              if (this.userInfo.auth_status === 1) {
                helper.toast("审核中，请耐心等待");
              }
            }
          }
        });
      } else {
        rest.get(api.card.list).done(res => {
          if (res.data && res.data.length > 0) {
            for (var i = 0; i < res.data.length; i++) {
              var card = res.data[i];
              if (card.type === 0) {
                this.cardList0.push(card);
              } else {
                this.cardList1.push(card);
              }
            }
          }
          if (this.cardList0.length > 0) {
            this.nDepositCard = this.cardList0[0];
          } else {
            //            helper.alert('尚未添加储蓄卡，请先到我的卡包中添加一张储蓄卡。');
            //            this.$router.push('/card/add?type=0');
            return;
          }
          if (this.cardList1.length > 0) {
            this.nCreditCard = this.cardList1[0];
          } else {
            mui.confirm(
              "",
              "尚未添加信用卡，请先到我的卡包中添加一张信用卡",
              ["确认", "取消"],
              e => {
                if (!e.index) {
                  this.$router.push("/card/add?type=1");
                }
                //                next(!e.index);
              }
            );
          }
        });
      }
    },
    poclose: function() {
      this.nopop = false;
    },
    showPop: function(index) {
      rest.get(api.doc.article, { id: this.channelList[index].infoid }).done(res => {
        if (res.data && res.data.status === 1) {
          this.notice = res.data;
          this.nopop = true;
        }
      });
    },
    toggleChannel: function() {
      mui("#channelPopover").popover("toggle");
    },
    changeChannel: function(index) {
      this.channel = this.channelList[index];
      //console.log(this.channel.name);
      mui("#channelPopover").popover("toggle");
    },
    changeCard: function(type, index) {
      if (type) {
        this.nCreditCard = this.cardList1[index];
        mui("#cardPopover1").popover("toggle");
      } else {
        this.nDepositCard = this.cardList0[index];
        mui("#cardPopover0").popover("toggle");
      }
    },
    submit: function() {
      var nowTime = Number(new Date().format("hhmm"));
      if (
        nowTime > Number(this.startTime.replace(/[^\d]+/g, "")) &&
        nowTime < Number(this.endTime.replace(/[^\d]+/g, ""))
      ) {
        if (
          this.money < this.systemInfo.switch.minCashMoney ||
          this.money > this.systemInfo.switch.maxCashMoney
        ) {
          helper.toast(
            "单笔限额 {0} - {1}".format(
              this.systemInfo.switch.minCashMoney,
              this.systemInfo.switch.maxCashMoney
            )
          );
        } else {
          helper.setJson({ nDepositCard: this.nDepositCard });
          helper.setJson({ nCreditCard: this.nCreditCard });
          this.$router.push("/cash/unionpay2?money=" + this.money+"&channel="+this.channel.channel);
        }
      } else {
        helper.toast(
          "收款时间：{0} - {1}".format(this.startTime, this.endTime)
        );
      }
    }
  }
};
</script>

<style scoped>
.bankico {
  margin-top: 4px;
}
#tip {
  text-align: center;
  position: absolute;
  bottom: 10px;
  width: 100%;
  z-index: 1;
}
.mui-popover .mui-table-view {
  max-height: 340px;
}
#cardPopover1 {
  min-height: 340px;
  background: #c8c7cc;
}
.mui-popover .mui-table-view {
  max-height: none;
}
#channelPopover {
  min-height: 340px;
  background: #c8c7cc;
}
</style>
