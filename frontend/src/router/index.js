import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/login'
import Signup from '../components/signup'
import Profile from '../components/profile'
import Forum from '../components/forum'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Forum',
    component: Forum
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
