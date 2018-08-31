<template>
  <div class="bg-white">
    <m-head>
      <!--<router-link to="/balance/record" slot="right" class="mui-pull-right">-->
      <router-link to="" slot="right" class="mui-pull-right">
        <img src="../assets/images/02.png" class="set-ico" @click="building">
        <!--消息中心-->
      </router-link>
    </m-head>

    <div class="index-box clearfix">
      <!---->
      <a href="javascript:void(0)" @click="auth">
        <img src="../assets/images/set/set3.png" />
        <h4>实名认证</h4>
      </a>
      <router-link to="/doc/article1">
        <img src="../assets/images/set/shopping1.png" />
        <h4>商城</h4>
      </router-link>
      <a href="javascript:void(0)"  @click="cash">
        <img src="../assets/images/09.png" />
        <h4>银联收款</h4>
      </a>
    </div>
    <div class="scroll" @click="$router.push('/doc/notice')">
      <img src="../assets/images/04.png"/>
      <marquee>{{ filterHtml(notice.content) }}</marquee>
      <div class="clear"></div>
    </div>
    <div class="index-content">
      <h2><i>|</i>更多服务</h2>
      <ul>
        <li>
          <a href="http://m.51kabao.cn/app/jiedai.htm?c=linshoubo">
            <img src="../assets/images/33.png" />
            <p>网络贷款</p>
          </a>
        </li>
        <li>
          <a href="http://m.51kabao.cn/app/banka.htm?c=linshoubo">
            <img src="../assets/images/27.png" />
            <p>一键办卡</p>
          </a>
        </li>
        <li>
          <router-link to="/card/promote">
            <img src="../assets/images/30.png" />
            <p>一键提额</p>
          </router-link>
        </li>
        <li>
          <router-link to="/share">
            <img src="../assets/images/37.png" />
            <p>分享有礼</p>
          </router-link>
        </li>
        <!--/insurance/home-->
        <!--<li @click="building">
            <img src="../assets/images/40.png" />
            <p>账户保险</p>
        </li>
        <li @click="building">
          <img src="../assets/images/38.png" />
          <p>彩票推荐</p>
        </li>-->

        <li>
          <router-link to="/doc/finance">
            <img src="../assets/images/45.png" />
            <p>金融资讯</p>
          </router-link>
        </li>
        <li>
          <a  href="javascript:void(0)" @click="dedk">
            <img src="../assets/images/46.png" />
            <p>大额贷款</p>
          </a>
        </li>
        <!--<li @click="building">
          <img src="../assets/images/47.png" />
          <p>车管家</p>
        </li>-->
        <div class="clear"></div>
      </ul>
    </div>
    <div id="slider" class="mui-slider" >
      <div class="mui-slider-group mui-slider-loop">
        <!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
        <div class="mui-slider-item mui-slider-item-duplicate">
          <a href='javascript:void(0)'>
            <img style="width: 100%" src="../assets/images/banner.jpg">
          </a>
        </div>
        <!-- 第一张 -->
        <div class="mui-slider-item">
          <a href='javascript:void(0)'>
            <img style="width: 100%" src="../assets/images/banner.jpg">
          </a>
        </div>
        <!-- 第二张 -->
        <div class="mui-slider-item">
          <a href='javascript:void(0)'>
            <img style="width: 100%" src="../assets/images/banner1.jpg">
          </a>
        </div>
        <!-- 第二张 -->
        <div class="mui-slider-item">
          <a href='javascript:void(0)'>
            <img style="width: 100%" src="../assets/images/banner2.jpg">
          </a>
        </div>

        <!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
        <div class="mui-slider-item mui-slider-item-duplicate">
          <a href='javascript:void(0)'>
            <img style="width: 100%" src="../assets/images/banner.jpg">
          </a>
        </div>
      </div>
      <div class="mui-slider-indicator">
        <div class="mui-indicator mui-active"></div>
        <div class="mui-indicator"></div>
        <div class="mui-indicator"></div>
      </div>
    </div>
    <m-tabs tab="0"></m-tabs>
  </div>
</template>

<script>
import rest from "./rest";
import helper from "./helper";
import api from "./api";

export default {
  name: "home",
  data() {
    return {
      city: "未知",
      notice: { title: "暂无公告" },
      orderList: []
    };
  },
  mounted: function() {
    var slider = mui("#slider");
    slider.slider({
      interval: 3000
    });
    this.loadNearlyOrder();
    this.loadNearlyNotice();
    let initMuiAction = () => {
      var first = null;
      mui.back = function() {
        //首次按键，提示‘再按一次退出应用’
        if (!first) {
          first = new Date().getTime();
          mui.toast("再按一次退出应用");
          setTimeout(function() {
            first = null;
          }, 1000);
        } else {
          if (new Date().getTime() - first < 1000) {
            plus.runtime.quit();
          }
        }
      };
      initMuiAction();
    };
  },
  methods: {
    cash: function() {
      if (this.userInfo.auth_status == 2) {
        if (this.userInfo.card_branch_name) {
          if (this.userInfo.is_need_rebind == 1) {
            mui.confirm(
              "提示",
              "系统升级，请重新绑定信用卡",
              ["取消", "确认"],
              e => {
                if (e.index) {
                   this.$router.push('/card/modifyCreditCard');
                }
              }
            );
          } else {
            this.$router.push("/cash/unionpay");
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
      } else {
        this.$router.push("/cash/unionpay");
      }
    },
    dedk: function() {
      var title = '大额贷款';
      var url = "https://one.zhongan.com/fcp/msj-h5/#/?channel=Zy5yls046!drm"; 
      this.$router.push({ path:'/doc/common',query: { url: url,title:title }});
    },
    auth: function() {
      if (this.userInfo.auth_status < 1) {
        this.$router.push("/user/auth");
      } else {
        if (this.userInfo.auth_status === 1) {
          helper.toast("审核中，请耐心等待");
        }
      }
    },
    loadNearlyOrder: function() {
      rest.get(api.order.list_new).done(res => {
        if (helper.isSuccess(res)) {
          this.orderList = res.data || [];
        }
      });
    },
    loadNearlyNotice: function() {
      rest.get(api.doc.nearly, { type: 1, n: 1 }).done(res => {
        if (helper.isSuccess(res)) {
          if (res.data && res.data.length > 0) {
            this.notice = res.data[0];
          }
        }
      });
    },
    position: function() {
      var myCity = new BMap.LocalCity();
      myCity.get(result => {
        this.city = result.name.replace("市", "");
      });
    },
    rePosition: function() {
      helper.toast("已刷新当前位置");
      this.position();
    },
    renderStatus: function(status) {
      status = status || "0";
      return {
        "0": "发起",
        "1": "成功",
        "2": "失败",
        "3": "取消"
      }[status.toString()];
    },
    renderType: function(type) {
      type = type || "0";
      return {
        "0": "还款消费",
        "1": "充值",
        "2": "提现",
        "3": "纯消费"
      }[type.toString()];
    },
    renderCardNo: function(cardNo) {
      return cardNo.toString().substring(cardNo.length - 4, cardNo.length);
    }
  }
};
</script>
<style>
.scroll img {
  top: 7px;
}
.scroll {
  position: relative;
  top: 0;
}
.index-content {
  margin-top: 10px;
}
.index-box {
  position: relative;
  top: 0;
  margin-top: 44px;
}
.index-box a {
  float: left;
  width: 33%;
  color: #ffffff;
  margin: 20px 0;
}
header .mui-pull-right {
  width: 20%;
  text-align: right;
}
.bg-white {
  padding-bottom: 65px;
}
</style>
