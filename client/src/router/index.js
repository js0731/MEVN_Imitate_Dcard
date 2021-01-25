import Vue from 'vue'
import VueRouter from 'vue-router'

import Forum from '../views/Forum'
import AllArticle from "@/components/forum/articlelist/AllArticle";
import BoardArticle from "@/components/forum/articlelist/BoardArticle";
import Article from "@/components/forum/articlelist/article/Article";
import User from "../views/User.vue";
import AddArticle from "@/components/user/addarticle/AddArticle";
import Profile from "@/components/user/profile/Profile";
import UseDcard from "@/components/dcard/UseDcard";
import ErrorPage from "@/components/ErrorPage/ErrorPage.vue";
import Navbar from '../views/Navbar'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    component: Navbar,
  },
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
        name: 'AllArticle',
        path: '/dcard/forum/all',
        component: AllArticle,
      },
      {
        name: 'BoardArticle',
        path: '/dcard/forum/:boardPath',
        component: BoardArticle,

      },
      {
        name: 'Article',
        path: '/dcard/forum/:boardPath/article/:id',
        component: Article,
      },

    ]
  },
  {
    name: '404Page',
    path: '/*',
    component: ErrorPage,

  },

]

const router = new VueRouter({
  // mode: 'history',
  routes
})


// to: 即將要進入的路由 from : 當前要離開的路由。 next(去哪的路由)
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.myToken ? true : false; //查看localStorage token 是否存在
  if (to.path === '/dcard/usedcard' || to.path === '/dcard/forum/all' || to.path === '/dcard/forum/frontend' || to.path === '/dcard/forum/dressup' || to.path === '/dcard/forum/funny') {
    next();
  } else {
    isLogin ? next() : next('/dcard/usedcard')     // 如果 localStorage token 不存在則導入/login頁面，存在則放行。
  }
})

export default router

