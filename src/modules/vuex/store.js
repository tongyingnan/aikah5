import Vue from 'vue'
import Vuex from 'vuex'
import helper from '../helper.js'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

//使用vuex
Vue.use(Vuex)


// 创建一个对象来保存应用的状态
const state = {
  userInfo: helper.getJson('userInfo'),


  systemInfo: helper.getJson('systemInfo'),

  // 权限
  authorities: helper.get('authorities'),

  //页面间通信
  pageData: helper.getJson('pageData'),

}


// 整合初始状态和变更函数，我们就得到了我们所需的 store
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
