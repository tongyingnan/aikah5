<template>

  <header class="mui-bar mui-bar-nav w-nav">

    <!--左侧-->
    <slot name="left">
      <div id = "back" class="mui-icon mui-icon-left-nav mui-pull-left" v-if="left==='back'" @click="turnBack"></div>
    </slot>

    <!--标题-->
    <slot name="title">
      <h1 class="mui-title">{{title || appInfo.name}}</h1>
    </slot>


    <!--右侧-->
    <slot name="right"></slot>

  </header>
</template>

<script>
  export default {
    name: 'head',
    data () {
      return {}
    },
    props: ['left', 'title'],
    methods: {
      turnBack: function (e) {
        this.$router.go(-1);
      }
    }
  }
</script>
<style scoped>
  header{
    background: #1eaaf1;
    font-size: 14px;
  }
  header *{
    color: #fff;
  }
  header .mui-pull-right{
    margin-top: 12px;
  }
  header .mui-title + .mui-icon{
    margin-top: 0;
  }
</style>
