<template>
  <div class="share-qrcode">
    <m-head title="认证状态" left="back"></m-head>
    <div class="main_card card-help">
      <div class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <a class="mui-control-item" :class="{'mui-active': authed}" href="#tab0" @click="loadFriendsList(true)">已认证{{userInfo.c_direct_friends_authed}}人</a>
          <a class="mui-control-item" :class="{'mui-active': !authed}" href="#tab1" @click="loadFriendsList(false)">未认证{{userInfo.c_direct_friends - userInfo.c_direct_friends_authed}}人</a>
        </div>
        <!--第一个-->
        <div class="mui-slider-item mui-control-content" :class="{'mui-active': authed}" id="tab0">
          <div class="mui-scroll-wrapper">
            <div class="mui-scroll">
              <ul class="mui-table-view state">
                <li class="mui-table-view-cell mui-transitioning" v-for="item in authedList">
                  <img src="../../assets/images/state_icon.png" class="state_icon fl">
                  <div class="state-left fl">
                    <p>姓名：{{item.real_name || '暂无'}} <span>VIP{{item.vip}}</span></p>
                    <p>电话：<a :href="'tel:'+ item.phone">{{item.phone}}</a></p>
                  </div>
                  <div class="state-right fl">
                    <p>认证状态：{{parseAuthStatus(item.auth_status)}}</p>
                    <p>状态：{{parseUserStatus(item.status)}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--第一个-->
        <!--第一个-->
        <div class="mui-slider-item mui-control-content p-minhei1" :class="{'mui-active': !authed}" id="tab1">
          <div class="mui-scroll-wrapper">
            <div class="mui-scroll">
              <ul class="mui-table-view  state">
                <li class="mui-table-view-cell mui-transitioning clearfix" v-for="item in noAuthedList">
                  <img src="../../assets/images/state_icon.png" class="state_icon fl">
                  <div class="state-left fl">
                    <p>姓名：{{item.real_name || '暂无'}} <span>VIP{{item.vip}}</span></p>
                    <p>电话：<a :href="'tel'+ item.phone">{{item.phone}}</a></p>
                  </div>
                  <div class="state-right fl">
                    <p>认证状态：{{parseAuthStatus(item.auth_status)}}</p>
                    <p>状态：{{parseUserStatus(item.status)}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--第一个-->
      </div>

    </div>
  </div>
</template>

<script>
  import helper from '../helper'
  import rest from '../rest'
  import api from '../api'
  import bank from '../../config/bank'
  export default {
    name: 'State',
    data () {
      return {
        authed: Boolean(this.$route.query.authed),
        start: 0,
        len: 100,  //最多同时加载100个好友
        authedList: [],
        noAuthedList: []
      }
    },
    mounted: function () {
      this.loadFriendsList(this.authed );

    },
    methods: {
      loadFriendsList: function (bloon) {
        this.authed = bloon;
        rest.get(api.user.friends, {reference_id: this.userInfo.id, authed: this.authed ? '1': '', start: this.start, len: this.len}).done(res=> { //后台会根据给的是1还是空，1的话返回已认证，空返回未认证
          if(helper.isSuccess(res)){
            if(this.authed){
              this.authedList = res.data; //已认证的
            }else{
              this.noAuthedList = res.data; //未认证的
            }
          }
        });
      },
      parseUserStatus: function (status) {
        switch (status){
          case -2: return '黑名单';
          case -1: return '被删除';
          case 0: return '被禁用';
          case 1: return '正常';
        }
      },
      parseAuthStatus: function (auth_status) {
        switch (auth_status){
          case 0:return '未提交';
          case 1: return '审核中';
          case 2: return '已认证';
          case -2: return '认证失败';
        }
      }
    }
  }
</script>

<style scoped>

  body{
    background-color: #ffffff;
  }
  .card-help{
    margin-top:49px;
  }
  .mui-control-content{
    background-color: transparent;
  }
  .mui-scroll{
    position: relative;
  }
  .mui-scroll-wrapper{
    position: inherit;
  }
</style>
