import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DEView from '../views/DEView.vue'
import FRView from '../views/FRView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/de',
    name: 'DE',
    component: DEView
  },
  {
    path: '/fr',
    name: 'FR',
    component: FRView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
