<template>
   <div class="mui-content" id="content" style="width: 100% ;height:100%" >
    <header class="mui-bar mui-bar-nav w-nav">
    <slot name="left">
      <div id = "back" class="mui-icon mui-icon-left-nav mui-pull-left" @click="turnBack"></div>
    </slot>
    <slot name="title">
      <h1 class="mui-title">开通落地</h1>
    </slot>
    <slot name="right"></slot>
  </header>
   	  <div id = "alert" class="alert">
      <i class="title">温馨提示</br>1.开通落地商户 请先退出左滑卸载卡片 重新绑定 才能开通落地商户</br>2.开通成功之后下次使用无需再次开通！</br>3.落地商户商户消费金额到账时间为五分钟！望悉知、谢谢使用！</i>
	  </div>	
	  <iframe id="iframe" frameborder="0"   allowtransparency="true"  
	   style="background-color:transparent;top:2.5rem; position: absolute; width: 100%; height: 100%">
	  </iframe>
    </div>
</template>

<script>
  import rest from '../rest';
  import helper from '../helper';
  import api from '../api';
  export default {
    name: 'article',
    data () {
      return {
        doc: {
          url:'',
          id: this.$route.query.id,
        }
      }
    },
 mounted: function () {
      this.getCardInfo(this.$route.query.id);
    },
  methods: {
  getCardInfo (id) {
      rest.get(api.card.detail, {id}).done(res => {
          if(helper.isSuccess(res)){
            var card = res.data;
            this.url = card.luodi_url;
            if(this.url){
             document.getElementById("alert").style.display="none";//隐藏
             this.load(this.url);
            }else{
              document.getElementById("alert").style.display="visible";//显示
            }
          }else{
             document.getElementById("alert").style.display="visible";//显示
          }
        });
  },
  load (url) {
    if (url && url.length > 0) {
      console.log(this.url);
        $('#iframe').attr('src',this.url);  
	}
  },
  turnBack: function (e) {
        this.$router.go(-1);
    },
  }
  }
</script>

<style scoped>
.alert {
position: inherit; 
   margin: 50px 20px 0 20px;
  }
.title {
  font-size: 10pt;
  color: #073763;
}
.mui-content {
 	-webkit-overflow-scrolling: touch;  
  	overflow-y: scroll;  
}
</style>
