<template>
  <div class="bsinfo">
    <m-head title="个人信息" left="back"></m-head>
    <div class="mui-page-content account">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <a id="head" class="mui-navigate">头像
            <span class="mui-pull-right head">
              <img class="head-img mui-action-preview" id="head-img1" src="../../assets/images/mepic.png"/>
            </span>
          </a>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate">
            <div class="mui-input-row">
              <label>用户名</label>
              <input type="text" :value="userInfo.username" readonly>
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate">
            <div class="mui-input-row">
              <label>注册日期</label>
              <input type="text" :value="new Date(userInfo.create_time).format('yyyy-MM-dd hh:mm')" readonly/>
            </div>
          </div>
        </li>

      </ul>

      <ul class="mui-table-view twomargin">


        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate">
            <div class="mui-input-row">
              <label>手机号</label>
              <input type="text" :value="userInfo.phone" readonly/>
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate">
            <div class="mui-input-row">
              <label>QQ号</label>
              <input type="text" placeholder="请输入qq号" v-model="qq" @click="qqCode" class="Base-qq">
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate">
            <div class="mui-input-row">
              <label>微信号</label>
              <input type="text" placeholder="请输入微信号" v-model="weixin">
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="sk-next">
      <button class="mui-btn mui-btn-primary" @click="submit" :disabled="isNaN(this.qq) || !this.weixin">保存</button>
    </div>
  </div>
</template>
<script>
  import rest from '../rest'
  import api from '../api'
  import helper from '../helper'
  export default {
    name: 'userBaseInfo',
    data () {
      return {
        qq: '',
        weixin: ''
      }
    },
    mounted: function () {
      this.qq = this.userInfo.qq;
      this.weixin = this.userInfo.weixin;
      this.qqCode();

    },
    methods: {
      submit: function () {
        let{qq, weixin} = this.$data;
        rest.post(api.user.modifyBaseInfo, {qq, weixin}).done( res => {
          if(helper.isSuccess(res)){
            helper.toast("修改成功");
          }
        });
      },
      qqCode:function(){
        var that = this; //保存this
        $(".Base-qq").blur(function(){
          !that.qq.isNumber() && helper.toast("qq格式不正确");
        })
      },
    }
  }
</script>
<style scoped>
  .mui-table-view-cell.mui-active{
    background-color: #fff;
  }
  .mui-table-view-cell>a:not(.mui-btn){
    background-color: #fff;
  }
</style>
