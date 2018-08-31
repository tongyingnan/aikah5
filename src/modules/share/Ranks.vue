<template>
  <div class="share-ranks">
    <m-head title="排行榜" left="back"></m-head>

    <div style="margin-top: 44px;">
      <img style="width: 100%" src="../../assets/images/ban.jpg" />
    </div>
    <div class="mui-content" style="padding-top: 15px;">
      <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <a class="mui-control-item  mui-active" href="#item1mobile">
            省市注册排名
          </a>
          <a class="mui-control-item" href="#item1mobile">
            代理收益排名
          </a>
          <a class="mui-control-item" href="#item1mobile">
            个人收益排名
          </a>
        </div>

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
    name: 'shareRanks',
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
