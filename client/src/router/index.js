import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main'
import DressupBoard from "../components/DressupBoard";
import Signup from "../components/Signup";
Vue.use(VueRouter)


const routes = [
  {
    path: '/dcard/forum',
    name: 'Main',
    component: Main,
    children: [
      {
        name: "DressupBoard",
        path: 'dressup',
        component: DressupBoard,
      },
    ]
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