<template>
  <div class="card-help">
    <m-head title="帮助中心" left="back"></m-head>
    <div class="mui-card">
      <div class="mui-card-header">当前等级和升级会员区别是什么？<i data-v-1cda85c1="" class="icon icon-xs icon-list-b"></i></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          软件注册即是代理，当前等级的用户会得到相应比例的分润，如果想提高分润比例，可以通过升级VIP获得更高的分润比例。
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">什么是直接推广和间接推广？<i data-v-1cda85c1="" class="icon icon-xs icon-list-b"></i></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          直接推广指：A推荐B，之间属于直推关系好友；
          间接推广指：B推荐C，C和A属于间推好友关系；
        </div>
      </div>
    </div>


    <div class="mui-card">
      <div class="mui-card-header">什么是直接推广万10 间接推广万4？<i data-v-1cda85c1="" class="icon icon-xs icon-list-b"></i></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          直接推广万10指：当B还款或者取现1万元，A就可获得10元的分润奖励；
          间接推广万 4指：当C还款或者取现1万元，B可获得10元分润奖励，A可得4元分润奖励；
        </div>
      </div>
    </div>



    <div class="mui-card">
      <div class="mui-card-header">什么是办卡推广分润 直推50% 间推20%？<i data-v-1cda85c1="" class="icon icon-xs icon-list-b"></i> </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          办卡即申请信用卡，当信用卡申请成功后，根据各家银行不同，会给出相应返利给平台，平台将此奖励以百分比形式，返利给用户；
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">什么是贷款推广分润 直推50% 间推20%？<i data-v-1cda85c1="" class="icon icon-xs icon-list-b"></i></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          当用户在APP贷款里申请成功后，根据各家贷款公司不同，会给出相应返利给平台，平台将此奖励以百分比形式，返利给用户；
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">什么是升级VI P分佣 直推45% 间推10%？<i data-v-1cda85c1="" class="icon icon-xs icon-list-b"></i></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          假如您已经是VIP会员，您直推的好友B 花了198升级了VIP，你可以按45%的金额（即89元）奖励，当您的好友B又推荐了C，他也升级了VIP，你可以间接的按10%的金额（即19.8元）奖励。
          注：A只跟BC有关系，D以外的分润和关系都无法关联
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">什么是取现推广分润,智能还款分润和帮你还分润直推万10 间推万4？<i data-v-1cda85c1="" class="icon icon-xs icon-list-b"></i></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          直推万10指：当B还款或者取现1万元，A就可获得10元的分润奖励；
          间推万 4指：当C还款或者取现1万元，B可获得10元分润奖励，A可得4元

        </div>
      </div>
    </div>


    <!--<div class="mui-card">
      <div class="mui-card-header">关于平台充值扣取0.85%手续费客户所产生的疑问？</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          平台充值实际是信用卡收款一个过程、想避免充值收取的0.85%手续费 只需在设置还款规划之前、保持信用卡有足够的余额、若卡有余额无需充值 直接点提交 实现还款规划；例如：原计划还款10000元账单，需要充值1000元还款，想避免充值手续费、可先把1000元通过网上银行、支付宝或微信存入该张信用卡， 然后在制定还款规划、则可免除充值手续费）
        </div>
      </div>
    </div>-->



    <div class="mui-card">
      <div class="mui-card-header">什么是代理商？<i data-v-1cda85c1="" class="icon icon-xs icon-list-b"></i></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          代理商好处在于，①关联名下所有用户②可以面向全国招小代理商
          ③与平台结算费率更低④名下所有用户的交易和升级VIP分润跟代理商有关联
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">什么是OEM单？<i data-v-1cda85c1="" class="icon icon-xs icon-list-b"></i></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          代理商享有的四个权利统统都有，额外增加四个亮点①可以自己管理用户联系方式数据②自己做品牌（提供品牌名字和logo）③自己定制代理商规则以及营销策略方案④
          可提出增加或者减少关于APP功能要求；
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default{
    name: 'Viphelp',
    data(){
      return {};
    },
    mounted: function () {
      $('.mui-card-header').click(function () {
        var ishidden = $(this).next().is(":hidden");
        if(ishidden){
          $(this).next().show();
          $(this).children("i").addClass("icon-list-t")
        }else{
          $(this).next().hide();
          $(this).children("i").removeClass("icon-list-t")
        }
      })
    }
  }
</script>
<style scoped>
  .card-help{
    margin-top: 45px;
  }
  .mui-card{
    margin: 0;
    box-shadow: none;
  }
  .mui-card-content{
    display: none;
    background-color: #fafafa;
  }
  .mui-card-header{
    color: #333;
    font-size: 15px;
    padding-right: 37px;
  }
  .mui-card-content-inner{
    padding-right: 37px;
    color: #666;
  }
</style>
