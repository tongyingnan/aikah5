<template>
  <div class="user-auth bg-white user-auth-one">
    <m-head title="实名认证" left="back"></m-head>
    <div class="mui-content">
      <!--<p class="user-tit">请填写本人真实身份信息与结算卡</p>-->
      <div class="mui-slider bg-white">
        <div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <a class="mui-control-item" :class="{'mui-active': tab === 0}" href="#tab0" @click="tab = 0">卡号 </a>
          <a class="mui-control-item" :class="{'mui-active': tab === 1}" href="#tab1" @click="tab = 1">用户名</a>
          <a class="mui-control-item" :class="{'mui-active': tab === 2}" href="#tab2" @click="tab = 2">手机号码</a>
        </div>
        <!--第一个-->
        <div class="mui-slider-item mui-control-content p-minhei1" :class="{'mui-active': tab === 0}" id="tab0">
          <div class="mui-scroll-wrapper">
            <div class="mui-scroll">
              <div  class="mui-input-group">
                <div class="mui-input-row">
                  <label>信用卡卡号</label>
                  <input type="text" placeholder="12到21位完整卡号">
                </div>
              </div>
              <div class="mui-input-row">
                <label>登录密码</label>
                <input type="password" class="mui-input-password" placeholder="8-12位数字字母符号组合"/>
              </div>
              <div class="sk-next">
                <button type="button" class="mui-btn mui-btn-primary" @click="tab += 1">提交</button>
              </div>
            </div>
          </div>
        </div>
        <!--第一个-->
        <!--第二个-->
        <div class="mui-slider-item p-minhei2 mui-control-content" :class="{'mui-active': tab === 1}" id="tab1">
          <div class="mui-scroll-wrapper">
            <div class="mui-scroll">
              <div  class="mui-input-group">
                <div class="mui-input-row">
                  <label>用户名</label>
                  <input type="text" placeholder="请填写您的用户名">
                </div>
              </div>
              <div class="mui-input-row">
                <label>登录密码</label>
                <input type="password" class="mui-input-password" placeholder="8-12位数字字母符号组合"/>
              </div>
              <div class="sk-next">
                <button type="button" class="mui-btn mui-btn-primary" @click="tab += 1" >提交</button>
              </div>
            </div>
          </div>
        </div>
        <!--第二个-->
        <!--第三个-->
        <div class="mui-slider-item mui-control-content p-minhei3" :class="{'mui-active': tab === 2}" id="tab2">
          <div class="mui-scroll-wrapper">
            <div class="mui-scroll sign-in">
              <div  class="mui-input-group">
                <div class="mui-input-row">
                  <label>手机号码</label>
                  <input type="text" placeholder="请填写您的手机号码" v-model.trim="phone">
                </div>
              </div>
              <div class="mui-input-row">
                <label>验证码</label>
                <input type="text" placeholder="请输入验证码" v-model.trim="code" maxlength="6">
                <button type="button" class="mui-btn mui-btn-warning get-code-btn"
                        :disabled="Boolean(outSeconds)"
                        @click="getMsgCode">{{outSeconds > 0 ? outSeconds + '秒后重发' : '获取验证码'}}</button>
              </div>
              <div class="sk-next">
                <button type="button" class="mui-btn mui-btn-primary" @click="" >提交</button>
              </div>
            </div>
          </div>
        </div>
        <!--第三个-->
      </div>
    </div>
  </div>
</template>

<script>
  import helper from '../helper'
  import rest from '../rest'
  import api from '../api'
  import {dealImage} from '../util'
  import bank from '../../config/bank';
  export default {
    name: 'SignIn',
    data () {
      return {
        tab: 0,
        code:'',
        outSeconds: 0,
        phone: '',
      }
    },
    mounted: function () {

    },
    methods: {
      timeout: function () {
        if(this.outSeconds > 0){
          this.outSeconds --;
          setTimeout(this.timeout, 1000);
        }
      },
      getMsgCode: function () {
        if(this.phone.isMobile()){
          if(this.outSeconds < 1){
            rest.get(api.sms.code, {phone: this.phone,}).done(res => {
              if(helper.isSuccess(res)){
                this.outSeconds = 60;
                this.timeout()
              }
            });
          }
        }else{
          helper.toast('手机号格式不正确');
        }
      },

    }
  }
</script>

<style scoped>

</style>
