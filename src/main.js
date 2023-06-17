// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import http from './utils/request'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {BASE_PATH} from './utils/request'

Vue.config.productionTip = false
Vue.prototype.$http=http
Vue.use(ElementUI)
Vue.prototype.$BASE_PATH=BASE_PATH
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
