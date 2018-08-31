<template>
  <nav class="mui-bar mui-bar-tab">
    <div class="mui-tab-item-p"  @click="$router.replace('/home')" :class="{'mui-active': tab==='0'}">
      <span class="mui-icon iconfont icon-shouye"></span>
      <span class="mui-tab-label">首页</span>
    </div>
    <div class="mui-tab-item-p"  @click="$router.push('/card')" id="cardList" :class="{'mui-active': tab==='1'}">
      <span class="mui-icon  iconfont icon-huankuan"></span>
      <span class="mui-tab-label">卡管家</span>
    </div>
    <div class="mui-tab-item-p" @click="$router.replace('/share')" :class="{'mui-active': tab==='2'}">
      <span class="mui-icon  iconfont icon-fenxiang"></span>
      <span class="mui-tab-label">分享</span>
    </div>
    <!--$router.replace('/market')-->
    <!--<div class="mui-tab-item-p" @click="building" :class="{'mui-active': tab==='3'}">
      <span class="mui-icon  iconfont icon-shangcheng"></span>
      <span class="mui-tab-label">发现</span>
    </div>-->
    <div class="mui-tab-item-p" @click="$router.replace('/user')" :class="{'mui-active': tab==='4'}">
      <span class="mui-icon  iconfont icon-wode"></span>
      <span class="mui-tab-label">我的</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'tabs',
  data(){
    return {};
  },
  props: ['tab'],
}
</script>
<style scoped>

</style>
