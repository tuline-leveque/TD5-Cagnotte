import { createRouter, createWebHistory } from 'vue-router'

import Cagnottes from '../views/Cagnottes.vue'
import CreateCagnotte from '../views/CreateCagnotte.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'router', redirect: "/cagnottes" },
    { path: '/cagnottes', name: 'home', component: Cagnottes },
    { path: '/cagnottes/new', name: 'cagnotte-create', component: CreateCagnotte },
  ],
})

export default router
