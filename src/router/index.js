import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout/index.vue'
import Login from '../views/login'
import Home from '@/views/home'
import Article from '@/views/article'
import Publish from '@/views/publish'
Vue.use(VueRouter)

const routes = [

  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  {
    path: '/',
    component: layout,
    // 二级路由
    children: [
      {
      // 什么都不写就是默认子路由 跳转页面会直接显示
      // 首页
        path: '/home',
        component: Home
      },
      // 文章列表
      {
        path: '/article',
        component: Article
      },
      // 发布文章
      {
        path: '/publish',
        component: Publish
      }
    ]
  },
  {
    // 一级路由登录页
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

  //  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.path === '/login') {
    // 如果是登录页面，则直接允许通过
    next()
  } else {
    // 校验非登录页面
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
