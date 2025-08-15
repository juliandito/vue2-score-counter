// src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'

import BadmintonCounter from '@/views/BadmintonCounter.vue'
import MatchList from '@/views/MatchList.vue'
import LiveCounter from '@/views/LiveCounter.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/match-list',
    name: 'Match List',
    component: MatchList
  },
  {
    path: '/counter',
    name: 'Counter',
    component: BadmintonCounter
  },
  {
    path: '/',
    name: 'Live Counter',
    component: LiveCounter
  },
]

// Create the router instance
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router