<template>
  <div class="user-setting">
    <m-head title="关于我们" left="back"></m-head>

    <div class="mui-page-content account">
      <ul class="mui-table-view">

          <li class="mui-table-view-cell padding10" @click="$router.push('/card/help')">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>帮助中心</label>
                <input type="text" placeholder="" value="" disabled>
              </div>
            </div>
          </li>

        <!--$router.push('/doc/concat')-->
        <!--<li class="mui-table-view-cell padding10" @click="pop">-->
          <!--<div class="mui-navigate-right">-->
            <!--<div class="mui-input-row">-->
              <!--<label>客服热线</label>-->
              <!--<input type="text" disabled placeholder="">-->
            <!--</div>-->
          <!--</div>-->
        <!--</li>-->

        <!--$router.push('/user /advice')-->
        <!--<li class="mui-table-view-cell padding10" @click="advice">-->
          <!--<div class="mui-navigate-right">-->
            <!--<div class="mui-input-row">-->
              <!--<label>意见反馈</label>-->
              <!--<input type="text" disabled placeholder="" />-->
            <!--</div>-->
          <!--</div>-->
        <!--</li>-->

        <li class="mui-table-view-cell padding10" @click="$router.push('/doc/article?id=12')">
          <div class="mui-navigate-right">
            <div class="mui-input-row">
              <label>用户协议</label>
              <input type="text" disabled placeholder="" />
            </div>
          </div>
        </li>

        <!--<li class="mui-table-view-cell padding10" @click="$router.push('/doc/partner')">-->
          <!--<div class="mui-navigate-right">-->
            <!--<div class="mui-input-row">-->
              <!--<label>商务合作</label>-->
              <!--<input type="text" disabled placeholder="" />-->
            <!--</div>-->
          <!--</div>-->
        <!--</li>-->
        <li class="mui-table-view-cell padding10" @click="update"  v-show="platform === 0">
          <div class="">
            <div class="mui-input-row">
              <label>检查更新</label>
              <input type="text" disabled placeholder="" />
              <span class="date-new-span">{{version}}</span>
            </div>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
//  var popheight = $(".contact-pop").height();
//  alert(popheight)
//  $(".contact-pop").css("margin-top",-popheight);
import helper from "../helper";
export default {
  name: "docAboutus",
  data() {
    return {
      version: "",
      platform: 1,
      nopop: false
    };
  },
  created: function() {
    this.version = this.systemInfo.appinfo.version;
    if (mui.os.android) {
      this.platform = 0;
    }
  },
  methods: {
    advice: function() {
      helper.alert(
        "请微信搜索关注“" + this.appInfo.name + "”官方公众号与我们互动",
        "",
        ["确定"],
        function(e) {}
      );
    },
    update: function() {
      this.freshSystemInfo(systemInfo => {
        if (this.appInfo.version < systemInfo.appinfo.version) {
          mui.confirm(
            "",
            "发现新版本，是否马上升级？",
            ["下载", "暂不升级"],
            e => {
              if (!e.index) {
                location.href =
                  "http://apk.akzngj.com?app=" + this.appInfo.package;
              }
            }
          );
        } else {
          helper.toast("当前已是最新版本");
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
