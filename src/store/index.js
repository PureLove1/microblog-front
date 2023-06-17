import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 建议使用字符串表示用户id，javascript在数据较大时可能会出现精度丢失问题
    userId: '',
    token: '',
    refreshToken:'',
    userIconUrl: '',
    username: ''
  },
  mutations: {
    // 更新用户id
    setUserId(state, userId) {
      state.userId = userId;
      sessionStorage.setItem('userId', userId);
    },
    // 更新用户头像
    setUserIconUrl(state, userIconUrl) {
      state.userIconUrl = userIconUrl;
      sessionStorage.setItem('userIconUrl', userIconUrl);
    },
    // 更新用户名称
    setUsername(state, username) {
      state.username = username;
      sessionStorage.setItem('username', username);
    },
    // 设置全局token
    setToken(state, token) {
      sessionStorage.setItem('token', token);
      state.token = token;
    },
    setRefreshToken(state, refreshToken) {
      sessionStorage.setItem('refreshToken', refreshToken);
      state.refreshToken = refreshToken;
    },
    clearUser(state) {
      // 清除会话存储
      sessionStorage.clear();
      state.userIconUrl = '';
      state.userId = '';
      state.username = '';
      state.token = '';
      state.refreshToken='';
    }
  }
})
