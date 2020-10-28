import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main'
import DressupBoard from "../components/DressupBoard";

Vue.use(VueRouter)


const routes = [
  {
    path: '/dcard',
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
]

const router = new VueRouter({
  mode: 'history',
  routes
})


export default router