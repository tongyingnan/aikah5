<template>
  <div class="share-home">
    <m-head title="分享主页"></m-head>
    <div class="mui-page-content account">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell padding10" v-show="">
          <div class="mui-navigate-right">
            <router-link to="/share/ranks">
              <div class="mui-input-row">
                <label class="w65">排行榜</label>
                <input class="w35" type="text" readonly value="你的努力上榜了">
              </div>
            </router-link>
          </div>
        </li>
        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right">
            <router-link to="/doc/article?id=6">
              <div class="mui-input-row">
                <label class="w65">快速推广</label>
                <input class="w35" type="text" readonly value="快速推广一学就会">
              </div>
            </router-link>
          </div>
        </li>
        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right">
            <router-link to="/share/qrcode">
              <div class="mui-input-row">
                <label class="w65">分享二维码</label>
                <input class="w35" type="text" readonly value="分享不停红包不停" />
              </div>
            </router-link>
          </div>
        </li>
        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right">
            <router-link to="/doc/share">
              <div class="mui-input-row">
                <label class="w65">分享文案库</label>
                <input class="w35" type="text" readonly value="图片文案不再是难事">
              </div>
            </router-link>
          </div>
        </li>
      </ul>

      <ul class="mui-table-view marginTop10 ph-fe" v-show="">
        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right">
            <a href="">
              <div class="mui-input-row">
                <label class="w65">办卡推广</label>
                <input class="w35" type="text" readonly placeholder="">
              </div>
              <p>邀请好友办卡得丰厚利润</p>
              <p>已分出利润：0.00元</p>
              <p>成功办卡：0人</p>
            </a>
          </div>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right">
            <a href="">
              <div class="mui-input-row">
                <label class="w65">贷款推广</label>
                <input class="w35" type="text" readonly placeholder="">
              </div>
              <p>邀请好友贷款得丰厚利润</p>
              <p>已分出利润：0.00元</p>
              <p>成功贷款：0人</p>
            </a>
          </div>
        </li>
        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right">
            <a href="">
              <div class="mui-input-row">
                <label class="w65">收款推广</label>
                <input class="w35" type="text" readonly placeholder="">
              </div>
              <p>邀请好友收款得丰厚利润</p>
              <p>已分出利润：0.00元</p>
              <p>成功收款：0人</p>
            </a>
          </div>
        </li>
      </ul>
      <router-link to="/share/vip">
        <img src="../../assets/images/vip3.jpg" style="width: 100%; padding: 10px;"/>
      </router-link>


    </div>
    <m-tabs tab="2"></m-tabs>
  </div>
</template>

<script>

  // TODO mui插件的初始化问题
  export default {
    name: 'shareHome',
    data () {
      return {}
    },
  }
</script>
<style scoped>
  .mui-table-view-cell{
    white-space: nowrap;
  }
</style>
