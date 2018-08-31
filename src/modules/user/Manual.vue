<template>
  <div class="user-setting">
    <m-head title="操作手册" left="back"></m-head>
    <div class="mui-content">
      <!---->
       <ul class="manual-ul">
         <li>
           <router-link to="/doc/article?id=2">
              <img src="../../assets/images/course/course-img2.png">
           </router-link>
         </li>
         <li>
           <router-link to="/doc/article?id=57">
             <img src="../../assets/images/course/course-img1.png">
           </router-link>
         </li>
       </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Manual',
    data () {
      return {}
    }
  }
</script>

<style scoped>


</style>
