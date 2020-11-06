import Vue from 'vue'
import VueRouter from 'vue-router'

import Forum from '../views/Forum'
import Board from "../components/Board";
import Signup from "../components/Signup";

import AddArticle from "../components/AddArticle";
import Profile from "../components/Profile";
import Login from "../components/Login";


Vue.use(VueRouter)


const routes = [
  {
    path: '/dcard/forum',
    component: Forum,
    children: [
      {
        name: 'Board',
        path: '/',
        component: Board,
      },
      {
        name: 'Board',
        path: '/',
        component: Board,
      },
      {
        name: 'Board',
        path: '/',
        component: Board,
      },
      {
        name: 'Board',
        path: '/',
        component: Board,
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
    name: "Login",
    path: '/dcard/login',
    component: Login,
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
  if (to.path === '/dcard/signup' || to.path === '/dcard/login') {
    next();
  } else {
    isLogin ? next() : next('/dcard/login') || next('/dcard/signup') // 如果 localStorage token 不存在則導入/login頁面，存在則放行。
  }
})

export default router

