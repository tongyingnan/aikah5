<template>
  <div class="doc-finance bg-white">
    <m-head title="金融资讯" left="back"></m-head>
    <div class="mui-content">
      <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <a class="mui-control-item mui-active" href="#item2">信用卡攻略</a>
          <a class="mui-control-item" href="#item3">贷款攻略</a>
          <a class="mui-control-item" href="#item4">提额攻略</a>
        </div>

        <div class="mui-slider-item mui-control-content mui-active" id="item2">
          <ul class="mui-table-view phb">
            <li class="mui-table-view-cell" @click="$router.push('/doc/article?id=' + item.id)" v-for="item in doc.type2">
              <h5>{{item.title}}</h5>
              <p>{{item.desc}}</p>
            </li>
          </ul>
        </div>

        <div class="mui-slider-item mui-control-content" id="item3">
          <ul class="mui-table-view phb">
            <li class="mui-table-view-cell" @click="$router.push('/doc/article?id=' + item.id)" v-for="item in doc.type3">
              <h5>{{item.title}}</h5>
              <p>{{item.desc}}</p>
            </li>
          </ul>
        </div>

        <div class="mui-slider-item mui-control-content" id="item4">
          <ul class="mui-table-view phb">
            <li class="mui-table-view-cell" @click="$router.push('/doc/article?id=' + item.id)" v-for="item in doc.type4">
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
    name: 'docFinance',
    data () {
      return {
        doc:{
          type2: [],
          type3: [],
          type4: []
        }
      }
    },
    mounted: function () {
      this.loadDocList(2);
      this.loadDocList(3);
      this.loadDocList(4);
    },
    methods: {
      loadDocList: function (type) {
        rest.get(api.doc.list, {type}).done(res => {
          if(helper.isSuccess(res)){
            this.doc['type' + type] = res.data;
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
