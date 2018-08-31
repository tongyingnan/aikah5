<template>
  <div class="doc-share">

    <m-head title="分享文案库" left="back"></m-head>
    <div class="mui-content mui-scroll-wrapper index-bill" id="upRefreshList">
      <div class="mui-scroll">
        <ul class="mui-content my_yinxiao_ul">
          <li class="my_yinxiao_li" v-for="(item, index) in docs">
            <div class="my_yinxiao_time">
              <p class="my_yinxiao_date">{{new Date(item.create_time).format('MM月dd日')}}</p>
              <p class="my_yinxiao_time">{{new Date(item.create_time).format('hh:mm')}}</p>
            </div>
            <div>
              <p>{{item.opened ? item.content : item.content.substring(0, 60)}}</p>
              <a href="javascript:void(0)" @click="changeStatus(index)">... {{item.opened?'收起':'全文'}}</a>
            </div>
            <img :src="item.image"/>
            <div class="buttom_group">
              <button class="my_button" @click="copyImg(item.image)">保存图片</button>
              <button class="my_button copyText" :data-clipboard-text="item.content">复制文案</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  import rest from '../rest'
  import api from '../api'
  import helper from '../helper'

  export default {
    name: 'docShare',
    data () {
      return {
        npage: 1,
        docs: [],
      }
    },
    mounted: function () {
      mui('#upRefreshList').pullRefresh({
        container: "#upRefreshList",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        up : {
          height: 50,//可选.默认50.触发上拉加载拖动距离
          auto: true,//可选,默认false.自动上拉加载一次
          contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
          contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
          callback: this.loadList
        }
      });
    },
    updated: function () {
      var btns = document.querySelectorAll('.copyText');
      var clipboard = new Clipboard(btns);
      clipboard.on('success', function(e) {
        helper.toast('已复制');
      });
      clipboard.on('error', function(e) {
        helper.toast('复制失败');
      });
    },
    methods: {
      loadList: function () {
        rest.get(api.doc.list, {type: 6, npage: this.npage}).done(res => {
          if(helper.isSuccess(res)){
            if(this.npage === 1){
              this.docs = [];
            }
            if(res.data.length > 0){
              this.docs = this.docs.concat(res.data);
              this.npage += 1;
              mui('#upRefreshList').pullRefresh().endPullupToRefresh(false);
            }else{
              mui('#upRefreshList').pullRefresh().endPullupToRefresh(true);
            }
          }
        });
      },
      changeStatus: function (index) {
        var item = this.docs[index];
        item.opened = !item.opened;
        var docs = new Array().concat(this.docs);
        docs[index] = item;
        this.docs = docs;
      },
      copyImg: function (imgUrl) {
        let tried = false;
        let nativeSave = ()=> {
          try{
            nativeIOS.saveImg(imgUrl);
          }catch(e){
            console.info(e);
            if(!tried){
              tried = true;
              nativeSave();
            }else{
              location.href = imgUrl;
            }
          }
        }
        nativeSave();
      }
    }
  }
</script>

<style scoped>
  .index-bill{
    padding-bottom: 0;
  }

</style>
