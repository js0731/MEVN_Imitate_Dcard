import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main'
import DressupBoard from "../components/DressupBoard";
import Signup from "../components/Signup";

import AddArticle from "../components/AddArticle";
import Profile from "../components/Profile";
Vue.use(VueRouter)


const routes = [
  {
    name: "Dcard",
    path: '/dcard',
    component: Signup,
  },
  {
    path: '/dcard/forum',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        component: DressupBoard,
      },
      {
        name: "DressupBoard",
        path: 'dressup',
        component: DressupBoard,
      },
    ]
  },
  {
    name: "addArticle",
    path: '/dcard/addarticle',
    component: AddArticle,
  },
  {
    name: "Signup",
    path: '/dcard/signup',
    component: Signup,
  },

  {
    name: "Profile",
    path: '/dcard/profile',
    component: Profile,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})


// to: 即將要進入的路由 from : 當前要離開的路由。 next(去哪的路由)
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.myToken ? true : false; //查看localStorage token 是否存在
  if (to.path === '/dcard') {
    next();
  } else {
    isLogin ? next() : next('/dcard') // 如果 localStorage token 不存在則導入/login頁面，存在則放行。
  }
})

export default router

