<template>
  <div class="insurance-home">
    <m-head title="保险详情" left="back"></m-head>
    <div class="mui-page-content account">
      <ul class="mui-table-view">


        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right r-after">
            <div class="mui-input-row">
              <label>保障对象</label>
              <input type="text" placeholder="" value="被保人名下所有银行卡" disabled>
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right r-after">
            <div class="mui-input-row">
              <label>被保险人</label>
              <input type="text" placeholder="" value="许xx" disabled>
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right r-after">
            <div class="mui-input-row">
              <label>保障开始时间</label>
              <input type="text" placeholder="" value="2017-02-22" disabled>
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right r-after">
            <div class="mui-input-row">
              <label>保障结束时间</label>
              <input type="text" placeholder="" value="2017-02-22" disabled>
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right r-after">
            <div class="mui-input-row">
              <label>服务热线</label>
              <input type="text" placeholder="" value="95510" disabled>
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right r-after">
            <div class="mui-input-row">
              <label>保险公司</label>
              <input type="text" placeholder="" value="中国人民财产保险公司" disabled>
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right r-after">
            <div class="mui-input-row">
              <label>保单号</label>
              <input type="text" placeholder="" value="121321321312" disabled>
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right r-after">
            <div class="mui-input-row">
              <label>状态</label>
              <input type="text" placeholder="" value="保障中" disabled>
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right r-after">
            <div class="mui-input-row">
              <label @click="$router.push('/doc/article?id=22')" style="color: #1eaaf1">《投保须知》</label>
              <input type="text" placeholder="" value="" disabled>
            </div>
          </div>
        </li>

        <li class="mui-table-view-cell padding10">
          <div class="mui-navigate-right r-after">
            <div class="mui-input-row">
              <label @click="$router.push('/doc/article?id=23')" style="color: #1eaaf1">《保险条款》</label>
              <input type="text" placeholder="" value="" disabled>
            </div>
          </div>
        </li>



      </ul>



    </div>


    <div class="sk-next">
      <button type="button" class="mui-btn mui-btn-primary">保存</button>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'insuranceHome',
    data () {
      return {}
    }
  }
</script>
