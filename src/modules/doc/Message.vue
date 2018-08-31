<template>
  <div class="doc-share">

    <m-head title="消息中心" left="back"></m-head>
    <div class="mui-slider bg-white account">
      <div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <a class="mui-control-item" :class="{'mui-active': tab === 0}" href="#tab0" @click="tab = 0">现金红包</a>
        <a class="mui-control-item" :class="{'mui-active': tab === 1}" href="#tab1" @click="tab = 1">分润消息</a>
        <a class="mui-control-item" :class="{'mui-active': tab === 2}" href="#tab1" @click="tab = 2">系统消息</a>
      </div>
      <!--第一个-->
      <div class="mui-slider-item mui-control-content p-minhei2" :class="{'mui-active': tab === 0}" id="tab0">
        <div class="mui-scroll-wrapper " id="upRefreshList">
          <div class="mui-scroll">
            <ul class="home-message">
              <li v-for="(item, index) in list" :class="item.selected ? 'border-success': ''">
                <div class="message-up clearfix">
                  <h4>红包来了</h4>
                  <span>{{new Date(item.start_time).format('yyyy-MM-dd')}}</span>
                </div>
                <p>恭喜您名下1544**255用户已实名认证，您获得{{fixed(item.money/100)}}元的现金红包奖励</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--第一个-->
      <!--第二个-->
      <div class="mui-slider-item p-minhei2 mui-control-content" :class="{'mui-active': tab === 1}" id="tab1">
        <div class="mui-scroll-wrapper">
          <div class="mui-scroll">
             <ul class="home-message">
               <li>
                 <div class="message-up clearfix">
                   <h4>分润红包来了</h4>
                   <span>2017-25-02 12:15:15</span>
                 </div>
                 <p>爱卡的分销分润模式、吸引了众多用户的参与，以及市场的积极反应</p>
               </li>
               <li>
                 <div class="message-up clearfix">
                   <h4>分润红包来了</h4>
                   <span>2017-25-02 12:15:15</span>
                 </div>
                 <p>爱卡的分销分润模式、吸引了众多用户的参与，以及市场的积极反应、</p>
               </li>
               <li>
                 <div class="message-up clearfix">
                   <h4>分润红包来了</h4>
                   <span>2017-25-02 12:15:15</span>
                 </div>
                 <p>爱卡的分销分润模式、吸引了众多用户的参与，以及市场的积极反应</p>
               </li>
             </ul>
          </div>
        </div>
      </div>
      <!--第二个-->
      <!--第二个-->
      <div class="mui-slider-item p-minhei2 mui-control-content" :class="{'mui-active': tab === 2}" id="tab2">
        <div class="mui-scroll-wrapper">
          <div class="mui-scroll">
            <ul class="home-message">
              <li>
                <div class="message-up clearfix">
                  <h4>系统消息</h4>
                  <span>2017-25-02 12:15:15</span>
                </div>
                <p>爱卡的分销分润模式、吸引了众多用户的参与，以及市场的积极反应</p>
              </li>
              <li>
                <div class="message-up clearfix">
                  <h4>系统消息</h4>
                  <span>2017-25-02 12:15:15</span>
                </div>
                <p>爱卡的分销分润模式、吸引了众多用户的参与，以及市场的积极反应、</p>
              </li>
              <li>
                <div class="message-up clearfix">
                  <h4>系统消息</h4>
                  <span>2017-25-02 12:15:15</span>
                </div>
                <p>爱卡的分销分润模式、吸引了众多用户的参与，以及市场的积极反应</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--第二个-->
    </div>
  </div>
</template>

<script>

  import rest from '../rest'
  import api from '../api'
  import helper from '../helper'

  export default {
    name: 'Message',
    data () {
      return {
        tab: 0,
        list: [],
        npage: 1,
        selectedCoupons: [],
        isSelect: Boolean(this.$route.query.isSelect),
        allSelectedMoney: 0
      }
    },
    mounted: function () {
      this.selectedCoupons = helper.getJson('selectedCoupons') || [];
      mui('#upRefreshList').pullRefresh({
        container: "#upRefreshList",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        up : {
          height: 50,//可选.默认50.触发上拉加载拖动距离
          auto: true,//可选,默认false.自动上拉加载一次
          contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
          contentnomore: '没有更多红包了',//可选，请求完毕若没有更多数据时显示的提醒内容；
          callback: this.loadList
        }
      });
    },
    methods: {
      loadList: function () {
        rest.get(api.coupon.list, {npage: this.npage}).done(res => {
          if(helper.isSuccess(res)){
            if(this.npage === 1){
              this.list = [];
            }
            if(res.data && res.data.length > 0){

              for(var j=0; j<res.data.length; j++){
                var c = res.data[j];
                for(var i=0; i<this.selectedCoupons.length; i++){
                  var sc = this.selectedCoupons[i];
                  if(sc.id === c.id){
                    c.selected = true;
                    res.data[j] = c;
                    break;
                  }
                }
              }
              this.list = this.list.concat(res.data);
              this.npage += 1;
              this.computeSelected();
              mui('#upRefreshList').pullRefresh().endPullupToRefresh(false);
            }else{
              mui('#upRefreshList').pullRefresh().endPullupToRefresh(true);
            }
          }
        });
      },
      selectCoupon: function (i) {
        this.list[i].selected = !this.list[i].selected;
        this.list = [].concat(this.list);
        this.computeSelected();

      },
      useCoupon: function () {
        if(this.isSelect){
          this.$router.go(-1);
        }else{
          this.$router.push('/card/home');
        }
      },
      computeSelected: function () {
        this.allSelectedMoney = 0;
        var selected = [];
        for(var i=0; i<this.list.length; i++){
          if(this.list[i].selected){
            selected.push(this.list[i]);
            this.allSelectedMoney += this.list[i].money;
          }
        }
        helper.setJson({'selectedCoupons': selected});
      }
    }
  }
</script>

<style scoped>
  .index-bill{
    padding-bottom: 0;
  }
  .child-view{
    background-color: #fff;
  }
  .mui-segmented-control .mui-control-item{
    width: 33.3%;
  }
  .mui-pull-bottom-pocket {
    position: absolute;
    bottom: -42px;
  }

</style>
