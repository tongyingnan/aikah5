<template>
     <div class="mui-content" id="content" style="width: 100% ;height:100%" >
	  <iframe id="iframe" frameborder="0"   allowtransparency="true"  src="http://www.ddb.cn"
	   style="background-color:transparent; position: absolute; width: 100%; height: 100%">
	  </iframe>
    </div>
</template>

<script>
  import rest from '../rest';
  import helper from '../helper';
  import api from '../api';
  import config from '../../../config'

  export default {
    name: 'article',
    data () {
      return {
        doc: {
          title: '商城'
        }
      }
    },
    created: function () {
      var id = this.$route.query.id;
      if(id){
        this.queryDoc(id);
      }
    },
    methods: {
      queryDoc: function (id) {
        var that = this;
        rest.get(api.doc.article, {id: id}).done(function (res) {
          if(res.status === 0){
            that.doc = res.data;
          }else{
            helper.toast(res.msg)
          }
        });
      },
	   test: function (id) {
         var ifm = document.getElementById("myid"); 
		 var content = document.getElementById("content"); 
		 var c = 0;
		 var inv = setInterval(function(){
			 c++;
			 ifm.height = document.body.scrollHeight - 5;
			 content.style.visibility='visible';
			 if(c>3) {
			 	clearInterval(inv);
			 }
		 }, 500)
      }
    }

  }
</script>

<style scoped>

</style>
