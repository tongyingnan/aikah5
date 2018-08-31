<template>
  <div class="card-help">
    <m-head title="我的银行卡" left="back"></m-head>
     <div class="debit">
       <h2>借记卡</h2>
       <div class="debit_card">
         <a href="javascript:void(0)" @click="addCard">
           <form class="form_one">
              <span><img src="../../assets/images/debit_img1.png" class="debit_icon" ></span>
              <em>添加银行卡</em>
           </form>
         </a>
       </div>
     </div>

  </div>
</template>
<script>

  import helper from '../helper'
  import rest from '../rest'
  import api from '../api'
  import bank from '../../config/bank'

  export default{
    name: 'debitCard',
    data () {
      return {
        bank: bank,
        cardList: [],
      }
    },
    mounted: function () {
      this.loadCardList();
    },
    methods: {
      loadCardList: function () {
        rest.get(api.card.list).done(res => {
          this.cardList = res.data || [];
        });
      },
      selectCard: function (cardType) {
//        mui('#cardPopover').popover('toggle');
//        if(cardType !== -1){
//          this.$router.push('/card/add?type='+cardType);
//        }
      },
      removeCard: function (id, type) {
        var msg = type ? '删除卡片将终止该卡所有未执行的还款计划，确认删除吗？': '确认删除吗？';
        mui.confirm(msg,'', ['确认', '取消'], e => {
          if(!e.index){
            rest.delete(api.card.remove, {id, type}).done(res => {
              if(helper.isSuccess(res)){
                this.loadCardList();
              }
            });
          }
        });
      },
      turnToDetail: function (id, type) {
        if(type){
          this.$router.push('/card/detail?id=' + id);
        }
      },
      modifyCard: function (id, type) {
        this.$router.push('/card/add?action=modify&id='+id+'&type='+type);
      },
      addCard: function () {
        var msg = '尚未完成实名认证，';
        switch(this.userInfo.auth_status){
          case 0: msg += '请在用户中心提交实名认证信息'; break;
          case 1: msg += '请耐心等待审核结果'; break;
          case -2: msg += '审核失败，请重新提交认证材料';break;
          case 2: msg = '';break;
        }
        this.$router.push('/card/add?type=0');
//        if(msg){
//          helper.toast(msg);
//        }else{
//          mui('#cardPopover').popover('toggle');
//        }
      }
    }
  }
</script>
<style scoped>
  .card-help{
    margin-top: 54px;
  }
  .mui-card{
    margin-top: 10px;
    box-shadow: none;
  }
  .mui-card-content{
    display: none;
  }
</style>
