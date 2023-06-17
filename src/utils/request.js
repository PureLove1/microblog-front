import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 创建axios实例 - 返回一个实例 - 本质还是axios，这样的好处
// 可以根据不同的需求，封装不同的请求 - 灵活
// axios是一个静态类
export const BASE_PATH = 'http://localhost:8080/microblog'
const http = axios.create({

  baseURL: BASE_PATH // 统一 配置 基地址注意这里>>>>>>>>>>>>>>>>>>要放基地址

})
http.defaults.timeout = 5000
// 开启cookie携带
http.defaults.withCredentials = true
// 添加请求拦截器，对 token 做统一处理
http.interceptors.request.use(config => {
  // 对 token 做统一处理， 如果vuex中有token，则在请求头中 通过 Authorization字段 携带 给 后台
  if (store.state.token && store.state.refreshToken) {
    // 设置请求头
    config.headers.Authorization = `Bearer ${store.state.token}`;
    config.headers.RefreshToken=`Bearer ${store.state.refreshToken}`;

  } else if (sessionStorage.getItem("token")&&sessionStorage.getItem("refreshToken")) {
    config.headers.Authorization = 'Bearer ' + sessionStorage.getItem("token");
    config.headers.RefreshToken='Bearer '+ sessionStorage.getItem("refreshToken");
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器 可以对返回数据 或者 错误（token过期）做统一处理
http.interceptors.response.use(resp => { // http状态以2xx或3xx开头，执行成功的回调
  // resp.data 直接返回给组件，目的是 让组件 拿到数据 之后 少写 一层 .data
  console.log(resp.headers);
  if(resp.data.statusCode=='A0200'){
    if(confirm('您尚未登录，请登录后再试.点击确认按钮跳转到登录页')){
      router.replace({path: '/login?from=' + router.currentRoute.path});
      return resp.data;
    };
  }else if(resp.data.statusCode=='A0230'){
    if(confirm('登陆已过期，请重新登录')){
      router.replace({path: '/login?from=' + router.currentRoute.path});
      return resp.data;
    };
  } else if(resp.headers.get('refreshtoken')&&resp.headers.get('authorization')){
    console.log('刷新token='+resp.headers.get('refreshtoken'));
    console.log('验证token='+resp.headers.get('authorization'));
    store.commit('setToken', resp.headers.get('authorization'));
    store.commit('setRefreshToken', resp.headers.get('refreshToken'));
  }
  return resp.data
}, error => { // http状态以4xx或5xx开头，执行失败的回调
  // 401 就是一个 典型 的 失败，表示 token 过期 或者 无效
  // token过期的解决办法，两种
  // 1. 重新登录
  // console.log(router)//  '/layout/home'
  // 2. token续签（配合refresh_token解决）
  if (error.response.status === 401) {
    // 1. 清空 vuex 中 token
    store.commit('setToken', '') // 不一定要清空
    // 2. 跳转到登录页重新登录
    // router.replace({
    //   path: '/login?from=' + router.currentRoute.path
    // })
  }
  return Promise.reject(error)
})

// 导出 请求实例
export default http


