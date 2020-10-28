import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main'


Vue.use(VueRouter)


const routes = [
  {
    path: '/dcard',
    name: 'Main',
    component: Main,
    children: [
      {
        name: "AllBoard",
        path: 'all',
        component: AllBoard,
      },
      {
        name: "DressupBoard",
        path: 'dressup',
        component: DressupBoard,
      },
      {
        name: "CookingBoard",
        path: 'cooking',
        component: CookingBoard,
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})


export default router