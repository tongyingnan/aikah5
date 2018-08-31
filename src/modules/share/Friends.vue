<template>
  <div class="share-friends">
    <m-head left="back">
      <h1 class="mui-title" slot="title">
        <div class="mui-input-row mui-search">
          <input type="search" class="mui-input-clear" placeholder="搜索成员">
        </div>
      </h1>
      <label class="mui-pull-right" slot="right" @click="building">提交</label>
    </m-head>

    <div class="mui-content" style="display: none">
      <div id="slider" class="mui-slider">
        <div class="mui-slider-item mui-control-content mui-active">
          <ul class="mui-table-view phb">
            <li class="mui-table-view-cell">
              <img class="fl" src="../../assets/images/me.png" />
              <div class="fl usename">
                张*辉
              </div>
              <div class="fl">8000.00</div>

              <div class="fr">
                <img src="../../assets/images/111.png" />
              </div>
            </li>
            <li class="mui-table-view-cell">
              <img class="fl" src="../../assets/images/me.png" />
              <div class="fl usename">
                张*辉
              </div>
              <div class="fl">8000.00</div>

              <div class="fr">
                <img src="../../assets/images/222.png" />
              </div>
            </li>
            <li class="mui-table-view-cell">
              <img class="fl" src="../../assets/images/me.png" />
              <div class="fl usename">
                张*辉
              </div>
              <div class="fl">8000.00</div>

              <div class="fr">
                <img src="../../assets/images/333.png" />
              </div>
            </li>
            <li class="mui-table-view-cell">
              <img class="fl" src="../../assets/images/me.png" />
              <div class="fl usename">
                张*辉
              </div>
              <div class="fl">8000.00</div>

              <div class="fr">
                <i>4</i>
              </div>
            </li>
            <li class="mui-table-view-cell">
              <img class="fl" src="../../assets/images/me.png" />
              <div class="fl usename">
                张*辉
              </div>
              <div class="fl">8000.00</div>

              <div class="fr">
                <i>5</i>
              </div>
            </li>
            <li class="mui-table-view-cell">
              <img class="fl" src="../../assets/images/me.png" />
              <div class="fl usename">
                张*辉
              </div>
              <div class="fl">8000.00</div>

              <div class="fr">
                <i>6</i>
              </div>
            </li>
            <li class="mui-table-view-cell">
              <img class="fl" src="../../assets/images/me.png" />
              <div class="fl usename">
                张*辉
              </div>
              <div class="fl">8000.00</div>

              <div class="fr">
                <i>7</i>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'shareFriends',
    data () {
      return {
        level: Number(this.$route.query.level)
      }
    }
  }
</script>

<style>
  .mui-control-content {
    background-color: white;
    min-height: 300px;
  }
  .mui-control-content .mui-loading {
    margin-top: 50px;
  }
  .mui-search .mui-placeholder {
    font-size: 14px;
    line-height: 45px;
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: inline-block;
    height: 34px;
    text-align: center;
    color:  #2ebafb;
    border: 0;
    border-radius: 6px;
    background: 0 0;
  }
  .mui-bar .mui-search:before {
    margin-top: -21px;
  }
  .mui-search .mui-placeholder .mui-icon{
    color:#2ebafb;
  }
  .mui-bar .mui-input-row .mui-input-clear~.mui-icon-clear{
    top: 12px;
    right: 0;
  }

</style>
