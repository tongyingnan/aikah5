import helper from '../helper';
import rest from '../rest';
import api from '../api';
export default {

  CHANGE_USER_INFO (state, userInfo) {
    state.userInfo = userInfo;
    helper.setJson({'userInfo':userInfo});
    helper.set({token: userInfo.token});
  },


  CHANGE_SYSTEM_INFO (state, systemInfo) {
    state.systemInfo = systemInfo;
    helper.setJson({'systemInfo':systemInfo});
  },

  // 权限
  SET_AUTHORITIES (state, data) {
    state.authorities = data;
    helper.set({'authorities': data});
  },

  //页面间通信
  SET_PAGE_DATA (state, data) {
    state.pageData = $.extend({},state.pageData,data);
    helper.setJson({'pageData':state.pageData});
  },

  // 清空所有信息
  CLEAR_VUEX (state) {
    state = {
      userInfo: {},
      systemInfo: {},
      pageData: {},
      authorities: ''
    }
    helper.remove(['userInfo','systemInfo','pageData','authorities', 'token']);
  }
}