<template>
  <div class="cash-success">
    <m-head :title="title + '详情'" left="back"></m-head>

    <div class="mui-content"  >
      <div class="tx-detaile">
        <div>
          <img class="success-ico" src="../../assets/images/success.png" />
        </div>
        <h5>{{renderMoney(realMoney * 100)}}元</h5>
        <p>{{title}}申请成功</p>
      </div>
      <div>
        <ul class="mui-table-view" id="upRefreshList">
          <li v-for="order in orders" >
            <a href="javascript:void(0)">
                <img class="fl" src="../../assets/images/54.png" />
                <div class="fl">
                  <h3>{{order.desc}}</h3>
                  <p>消费信用卡 尾号 （{{order.source_card_no.substring(order.source_card_no.length-4)}}）</p>
                  <p>{{new Date(order.create_time).format('yyyy/MM/dd hh:mm:ss')}}</p>
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
  import api from '../api'
  import helper from '../helper'
  import bank from '../../config/bank'
  export default {
    name: 'Info',
    data () {
      return {
        title: this.$route.query.cash? '收款': '提现',
        bank: bank,
        money: this.$route.query.money,
        nDepositCard: helper.getJson('nDepositCard'),
        nCreditCard: helper.getJson('nCreditCard'),
        realMoney: 0,
        types: [],
        orders: [],
        npage: 1,
        cardInfo:{}
      }
    },
    mounted: function () {
//      this.freshSystemInfo(systemInfo => {
//        this.realMoney = this.money * (1 - systemInfo.api.cash.feeRate/100) - systemInfo.api.cash.fixedAmount/100;
//      });
//      this.loadInfo(this.$route.query.id);
      this.loadList();

    },
    methods: {
      loadInfo: function (id) {
        rest.get(api.balance.info, {id}).done(res => {
          alert(api.balance.info)
          if(helper.isSuccess(res)){
            alert(this.cardInfo)
//            this.cardInfo = res.data || {};
//
//            if(this.cardInfo.repayment_money > 0){
//              this.loadRangePlanList();
//            }
          }
        });
      },
      changeFilter: function (e) {
        // TODO 筛选操作
        this.showfilter = !this.showfilter;
        this.npage = 1;
        this.loadList();
      },
      getSelectTypes: function () {
        var types = [];
        $('.mui-checkbox input').each(function (index, item) {
          if ($(item).is(':checked')) {
            types.push(item.value);
          }
        });
        return types.join(',');
      },
      renderStatus: function (status) {
        return ['已创建', '成功', '失败', '取消'][Number(status)];
      },
      loadList: function () {

        rest.get(api.balance.info, {npage: this.npage, types: this.getSelectTypes()}).done(res => {
          if (helper.isSuccess(res)) {
            if (this.npage === 1) {
              this.orders = [];
              console.log('error')
            }
            if (res.data && res.data.length > 0) {
              this.orders = this.orders.concat(res.data);
              console.log('成功');
              console.log(this.orders);
              this.npage += 1;
              mui('#upRefreshList').pullRefresh().endPullupToRefresh(false);
            } else {
              mui('#upRefreshList').pullRefresh().endPullupToRefresh(true);
            }
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
