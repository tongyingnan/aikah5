<template>
  <div class="coupon">
    <m-head title="我的红包" left="back"></m-head>

    <div class="mui-content mui-scroll-wrapper" id="upRefreshList">
      <div class="mui-scroll">
        <ul class="red-card">
          <li v-for="(item, index) in list" @click="selectCoupon(index)" :class="item.selected ? 'border-success': ''">
            <div class="fl">
              <h4><i>¥</i>{{fixed(item.money/100)}}</h4>
              <p class="w70">满1000元可用</p>
            </div>
            <div class="fl cent">
              <h2>抵用券</h2>
              <p>生效时间：{{new Date(item.start_time).format('yyyy-MM-dd')}}</p>
              <p>失效时间：{{new Date(item.end_time).format('yyyy-MM-dd')}}</p>
            </div>
            <div class="fr right-red">
              <p>可叠加</p>
            </div>
            <img src="../../assets/images/new.png">
            <div class="clear"></div>
          </li>
        </ul>
      </div>
    </div>
    <div class="sk-next"><button data-v-d9b3d142="" type="button" class="mui-btn" @click="useCoupon">合计：{{fixed(allSelectedMoney/100)}}元，立即使用</button></div>
  </div>
</template>

<script>
  import rest from '../rest'
  import api from '../api'
  import helper from '../helper'
  export default {
    name: 'couponHome',
    data () {
      return {
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
          contentnomore: '没有更多抵用券了',//可选，请求完毕若没有更多数据时显示的提醒内容；
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
  .list .item{
    font-size: 14px;
  }
  .item h1{
    font-size: 30px;
  }
  .border-success{
    border-color: red;
  }
  .sk-next{
    width: 100%;
    position: absolute;
    bottom: 10px;
    z-index: 999;
    text-align: center;
    margin: 0;
  }
  .sk-next button{
    width: 96%;
  }
</style>
