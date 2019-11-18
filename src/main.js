import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
import axios from 'axios'
import 'nprogress/nprogress.css'
import JSONbig from 'json-bigint'
// axios 默认是这样的
// 在内部使用 JSON.parse 把后端返回的数据字符串转换为对象给开发者使用
// axios.defaults.transformResponse = [function (data, headers) {
//   return JSON.parse(data)
// }]

// axios 默认会把后端返回的数据使用 JSON.parse 转为对象给我们使用
// 同时它也提供了让我们自定义转换的功能
// axios 在收到响应数据之后会经过这里
axios.defaults.transformResponse = [function (data, headers) {
  // Do whatever you want to transform the data

  // axios 默认使用 JSON.parse(data)
  // 我们这里手动配置使用 JSONbig.parse(data)
  // 任何接口都会返回数据
  // 所有请求返回的数据都要 JSONbig.parse(data) 转一下
  // 删除操作，后端返回的是空数据
  // 空数据一经转换就报错了
  // 说白了，当没有响应体的时候，JSONbig.parse(data) 执行就报错了

  // 把导致出错的代码放到 try 里面，把出错之后的处理放到 catch 里面
  // try-catch 是 JavaScript 的原生语法，就像 if-else 一样，专门用于捕获异常
  try {
    return JSONbig.parse(data)
  } catch (err) {
    console.log(err)
    // 一旦 try 里面的代码执行引发异常，那么就进入 catch 执行
    return {}
  }
}]

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use(function (config) {
  // console.log(config)
  const token = window.localStorage.getItem('user-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
