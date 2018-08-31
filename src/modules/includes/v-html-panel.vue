<template>
 	<div class="mui-content" id="content" style="width: 100% ;height:100%" >
	  <iframe id="iframe" frameborder="0"   allowtransparency="true" 
	   style="background-color:transparent; position: absolute; width: 100%; height: 100%">
	  </iframe>
    </div>
</template>
<style>
 
</style>
<script>
import jQuery from 'jquery'
 export default{
  //使用时请使用 :url.sync=""传值
  props: {
   url: {
    required: true
   }
  },
  data () {
   return {
    loading: false,
    html: ''
   }
  },
  watch: {
   url (value) {
    this.load(value)
   }
  },
  mounted () {
   this.load(this.url);
  },
  methods: {
   load (url) {
    if (url && url.length > 0) {
      console.log(this.url);
        $('#iframe').attr('src',this.url);  
	}
  },
 }
}
</script>