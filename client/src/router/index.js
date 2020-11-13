import Vue from 'vue'
import VueRouter from 'vue-router'

import Forum from '../views/Forum'
import Board from "@/components/forum/board/Board";
import Article from "@/components/forum/board/Article";
import User from "../views/User.vue";
import AddArticle from "@/components/user/addarticle/AddArticle";
import Profile from "@/components/user/profile/Profile";
import UseDcard from "@/components/dcard/UseDcard";
import AllBoard from '@/components/forum/board/AllBoard'


Vue.use(VueRouter)


const routes = [
  {
    path: '/dcard',
    component: UseDcard,
    children: [
      {
        name: 'UseDcard',
        path: 'usedcard',
        component: UseDcard,
      },
    ]
  },
  {
    path: '/dcard/user',
    component: User,
    children: [
      {
        name: 'AddArticle',
        path: 'addarticle',
        component: AddArticle,
      },
      {
        name: 'Profile',
        path: 'profile',
        component: Profile,
      }
    ]
  },
  {
    path: '/dcard/forum',
    component: Forum,
    children: [
      {
        name: 'AllBoard',
        path: '/',
        component: AllBoard,
      },
      {
        name: 'Dressup',
        path: 'dressup',
        component: Board,
        children: [
          {
            name: 'Article',
            path: ':id',
            component: Article,
          },
        ]
      },
      {
        name: 'Frontend',
        path: 'frontend',
        component: Board,
      },
      {
        name: 'Funny',
        path: 'funny',
        component: Board,
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})


// to: 即將要進入的路由 from : 當前要離開的路由。 next(去哪的路由)
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.myToken ? true : false; //查看localStorage token 是否存在
  if (to.path === '/dcard/usedcard' || to.path === '/dcard/login') {

    next();
  } else {
    isLogin ? next() : next('/dcard/login') || next('/dcard/signup') // 如果 localStorage token 不存在則導入/login頁面，存在則放行。
  }
})

export default router

