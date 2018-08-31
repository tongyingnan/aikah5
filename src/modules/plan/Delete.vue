<template>
  <div class="plan-create">
    <m-head title="提前终止还款规划" left="back"></m-head>
    <div class="get-money">
      <div class="mui-input-group">
        <div class="mui-input-row">
          <label>卡号</label>
          <input type="text" placeholder="请输入卡号" v-model="card_no">
        </div>
      </div>
      <div class="get-money-tag">
        <p>提示：提前终止计划是终止该信用卡未来一小时之外的所有计划，即将执行的计划不能终止。</p>
      </div>
      <div class="sk-next">
        <button type="button" class="mui-btn mui-btn-primary" @click="submit">确认预约</button>
      </div>
    </div>

  </div>
</template>

<script>
  import api from '../api';
  import rest from '../rest';
  import helper from '../helper';

  export default {
    name: 'planCreate',
    data () {
      return Object.assign({
        card_id: '',
        card_no: ''
      }, this.$route.query);
    },
    methods: {
      submit: function () {

        rest.post(api.plan.delete, {card_id: this.card_id}).done(res => {
          if(helper.isSuccess(res)){
            helper.toast('预约成功');
          }
        });
      }
    }
  }
</script>
<style scoped>

</style>
