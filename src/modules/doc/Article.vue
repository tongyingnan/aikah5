<template>

  <div class="doc bg-white">
    <m-head :title="doc.title" left="back"></m-head>
    <div class="mui-content">
      <div class="tg-content" v-html="doc.content"></div>
    </div>
  </div>
</template>

<script>
  import rest from '../rest';
  import helper from '../helper';
  import api from '../api';
  import config from '../../../config'

  export default {
    name: 'article',
    data () {
      return {
        doc: {
          title: config.appInfo.name
        }
      }
    },
    created: function () {
      var id = this.$route.query.id;
      if(id){
        this.queryDoc(id);
      }
    },
    methods: {
      queryDoc: function (id) {
        var that = this;
        rest.get(api.doc.article, {id: id}).done(function (res) {
          if(res.status === 0){
            that.doc = res.data;
          }else{
            helper.toast(res.msg)
          }
        });
      }
    }

  }
</script>

<style scoped>

</style>
