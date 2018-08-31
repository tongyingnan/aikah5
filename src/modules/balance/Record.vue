<template>
  <div class="balance-record bg-white">
    <m-head title="我的账单" left="back">
      <label slot="right" class="mui-icon mui-icon-more mui-pull-right" @click="showfilter=!showfilter;"></label>
    </m-head>


    <div class="bill-right" v-show="showfilter">
      <ul>
        <li style="width: 128px;">
          <div class="mui-input-row mui-checkbox">
            <label>入账记录</label>
            <input name="checkbox1" class="check" value="10" type="checkbox" checked/>
          </div>
        </li>
        <li >
          <div class="mui-input-row mui-checkbox">
            <label>出账记录</label>
            <input name="checkbox1" class="check" value="-10"  type="checkbox" checked/>
          </div>
        </li>
        <li>
          <div class="mui-input-row mui-checkbox">
            <label>vip充值</label>
            <input name="checkbox1" class="check" value="-1001"  type="checkbox" checked/>
          </div>
        </li>
        <li>
          <div class="mui-input-row mui-checkbox">
            <label>分润记录</label>
            <input name="checkbox1" class="check" value="1000"  type="checkbox" checked/>
          </div>
        </li>
        <li>
          <div class="mui-input-row mui-checkbox">
            <div class="last-serch" @click="changeFilter">筛选</div>
          </div>
        </li>
      </ul>
    </div>
    <!--列表-->
    <div class="mui-content mui-scroll-wrapper index-bill" id="upRefreshList">
      <div class="mui-scroll">
        <ul>
          <li v-for="order in orders">
            <a href="javascript:void(0)">
              <!--<router-link :to="'/balance/detail?id=' + order.id">-->
              <!--<img class="fl" src="../../assets/images/54.png" />-->
              <!--<i :class="'icon icon-md icon-bank-' + bank.get(item.card_bank).icon">-->
              <div :class="'img icon-record ' + initOrderIcon(order)"></div>
              <div class="fl">
                <h3>{{order.desc}}</h3>
                <p>消费信用卡 尾号 （{{order.source_card_no.substring(order.source_card_no.length-4)}}）</p>
                <p>{{new Date(order.create_time).format('yyyy/MM/dd hh:mm:ss')}}</p>
                <p>订单编号{{order.order_no}}</p>
                <button class="my_button copyText" :data-clipboard-text="order.order_no">复制订单</button>
              </div>
              <div class="fr">
                <h5>¥ {{renderMoney(order.money)}}</h5>
                <p style="color: #1eaaf1">{{renderStatus(order.status)}}</p>
              </div>
              <div class="clear"></div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import rest from '../rest'
  import helper from '../helper'
  import api from '../api'

  export default {
    name: 'balanceRecord',
    data () {
      return {
        showfilter: false,
        types: [],
        orders: [],
        npage: 1
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
      mui('#upRefreshList').on('tap', 'a', function () {
        location.href = this.href;
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
      changeFilter: function (e) {
        // TODO 筛选操作
        this.showfilter = !this.showfilter;
        this.npage = 1;
        this.loadList();
      },
      initOrderIcon: function (order) {
        switch (order.type){
          case -1001: return 'img-record-ico2';
          case -1000: return 'img-record-ico0';
          case 1001: return 'img-record-ico4';
          case 1002: return 'img-record-ico5';
          default: return 'img-record-ico1';
        }
      },
      getSelectTypes: function () {
        var types = [];
        $('.mui-checkbox input').each(function (index, item) {
          if($(item).is(':checked')){
            types.push(item.value);
          }
        });
        return types.join(',');
      },
      renderStatus: function (status) {
        return ['已创建', '成功', '失败', '取消'][Number(status)];
      },
      loadList: function () {
        rest.get(api.balance.record, {npage: this.npage, types: this.getSelectTypes()}).done(res => {
          if(helper.isSuccess(res)){
            if(this.npage === 1){
              this.orders = [];
            }
            if(res.data && res.data.length > 0){
              this.orders = this.orders.concat(res.data);
              this.npage += 1;
              mui('#upRefreshList').pullRefresh().endPullupToRefresh(false);
            }else{
              mui('#upRefreshList').pullRefresh().endPullupToRefresh(true);
            }
          }
        });
      }
    }
  }
</script>
<style>
  .fr{
    text-align: right;
  }
  .mui-pull-bottom-pocket{
    position: absolute;
    bottom: -42px;
  }
  .bill-right .check{
    z-index: -1;
  }
</style>
