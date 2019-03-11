import Vue from 'vue'
import Router from './vue-router'
import routes from './routes'

// Vue.use都会调用install 方法
// router-link router-view 全局组件
 
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
