<template>
  <div class="card-Home ">
    <m-head title="我的银行卡" left="back">
    </m-head>
    <!--更改-->
    <div class="main_card card-help">
      <!--没有卡的时候显示的时候出现的-->
      <!--<div class="debit">-->
        <!--&lt;!&ndash;<h2>储蓄卡</h2>&ndash;&gt;-->
        <!--<div class="debit_card" v-show="nodata">-->
          <!--<a href="javascript:void(0)" @click="addCard">-->
            <!--<form class="form_one">-->
              <!--<span><img src="../../assets/images/debit_img1.png" class="debit_icon" ></span>-->
              <!--<em>添加银行卡</em>-->
            <!--</form>-->
          <!--</a>-->
        <!--</div>-->
      <!--</div>-->
      <!--没有卡的时候显示的-->

      <div class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <a class="mui-control-item" :class="{'mui-active': tab === 0}" href="#tab0" @click="tab = 0">信用卡</a>
          <a class="mui-control-item" :class="{'mui-active': tab === 1}" href="#tab1" @click="tab = 1">储蓄卡</a>
        </div>
        <!--第一个-->
        <div class="mui-slider-item mui-control-content p-minhei1" :class="{'mui-active': tab === 0}" id="tab0">
          <div class="mui-scroll-wrapper">
            <div class="mui-scroll">
              <ul class="card_ul ">
                <li v-for="item in cardList" v-if="item.type" class="mui-table-view-cell mui-transitioning">
                  <!--you修改和删除-->
                  <div class="mui-slider-right mui-disabled">
                    <button type="button" @click="modifyCard(item.id, item.type)" class="mui-btn mui-btn-yellow">修改<br />信息</button>
                    <button type="button" @click="removeCard(item.id, item.type)" class="mui-btn mui-btn-red">卸载<br />卡片</button>
                  </div>
                  <!--修改和删除-->
                  <!--左边-->
                  <div :class="'mui-slider-handle bank-bg-' + bank.get(item.card_bank).color">
                    <div class="card_up  clearfix">
                      <span><i :class="'icon icon-md icon-bank-' + bank.get(item.card_bank).icon"></i></span>
                      <em>{{item.card_bank}}</em>
                      <em>|</em>
                      <!--<i>{{cardInfo.name}}</i>-->
                      <i class="end-number">{{item.name}} | 尾号 {{item.card_no_last}}</i>
                      <!--<i class="card-begin">正在执行/尚未规划{{ message }}</i>-->
                      <i v-show="item.type" >距还款日<em>{{computeCdDay(item.repayment_day)}}</em>天</i>
                      <a href="javascript:void(0)" class="card_ld" @click="turnToLuodi(item.id)">开通落地1</a>
                      <a href="javascript:void(0)" class="card_ld2" @click="turnToLuodi(item.id)">开通落地2</a>
                      <!--<a href="javascript:void(0)" class="card_sx" @click="building"><img src="../../assets/images/card_img3.png"></a>-->
                    </div>
                    <div class="bank-item clearfix"  v-if="item.type" @click="turnToDetail(item.id, item.type)">
                      <div class="fl item" >
                        <h6 >应还款</h6>
                        <p >{{renderMoney(item.repayment_money)}}</p>
                        <div  class="item-line"></div>
                      </div>
                      <div  class="fl item">
                        <h6 >未还金额</h6>
                        <p >{{renderMoney(item.repayment_money - item.repaymented_money)}}</p>
                        <div class="item-line"></div>
                      </div>
                      <div class="fl item">
                        <h6 >已还金额</h6>
                        <p>{{renderMoney(item.repaymented_money)}}</p>
                        <div class="item-line"></div>
                      </div>
                      <div  class="fl item">
                        <a href="javascript:void(0)" class="card_hk">预约还款</a>
                      </div>
                    </div>
                    <div class="card_dw"><img src="../../assets/images/card_img5.png"></div>
                  </div>
                  <!--左边-->
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--第一个-->
        <!--第一个-->
        <div class="mui-slider-item mui-control-content p-minhei1" :class="{'mui-active': tab === 1}" id="tab1">
          <div class="mui-scroll-wrapper">
            <div class="mui-scroll">
              <!--卡片-->
              <ul class="card_ul ">
                <li v-for="item in cardList" v-if="! item.type" class="mui-table-view-cell mui-transitioning">
                  <!--you修改和删除-->
                  <!--<div class="mui-slider-right mui-disabled">-->
                    <!--&lt;!&ndash;<button type="button" @click="modifyCard(item.id, item.type)" class="mui-btn mui-btn-yellow">修改<br />信息</button>&ndash;&gt;-->
                    <!--&lt;!&ndash;<button type="button" @click="removeCard(item.id, item.type)" class="mui-btn mui-btn-red">卸载<br />卡片</button>&ndash;&gt;-->
                  <!--</div>-->
                  <!--修改和删除-->
                  <!--左边-->
                  <div :class="'mui-slider-handle bank-bg-' + bank.get(item.card_bank).color" class="clearfix">
                    <div class="card_up  clearfix" @click="turnToDetail(item.id, item.type)">
                      <span class="'fl card_up_dw ' + bank.get(item.card_bank).icon" style="left: 15pt;"><i :class="'icon icon-md icon-bank-' + bank.get(item.card_bank).icon"></i></span>
                      <div class="card_up_one fl">
                        <em class="card_xh">{{item.card_bank}}</em>
                        <em>**** **** **** </em>
                        <i> {{item.card_no_last}}</i>
                      </div>
                      <!--<i v-show="item.type" >距还款日<em>{{computeCdDay(item.repayment_day)}}</em>天</i>-->
                      <div class="card_dw-one">储蓄卡</div>
                      <a href="javascript:void(0)" class="card_sx"><img src="../../assets/images/card_img3.png"></a>
                    </div>
                  </div>
                  <!--左边-->
                </li>
              </ul>
              <!--卡片-->
            </div>
          </div>
        </div>
        <!--第一个-->
      </div>

    </div>
    <a href="javascript:void(0)" class="addCard" @click="addCard"><span>+</span> <span>添加银行卡</span></a>
    <!--<m-tabs tab="1"></m-tabs>-->
  </div>
</template>

<script>
import helper from "../helper";
import rest from "../rest";
import api from "../api";
import bank from "../../config/bank";

export default {
  name: "savings",
  data() {
    return {
      bank: bank,
      cardList: [],
      nodata: false,
      tab: 0
    };
  },
  mounted: function() {
    this.loadCardList();
  },
  methods: {
    loadCardList: function() {
      rest.get(api.card.list).done(res => {
        if (res.data.length > 0) {
          this.cardList = res.data;
          helper.setJson({ cardList: this.cardList }); //获取缓存在我的那个页面显示卡的个数
        } else {
          this.nodata = true;
        }
      });
    },
    removeCard: function(id, type) {
      var msg = type
        ? "删除卡片将终止该卡所有未执行的还款计划，确认删除吗？"
        : "确认删除吗？";
      mui.confirm(msg, "", ["确认", "取消"], e => {
        if (!e.index) {
          rest.delete(api.card.remove, { id, type }).done(res => {
            if (helper.isSuccess(res)) {
              this.loadCardList();
            }
          });
        }
      });
    },
    turnToDetail: function(id, type) {
      if (type) {
        var msg = "尚未完成实名认证，";
        switch (this.userInfo.auth_status) {
          case 0:
            msg += "请在用户中心提交实名认证信息,认证成功才能使用哦";
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
          helper.alert(msg, null, null, () => {
            if (this.userInfo.auth_status < 1) {
              this.$router.push("/user/auth");
            } else {
              if (this.userInfo.auth_status === 1) {
                helper.toast("审核中，请耐心等待");
              }
            }
          });
        } else {
          if (this.userInfo.card_branch_name) {
            if (this.userInfo.is_need_rebind == 1) {
              mui.confirm(
                "提示",
                "系统升级，请重新绑定信用卡",
                ["取消", "确认"],
                e => {
                  if (e.index) {
                    this.$router.push("/card/modifyCreditCard");
                  }
                }
              );
            } else {
              this.$router.push("/card/detail?id=" + id);
            }
          } else {
            mui.confirm(
              "提示",
              "系统升级，请补充储蓄卡信息，体验完整功能",
              ["取消", "确认"],
              e => {
                if (e.index) {
                  this.$router.push("/card/modify");
                }
              }
            );
          }
        }
      }
    },
    turnToLuodi: function(id) {
      var msg = "尚未完成实名认证，";
      switch (this.userInfo.auth_status) {
        case 0:
          msg += "请在用户中心提交实名认证信息,认证成功才能使用哦";
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
        helper.alert(msg, null, null, () => {
          if (this.userInfo.auth_status < 1) {
            this.$router.push("/user/auth");
          } else {
            if (this.userInfo.auth_status === 1) {
              helper.toast("审核中，请耐心等待");
            }
          }
        });
      } else {
        if (this.userInfo.card_branch_name) {
          if (this.userInfo.is_need_rebind == 1) {
            mui.confirm(
              "提示",
              "系统升级，请重新绑定信用卡",
              ["取消", "确认"],
              e => {
                if (e.index) {
                  this.$router.push("/card/modifyCreditCard");
                }
              }
            );
          } else {
            this.$router.push("/card/reBindCard?id=" + id);
          }
        } else {
          mui.confirm(
            "提示",
            "系统升级，请补充储蓄卡信息，体验完整功能",
            ["取消", "确认"],
            e => {
              if (e.index) {
                this.$router.push("/card/modify");
              }
            }
          );
        }
      }
    },
    modifyCard: function(id, type) {
      var msg = "尚未完成实名认证，";
      switch (this.userInfo.auth_status) {
        case 0:
          msg += "请在用户中心提交实名认证信息,认证成功才能使用哦";
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
        helper.alert(msg, null, null, () => {
          if (this.userInfo.auth_status < 1) {
            this.$router.push("/user/auth");
          } else {
            if (this.userInfo.auth_status === 1) {
              helper.toast("审核中，请耐心等待");
            }
          }
        });
      } else {
        this.$router.push("/card/add?action=modify&id=" + id + "&type=" + type);
      }
    },
    addCard: function() {
      var msg = "尚未完成实名认证，";
      switch (this.userInfo.auth_status) {
        case 0:
          msg += "请在用户中心提交实名认证信息,认证成功才能使用哦";
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
        helper.alert(msg, null, null, () => {
          if (this.userInfo.auth_status < 1) {
            this.$router.push("/user/auth");
          } else {
            if (this.userInfo.auth_status === 1) {
              helper.toast("审核中，请耐心等待");
            }
          }
        });
      } else {
        if (this.userInfo.card_branch_name) {
          this.$router.push("/card/add?type=1");
        } else {
          mui.confirm(
            "提示",
            "系统升级，请补充储蓄卡信息，体验完整功能",
            ["取消", "确认"],
            e => {
              if (e.index) {
                if ($("#tab0").hasClass("mui-active")) {
                  this.$router.push("/card/add?type=1");
                } else {
                  this.$router.push("/card/add?type=0");
                }
              }
            }
          );
        }
      }

      //        if(msg){
      //          helper.toast(msg);
      //        }else{
      //          mui('#cardPopover').popover('toggle');
      //        }
    }
  }
};
</script>

<style scoped>
.card_ld {
  position: absolute;
  height: 26px;
  right: 7px;
  float: right;
  text-align: center;
  color: #ff8c00;
  font-size: 12px;
  border: 1px solid #ff8c00;
  border-radius: 3px;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 3px;
  line-height: 26px;
  display: inline-block;
}
.card_ld2 {
  position: absolute;
  height: 26px;
  right: 7px;
  float: right;
  text-align: center;
  color: #ff8c00;
  font-size: 12px;
  border: 1px solid #ff8c00;
  border-radius: 3px;
  margin-top: 30px;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 3px;
  line-height: 26px;
  display: inline-block;
}
.repay-cont {
  margin-top: 54px;
}
.card-content {
  margin-top: 10px;
  margin-bottom: 100px;
}
.addCard span {
  position: relative;
  bottom: 1px;
}
.addCard {
  bottom: 0px;
  position: fixed;
  /*border-top: solid 1px silver;*/
}
body {
  background-color: #e7e7e6;
}
.card_ul {
  width: 94%;
  margin: 9px auto 120px;
}
#tab1 .card_up {
  background-color: transparent;
  color: #fff;
  overflow: inherit;
  height: auto;
  padding: 10px;
  position: relative;
}
.mui-slider-handle {
  min-height: 90px;
}
#tab1 .card_up > em {
  color: #fff;
}
#tab1 .card_up i {
  color: #fff;
}
.card_sx {
  display: none;
}
.card-help {
  margin-top: 49px;
}
.mui-scroll {
  position: inherit;
}
.mui-scroll-wrapper {
  position: inherit;
}
.mui-control-content {
  background-color: transparent;
}
</style>
