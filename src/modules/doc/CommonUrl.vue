<template>
   <div class="mui-content" id="content" style="width: 100% ;height:100%" >
    <header class="mui-bar mui-bar-nav w-nav">
    <slot name="left">
      <div id = "back" class="mui-icon mui-icon-left-nav mui-pull-left" @click="turnBack"></div>
    </slot>
    <slot name="title">
      <h1 class="mui-title">{{title}}</h1>
    </slot>
    <slot name="right"></slot>
  </header>
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
          title:'',
          url:'',
      }
    },
 mounted: function () {
   this.url = this.$route.query.url;
   this.title = this.$route.query.title;
   console.log(this.title);
   if(this.url){
      this.load(this.url);
   }
    },
  methods: {
  load (url) {
    if (url && url.length > 0) {
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
