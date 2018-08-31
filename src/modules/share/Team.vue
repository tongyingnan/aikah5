<template>
  <div class="share-team">
    <m-head title="我的团队" left="back"></m-head>
    <div class="mui-page-content account">

      <div class="repay-cont">
        <ul>
          <li>
            <p>昨日收益</p>
            <h3>+{{renderMoney(userInfo.sum_commission_yestoday)}}元</h3>
          </li>
          <li>
            <p>今日收益</p>
            <h3>+{{renderMoney(userInfo.sum_commission_today)}}元</h3>
          </li>
          <li>
            <p>累计收益</p>
            <h3>+{{renderMoney(userInfo.sum_commission_all)}}元</h3>
          </li>
          <div class="clear"></div>
        </ul>
      </div>

      <!--ljj简介分润和直接分润的内容一致-->
      <ul class="mui-table-view">

        <li class="mui-table-view-cell padding10" @click="opened.level2 = !opened.level2">
          <div class="first">
            <div class="mui-input-row">
              <label>直接分润</label>
              <i class="icon icon-xs icon-list-b" :class="{'icon-list-t': opened.level2}"></i>
            </div>
          </div>
        </li>

        <div v-show="opened.level2">
          <!--<li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>办卡推广分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_registcard2)">
              </div>
            </div>
          </li>


          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>贷款推广分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_loan2)">
              </div>
            </div>
          </li>
          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>贷还分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_loanpay2)">
              </div>
            </div>
          </li>-->
          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>总人数</label>
                <input type="text" disabled="" class="text-align-left" :value="userInfo.c_direct_friends + '人'">
              </div>
            </div>
          </li>

          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>收款分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_cash2)">
              </div>
            </div>
          </li>
          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>智能还款分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_repayment2)">
              </div>
            </div>
          </li>
          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>升级VIP分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_upvip2)">
              </div>
            </div>
          </li>
        </div>

      </ul>
      <!--间接分润-->
      <ul class="mui-table-view marginTop10">

        <li class="mui-table-view-cell padding10" @click="opened.level3 = !opened.level3">
          <div class="first">

            <div class="mui-input-row">
              <label>间接分润</label>
              <i class="icon icon-xs icon-list-b" :class="{'icon-list-t': opened.level3}"></i>
            </div>

          </div>
        </li>

        <div v-show="opened.level3">
          <!--<li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>办卡推广分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_registcard3)">
              </div>
            </div>
          </li>


          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>贷款推广分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_loan3)">
              </div>
            </div>
          </li>
          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>贷还分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_loanpay3)">
              </div>
            </div>
          </li>-->

          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right noright">
              <div class="mui-input-row">
                <label>总人数</label>
                <input type="text" disabled="" class="text-align-left" :value="userInfo.c_indirect_friends + '人'">
              </div>
            </div>
          </li>

          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>收款分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_cash3)">
              </div>
            </div>
          </li>

          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>智能还款分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_repayment3)">
              </div>
            </div>
          </li>
          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>升级VIP分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_upvip3)">
              </div>
            </div>
          </li>
        </div>

      </ul>
      <!--间接分润结束-->
      <ul class="mui-table-view marginTop10">

        <li class="mui-table-view-cell padding10" @click="opened.level4 = !opened.level4">
          <div class="first">

            <div class="mui-input-row">
              <label>代理商分润</label>
              <i class="icon icon-xs icon-list-b" :class="{'icon-list-t': opened.level4}"></i>
            </div>

          </div>
        </li>

        <div v-show="opened.level4">
          <!--<li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>办卡推广分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_registcard3)">
              </div>
            </div>
          </li>


          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>贷款推广分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_loan3)">
              </div>
            </div>
          </li>
          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>贷还分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_loanpay3)">
              </div>
            </div>
          </li>-->

          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right noright">
              <div class="mui-input-row">
                <label>总人数</label>
                <input type="text" disabled="" class="text-align-left" :value="userInfo.c_indirect_friends + '人'">
              </div>
            </div>
          </li>

          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>收款分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_cash3)">
              </div>
            </div>
          </li>

          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>智能还款分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_repayment3)">
              </div>
            </div>
          </li>
          <li class="mui-table-view-cell padding10">
            <div class="mui-navigate-right">
              <div class="mui-input-row">
                <label>升级VIP分润</label>
                <input type="text" disabled="" class="text-align-left" :value="renderMoney(userInfo.sum_commission_upvip3)">
              </div>
            </div>
          </li>
        </div>

      </ul>

    </div>
    <div class="sk-next">
      <router-link to="/cash/draw" class="mui-btn mui-btn-primary">分润提现</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shareTeam',
    data () {
      return {
        opened: {
          level2: false,
          level3: false,
          level4: false,
        }
      }
    },
  }
</script>

<style scoped>
  .mui-input-row label~input, .mui-input-row label{
    width: 46%;
  }
  .noright:after{
    display: none;
  }

</style>
