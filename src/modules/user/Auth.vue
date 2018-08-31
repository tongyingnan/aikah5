<template>
  <div class="user-auth bg-white user-auth-one">
    <m-head title="实名认证" left="back"></m-head>
    <div class="mui-content">
      <p class="user-tit">请填写本人真实身份信息与结算卡</p>
      <div class="mui-slider bg-white">
        <div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <a class="mui-control-item" :class="{'mui-active': tab === 0}" href="#tab0" @click="tab = 0">实名认证</a>
          <a class="mui-control-item" :class="{'mui-active': tab === 1}" href="#tab1" @click="tab = 1">身份证认证</a>
          <a class="mui-control-item" :class="{'mui-active': tab === 2}" href="#tab2" @click="tab = 2">银行认证</a>
        </div>
        <!--第一个-->
        <div class="mui-slider-item mui-control-content p-minhei1" :class="{'mui-active': tab === 0}" id="tab0">
          <div class="mui-scroll-wrapper">
            <div class="mui-scroll">
              <div  class="mui-input-group">
                <div class="mui-input-row">
                  <label>姓名</label>
                  <input type="text" placeholder="请输入姓名" v-model="name">
                </div>

                <div class="mui-input-row">
                  <label>身份证</label>
                  <input type="text" class="mui-input-clear" placeholder="请输入身份证" v-model="idcard">
                </div>
                <div class="mui-input-row">
                  <label>储蓄卡号</label>
                  <input type="text" placeholder="请输入储蓄卡卡号" v-model.trim="card_no" v-type="'number'" desc="储蓄卡卡号">
                </div>
                <div class="mui-navigate-right phr2 " style="position: relative">
                  <div class="mui-input-row">
                    <label>开户银行</label>
                    <select class="banksel" v-model="selectBank">
                      <option :value="item" v-for="item in bank.list">{{item.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="mui-input-row">
          			<label>银行支行</label>
          			<input type="text" placeholder="请输入支行名称" v-model.trim="card_branch_name" desc="支行名称">
        		</div>
                <!--添加的-->
                <div class="mui-input-row">
                  <label>手机号</label>
                  <input type="text" class="mui-input-clear" placeholder="请输入手机号" v-model="phone">
                </div>
              </div>

              <div class="sk-next">
                <button type="button" class="mui-btn mui-btn-primary" :disabled="!card_branch_name ||!name || !phone || !idcard || !card_no || !selectBank" @click="tab += 1">下一步</button>
              </div>
            </div>
          </div>
        </div>
        <!--第一个-->
        <!--第二个-->
        <div class="mui-slider-item p-minhei2 mui-control-content" :class="{'mui-active': tab === 1}" id="tab1">
          <div class="mui-scroll-wrapper">
            <div class="mui-scroll">
              <ul class="sfrz">
                <li class="clearfix">
                  <div class="fl sfrz-left"  @click="getPicture('idcard_img_y')" data-loading-text>
                    <img src="../../assets/images/sf_03.png" v-if="!idcard_img_y_img"/>
                    <img :src="idcard_img_y_img" v-if="idcard_img_y_img"/>
                  </div>
                  <div class="fr sfrz-right">
                    <h4>身份证正面照</h4>
                    <p>文字必须清晰可见</p>
                  </div>
                </li>

                <li class="clearfix">
                  <div class="fl sfrz-left" @click="getPicture('idcard_img_n')">
                    <img src="../../assets/images/sf_06.png" v-if="!idcard_img_n_img"/>
                    <img :src="idcard_img_n_img" v-if="idcard_img_n_img"/>
                  </div>
                  <div class="fr sfrz-right">
                    <h4>身份证背面照</h4>
                    <p>文字必须清晰可见</p>
                  </div>
                </li>
                <li class="clearfix">
                  <div class="fl flp sfrz-left" @click="getPicture('idcard_img_p')">
                    <img src="../../assets/images/sf_10.png" v-if="!idcard_img_p_img"/>
                    <img :src="idcard_img_p_img" v-if="idcard_img_p_img"/>
                  </div>
                  <div class="fr sfrz-right">
                    <h4>手持身份证拍照</h4>
                    <p>文字必须清晰可见</p>
                  </div>
                </li>
              </ul>
              <div class="sk-next">
                <button type="button" class="mui-btn mui-btn-primary" @click="tab += 1" :disabled="!name || !phone || !idcard || !card_no || !selectBank || !idcard_img_y || !idcard_img_n || !idcard_img_p">下一步</button>
              </div>
            </div>
          </div>
        </div>
        <!--第二个-->
        <!--第三个-->
        <div class="mui-slider-item mui-control-content p-minhei3" :class="{'mui-active': tab === 2}" id="tab2">
          <div class="mui-scroll-wrapper">
            <div class="mui-scroll">
              <ul class="sfrz">
                <li class="clearfix">
                  <div class="sfrz-left sfrz-left-one" @click="getPicture('card_img_y')" data-loading-text>
                    <img :src="card_img_y_img" v-if="card_img_y_img">
                    <img src="../../assets/images/ph_03.png" class="icon" v-if="!card_img_y_img">
                  </div>
                  <div class="fr sfrz-right sfrz-right-one">
                    <h4>银行卡正面照</h4>
                    <p>文字必须清晰可见</p>
                  </div>
                </li>
                <li class="clearfix">
                  <div class="sfrz-left sfrz-left-one" @click="getPicture('card_img_n')">
                    <img :src="card_img_n_img" v-if="card_img_n_img">
                    <img src="../../assets/images/ph_06.png" class="icon" v-if="!card_img_n_img"/>
                  </div>
                  <div class="fr sfrz-right sfrz-right-one">
                    <h4>银行卡背面照</h4>
                    <p>文字必须清晰可见</p>
                  </div>
                </li>
              </ul>
              <div class="auth-request">
                <span>证件要求：</span>
                <em>1.请上传有效的银行卡正反照，非证件照片不予受理；</em>
                <em>2.证件照必须是彩色原件电子版；</em>
                <em>3.照片需完整、清晰，请勿逆光拍摄，否则审核不通过</em>
              </div>
              <div class="sk-next">
                <button type="button" class="mui-btn mui-btn-primary" @click="submit" :disabled="!name || !phone || !card_branch_name || !idcard || !card_no || !selectBank || !idcard_img_y || !idcard_img_n || !idcard_img_p || !card_img_y || !card_img_n">确认提交</button>
              </div>
            </div>
          </div>
        </div>
        <!--第三个-->
      </div>
    </div>
    <div id="picturePopover" class="mui-popover mui-popover-bottom mui-popover-action ">
      <!-- 可选择菜单 -->
      <ul class="mui-table-view">
        <li class="mui-table-view-cell" v-show="isApp">
          <a href="javascript:void(0)" @click="picturePop(1)">拍照</a>
        </li>
        <li class="mui-table-view-cell" v-show="isApp">
          <a href="javascript:void(0)" @click="picturePop(0)">相册</a>
        </li>
        <li class="mui-table-view-cell" v-show="!isApp">
          <a href="javascript:void(0)" @click="picturePop(0)">
            选择图片
            <form v-if="!appInfo.isApp">
              <input type="file" id="imgInput" @change="selectImgFile" accept="image/jpeg,image/jpg,image/png" name=""/>
            </form>
          </a>
        </li>
      </ul>
      <!-- 取消菜单 -->
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <a href="javascript:void(0)" @click="picturePop(-1)"><b>取消</b></a>
        </li>
      </ul>
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
    name: 'userAuth',
    data () {
      return {
        tab: 0,
        bank: bank,
        isApp: true,
        name: '',
        phone: '',
        idcard: '',
        card_no:'',
        selectBank:'',
        idcard_img_y: '',
        idcard_img_n: '',
        idcard_img_p: '',
        card_img_y: '',
        card_img_n:'',
        sourceType: 1,
        card_branch_name:'',
        idcard_img_y_img: '',
        idcard_img_n_img: '',
        idcard_img_p_img: '',
        card_img_y_img: '',
        card_img_n_img: '',
      }
    },
    mounted: function () {
      this.isApp = !!navigator.camera;
    },
    methods: {
      picturePop: function (type) {
        mui('#picturePopover').popover('toggle');
        if(type > -1){
          this.startCamer(type);
        }
      },
      remove: function(){
       // this.removeClass("mui-active");
//        obj.classList.remove("className");
        var list = document.getElementsByClassName("mui-control-item")
        list.classList.remove("mui-active")

      },
      getPicture: function (key) {
        this.key = key;
        this.picturePop(-1);
      },
      startCamer: function (sourceType) {
        try{
          navigator.camera.getPicture(imageData => {
            imageData = 'data:image/jpeg;base64,' +imageData;
            dealImage(imageData, {width: 1240}, dataurl => {
              this.uploadImg(dataurl);
            })
          }, res => {}, {
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: sourceType
          })
        }catch (e){}
      },
      submit: function () {
        let {name, phone, idcard,card_no,selectBank, idcard_img_y, idcard_img_n, idcard_img_p,card_img_y,card_img_n,card_branch_name} = this.$data;
        rest.post(api.user_auth.add, {name, phone, idcard,card_no, idcard_img_y, idcard_img_n, idcard_img_p,card_img_y,card_branch_name,
          card_img_n, union_num: selectBank.union_num, card_bank: selectBank.name}).done(res => {
          if(helper.isSuccess(res)){
            helper.toast('提交成功，等待审核完成');
            this.freshUserInfo(() => {
                this.$router.push('/user/modifypaypwd')
//              this.$router.go(-1);
            });
          }
        });
      },
      selectImgFile: function (e) {
        var file = $(e.currentTarget)[0];
        $(file).attr('name', this.key);
        var dataUrl = window[window.webkitURL ? 'webkitURL' : 'URL']['createObjectURL'](file.files[0]);
        dealImage(dataUrl, {width: 800}, dataurl => {
          this.uploadImg(dataurl);
        })
      },
      uploadImg: function (dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        var obj = new Blob([u8arr], {type:mime});
        var fd = new FormData();
        fd.append(this.key, obj,"image.png");
        rest.upload('/upload/user_auth', fd).done(res => {
          if(res.status === 0){
            this[this.key] = res.data[this.key];
            this[this.key + '_img'] = dataurl;
          }else{
            helper.toast(res.msg);
          }
        });
      }
    }
  }
</script>

<style scoped>
  .mui-control-content.p-minhei1{
    min-height: 200px;
  }
  /*.mui-slider .mui-slider-item .sfrz li .flp img{*/
  /*height: 156px;*/
  /*}*/
  .mui-scroll-wrapper{
    overflow-y: scroll;
    position: inherit;
  }
  .mui-scroll{
    position: inherit;
  }
  #imgInput{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 999;
  }
  .user-auth-one .mui-input-group .mui-input-row:nth-last-child(1):after{
    background-color: #eee;
  }
</style>
