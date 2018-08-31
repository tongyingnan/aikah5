<template>
  <div class="share-vip bg-white">
    <m-head title="团队建设" left="back">
      <router-link slot="right" to="/share/viphelp" class="mui-pull-right">会员说明</router-link>
    </m-head>
    <div class="vip-page">
      <!--移动过来的-->
      <div class="mui-page-content account">

        <div class="repay-cont yesterday">
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
        <div class="index-content">
          <h2><i>|</i>分润详情</h2>
        </div>
        <ul class="mui-table-view marginTop1" >

          <li class="mui-table-view-cell padding10" @click="opened.level2 = !opened.level2">
            <div class="first">
              <div class="mui-input-row">
                <label>直推用户</label>
                <i class="icon icon-xs icon-list-b" :class="{'icon-list-t': opened.level2}"></i>
              </div>
            </div>
          </li>

          <div v-show="opened.level2" class="vip-hide">
            <li class="mui-table-view-cell padding10">
              <div class="mui-navigate-right">
                <div class="mui-input-row">
                  <label>银联收款分润</label>
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
        <ul class="mui-table-view marginTop10 marginTop1">

          <li class="mui-table-view-cell padding10" @click="opened.level3 = !opened.level3">
            <div class="first">

              <div class="mui-input-row">
                <label>间推用户</label>
                <i class="icon icon-xs icon-list-b" :class="{'icon-list-t': opened.level3}"></i>
              </div>

            </div>
          </li>

          <div v-show="opened.level3" class="vip-hide">
            <li class="mui-table-view-cell padding10">
              <div class="mui-navigate-right">
                <div class="mui-input-row">
                  <label>银联收款分润</label>
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
      <!--移动过来的结束-->
      <!--<img src="../../assets/images/vip_03.jpg">-->
      <!--添加过来了-->


        <div class="account">
          <div class="index-content">
            <h2><i>|</i>用户统计</h2>
          </div>
          <ul class="mui-table-view">
              <li class="mui-table-view-cell padding10" @click="opened.level4 = !opened.level4">
                <div class="first">
                  <div class="mui-input-row">
                    <label>直推人数</label>
                    <i class="icon icon-xs icon-list-b" :class="{'icon-list-t': opened.level4}"></i>
                  </div>
                </div>
              </li>
              <div v-show="opened.level4" class="vip-hide">

              <li class="mui-table-view-cell padding10">
                <router-link to="/share/state?authed=1">
                <div class="mui-navigate-right">
                  <div class="mui-input-row">
                    <label>直推人数详情</label>
                    <input type="text" disabled="" class="text-align-left" :value="userInfo.c_direct_friends + '人'">
                  </div>
                </div>
                </router-link>
              </li>
            </div>
            </ul>

           <ul class="mui-table-view marginTop10 marginTop1">
            <li class="mui-table-view-cell padding10" @click="opened.level5 = !opened.level5">
              <div class="first">
                <div class="mui-input-row">
                  <label>间推人数</label>
                  <i class="icon icon-xs icon-list-b" :class="{'icon-list-t': opened.level5}"></i>
                </div>
              </div>
            </li>
            <div v-show="opened.level5" class="vip-hide">

              <li class="mui-table-view-cell padding10">
                <div class="mui-navigate-right noright">
                  <div class="mui-input-row">
                    <label>间推总人数</label>
                    <input type="text" disabled="" class="text-align-left" :value="userInfo.c_indirect_friends + '人'">
                  </div>
                </div>
              </li>


              <li class="mui-table-view-cell padding10">
               <div class="mui-navigate-right">
                 <div class="mui-input-row">
                   <label>已认证用户</label>
                   <input type="text" disabled="" class="text-align-left" :value="userInfo.c_indirect_friends_authed+ '人'">
                 </div>
               </div>
             </li>
             <li class="mui-table-view-cell padding10">
               <div class="mui-navigate-right">
                 <div class="mui-input-row">
                   <label>未认证用户</label>
                   <input type="text" disabled="" class="text-align-left" :value="userInfo.c_indirect_friends - userInfo.c_indirect_friends_authed+ '人'">
                 </div>
               </div>
             </li>
        </div>
          </ul>
        </div>
      <!--添加过来了-->






      <div class="index-content">
        <h2><i>|</i>会员详情</h2>
      </div>
      <ul class="toogle" style="margin-top: 10px;">

        <li @click="base.opened = !base.opened">
          <h5>我的费率
            <i class="icon icon-xs icon-list-b" :class="{'icon-list-t': base.opened}"></i>
          </h5>
          <div class="go" v-show="base.opened">
            <table style="width: 100%">
            <tr><td><p>智能还款费率{{userInfo.rate.rate}} + {{parseFloat(userInfo.rate.fixedAmount)/100}}，单笔小于1万</p></td></tr>
            <tr><td><p>帮你还费率1.2%，单日最高5万</p></td></tr>
            <tr><td><p>银联收款费率{{userInfo.cashRate.rate}} + {{parseFloat(userInfo.cashRate.fixedAmount)/100}},单笔2万，单日5万</p></td></tr>
          </table>
          </div>
        </li>
        <!--<li :class="{'act': selectedVip === k}" @click="selectVip(k)" v-for="(item, k, index) in vips" v-if="index < 2">-->
        <li :class="{'act': selectedVip === k}" @click="selectVip(k)" v-for="(item, k, index) in vips" v-show="userInfo.vip <= Number(k.replace('vip', ''))">
          <h5>{{item.name}}
              <span v-show="k!=='vip1'">
                ￥<font v-html="renderMoneyLow(item.price)"></font>
                <button v-show="userInfo.vip < Number(k.replace('vip', ''))" @click.stop="selectVip(k, true)">立即优惠</button>
              </span>
              <i class="icon icon-xs icon-list-b" :class="{'icon-list-t': item.opened}"></i>
          </h5>
          <div class="go" v-show="item.opened">
            <p><table style="width: 100%">

                <tr>
                  <td>办卡营销分润</td>
                  <td>直推用户 <span>{{fixed(item.share.registcard[0] * 100)}}%</span></td>
                  <td>间推用户 <span>{{fixed(item.share.registcard[1] * 100)}}%</span></td>
                </tr>
                <tr>
                  <td>贷款营销分润</td>
                  <td>直推用户 <span>{{fixed(item.share.loan[0] * 100)}}%</span></td>
                  <td>间推用户 <span>{{fixed(item.share.loan[1] * 100)}}%</span></td>
                </tr>
                <tr>
                  <td>升级VIP分润</td>
                  <td>直推用户 <span>{{fixed(item.share.upvip[0] * 100)}}%</span></td>
                  <td>间推用户 <span>{{fixed(item.share.upvip[1] * 100)}}%</span></td>
                </tr>
                <tr>
                  <td>银联收款分润</td>
                  <td>直推用户万 <span>{{fixed(item.share.cash[0] * 10000)}}</span></td>
                  <td>间推用户万 <span>{{fixed(item.share.cash[1] * 10000)}}</span></td>
                </tr>
                <tr>
                  <td>帮你还分润</td>
                  <td>直推用户万 <span>{{fixed(item.share.loanpay[0] * 10000)}}</span></td>
                  <td>间推用户万 <span>{{fixed(item.share.loanpay[1] * 10000)}}</span></td>
                </tr>
                <tr>
                  <td>智能还款分润</td>
                  <td>直推用户万<span>{{fixed(item.share.repayment[0] * 10000)}}</span></td>
                  <td>间推用户万 <span>{{fixed(item.share.repayment[1] * 10000)}}</span></td>
                </tr>
              </table>
            </p>
          </div>
        </li>
      </ul>
      <p>提示：加盟推广商，联系客服，更多福利等着你</p>
      <div class="sk-next">
        <router-link to="/cash/draw" class="mui-btn mui-btn-primary">分润提现</router-link>
      </div>
    </div>

  </div>
</template>

<script>
  import helper from '../helper'
  import api from '../api'
  import rest from '../rest'
  export default {
    name: 'shareVip',
    data () {
      return {
        selectedVip: '',
        vips:[],
        base: {
          opened: false
        },
        opened: {
          level2: false,
          level3: false,
          level4: false,
          level5: false,
        }
      }
    },
    mounted: function () {
      this.selectedVip = 'vip' + this.userInfo.vip;
      this.freshSystemInfo( () => {
      this.vips = this.systemInfo.vip;
        //this.vips[this.selectedVip].opened = true;
      });
      this.checkOrder();
    },
    methods: {
      checkOrder: function (novalid) {
        if(helper.get('order')){
          let order = helper.getJson('order');
          if(novalid || order.status === 1){
            helper.remove(['order']);
            this.freshUserInfo(()=> {
              this.$router.push('/share/vipsuccess?vip='+ order.vip);
            });
          }
        }
      },
      selectVip: function (k, isBuy) {
          var msg = '尚未完成实名认证，';
          switch(this.userInfo.auth_status){
            case 0: msg += '请在用户中心提交实名认证信息,认证成功才能使用哦'; break;
            case 1: msg += '请耐心等待审核结果'; break;
            case -2: msg += '审核失败，请重新提交认证材料';break;
            case 2: msg = '';break;
          }
          if(msg){
            helper.alert(msg,null,null,() => {
              if(this.userInfo.auth_status < 1){
                this.$router.push('/user/auth');
              }else{
                if(this.userInfo.auth_status === 1){
                  helper.toast('审核中，请耐心等待');
                }
              }
            });
          }else{
            this.selectedVip = k;
            if(isBuy){
              if(this.selectedVip){
                this.turnToPay(null, {money: this.vips[this.selectedVip].price, vip: this.selectedVip});
              }else{
                helper.toast('请选择会员等级');
              }
            }else{
              this.vips[k].opened = !this.vips[k].opened;  //展开的时候折叠，折叠的时候展开
              this.vips = Object.assign({}, this.vips); //重新更新
            }
          }
      },
      renderMoneyLow: function (money) {
        var money = this.renderMoney(money);
        return money.replace(/(\.\d{2})/g, '<span>$1</span>');
      }
    }
  }
</script>

<style scoped>
  .mui-table-view-cell a{
    color: #FF3B30;
  }
  .vip-page span{
    color: #f66363;
  }
  .icon-list-b,.icon-list-t{
    margin: 0;
    margin-top: -3px;
    right: 4px;
  }

  /*1月5号改的*/
 .repay-cont ul li{
   border: none;
   padding: 0;
 }
  .repay-cont ul{
    padding: 20px 0;
  }
  .first .mui-input-row label{
    width: 46%;
    color: #8f8f94;
  }
  .account{
    margin: 15px 0 13px 0;
  }
  .account ul > li{
    padding: 4px 0;
    border: none;
    margin-bottom:0;
 }
  .first .icon-list-b{
    margin-top:9px;
    right: 5%;
  }
  .icon-list-b{
    right: 5%;
  }
  .vip-hide li{
    border: none;
    padding: 0 10px;
    color: #666;
    margin-bottom:0;
  }
  .vip-hide li a{
    padding: 0;
  }
  .account .mui-table-view{
    border-radius: 3px;
    border: 1px solid #cccccc;
  }
  .vip-page ul li p{
    font-weight: normal;
    font-size:14px;
    margin-bottom:0;
  }
  .yesterday ul li p {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight:bold;
  }
  .vip-hide .mui-input-row label{
    width: 46%;
    font-size:12px;
  }
  .vip-hide .mui-input-row input{
    width: 45%;
    margin-right:5%;
    font-size:12px;
    color: #333;
  }
  .vip-page .index-content h2{
    padding: 0;
    margin-bottom:10px;
    color: #333;
    font-weight: bold;
  }
  .index-content{
    margin-top:0;
  }
  .mui-table-view-cell a {
    color: #666;
    padding: 0 13px;
    margin: 0;
  }
  .marginTop1 .mui-navigate-right:after, .mui-push-right:after{
    content:"";
  }


</style>
