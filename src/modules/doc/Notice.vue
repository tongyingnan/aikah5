<template>
  <div class="user-notice bg-white">
    <m-head title="通知公告" left="back"></m-head>
    <div class="mui-content">
      <div id="slider" class="mui-slider">

        <div class="mui-slider-item mui-control-content mui-active" v-show="tab===0">
          <ul class="mui-table-view phb">
            <li class="mui-table-view-cell" @click="$router.push('/doc/article?id=' + item.id)" v-for="item in list">
              <h5>{{item.title}}</h5>
              <p>{{item.desc}}</p>
            </li>
          </ul>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

  import helper from '../helper'
  import api from '../api'
  import rest from '../rest'

  export default {
    name: 'docNotice',
    data () {
      return {
        tab: 0,
        list: []
      }
    },
    mounted: function () {
      this.loadNoticeList();
    },
    methods: {
      loadNoticeList: function () {
        rest.get(api.doc.list, {type: 1}).done(res=>{
          if(helper.isSuccess(res)){
            this.list = res.data || [];
          }
        });
      }
    }
  }
</script>

<style scoped>
  .mui-table-view-cell p{
    color:#1eaaf1;
    font-size:12px;
  }
</style>
