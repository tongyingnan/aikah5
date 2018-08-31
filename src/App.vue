<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <!--加载中-->
    <div class="m-dialog s-dialog" id="appLoading">
      <img src="./assets/images/load.gif" class="loading-img">
      <p class="tt T5 abs"></p>
    </div>
    <!--节日弹窗-->
    <div class="fesTiv" id="fesTiv"  v-show="nopop" >
      <div class="festiv-dw">
        <div class="festiv-nei"  >
          <div data-v-1b5ef610="" class="pop-close"  @click="poclose">×</div>
          <a href="javascript:void(0)" v-html="notice.content" >
            <!--<img src="../../assets/images/festive-img.png">-->
            <!--<p>测试文字饭</p>-->
            <!--{{notice.content}}-->
          </a>
        </div>
      </div>
      <div class="festiv-dw text"></div>
    </div>
    <div class="contact-pop-bg"  v-show="nopop" @click="poclose"  ></div>
    <div id="deletePop" class="mui-popover mui-popover-action mui-popover-bottom">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell" @click="turnToPay('paybank')">
          <a href="javascript:void(0)">网银支付</a>
        </li>
        <li class="mui-table-view-cell" @click="turnToPay('weixin')">
          <a href="javascript:void(0)">微信支付</a>
        </li>
        <!--<li class="mui-table-view-cell" @click="turnToPay('alipay')">
          <a href="javascript:void(0)">支付宝支付</a>
        </li>-->
      </ul>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <a href="#deletePop" style="color: #007aff;"><b>取消</b></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
require("./assets/css/style.css");
require("./assets/js/common");
import store from "./modules/vuex/store.js";
import { isLogin } from "./modules/util";
import ignore from "./config/ignore";
import rest from "./modules/rest";
import api from "./modules/api";
import helper from "./modules/helper";

export default {
  name: "app",
  data() {
    return {
      transitionName: "fade",
      nopop: false, //z
      notice: {
        //z
        content: ""
      }
    };
  },

  methods: {
    poclose: function() {
      this.nopop = false;
    },
    loadNearlyNotice: function() {
      //通知图
      rest.get(api.doc.article, { id: 58 }).done(res => {
        if (res.data && res.data.status === 1) {
          this.notice = res.data;
          this.nopop = true;
        }
      });
    }
  },

  created: function() {
    this.loadNearlyNotice(); //z
    this.freshSystemInfo(systemInfo => {
      if (this.appInfo.version < systemInfo.appinfo.version) {
        var msg =
          systemInfo.appinfo.versionInfo || "发现新版本，是否马上升级？";
        var btn;
        if (systemInfo.appinfo.force) {
          btn = ["下载"];
        } else {
          btn = ["下载", "取消"];
        }
        if (mui.os.android) {
          mui.confirm("", msg, btn, e => {
            if (!e.index) {
              location.href =
                "http://apk.akzngj.com?app=" + this.appInfo.package;
              if (systemInfo.appinfo.force) {
                return false;
              }
            }
          });
        }
      }
    });
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      if (toDepth == fromDepth) {
        this.transitionName = "fade";
      } else if (toDepth < fromDepth) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
    }
  },
  store: store,
  mounted: function() {
    var that = this;

    this.$router.beforeEach((to, from, next) => {
      //登录验证
      if (isLogin() || ignore.test(to.path)) {
        next();
      } else {
        next("/user/login");
      }
    });
  }
};
</script>
