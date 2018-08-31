<template>
  <div class="user-modifyhandpwd">
    <m-head title="修改手势密码" left="back"></m-head>

  </div>
</template>

<script>
  import rest from '../rest'
  import helper from '../helper'
  import api from '../api'
  export default {
    name: 'userModifyHandPwd',
    data () {
      return {
        password_hand: '',
        npassword_hand: '',
        rnpassword_hand: ''
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
