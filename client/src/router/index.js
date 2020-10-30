import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main'
import DressupBoard from "../components/DressupBoard";
import Signup from "../components/Signup";
import AddArticle from "../components/AddArticle";
Vue.use(VueRouter)


const routes = [
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
]

const router = new VueRouter({
  mode: 'history',
  routes
})


export default router