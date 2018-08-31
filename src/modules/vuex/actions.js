export default {
  setUserInfo({commit}, userInfo){
    commit('CHANGE_USER_INFO', userInfo);
  },
  setSystemInfo({commit}, systemInfo){
    commit('CHANGE_SYSTEM_INFO', systemInfo);
  },
  authorities({commit}, authorities){
    commit('SET_AUTHORITIES', authorities);
  },
  pageData({commit}, pageData){
    commit('SET_PAGE_DATA', pageData);
  },
  clearVuex({commit}){
    commit('CLEAR_VUEX');
  }
}