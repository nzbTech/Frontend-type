import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/profil',
    name: 'profil',
    component: () => import('../views/AccountView.vue')
  },
  {
    path: '/panier',
    name: 'panier',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/reset-password/:id',
    name: 'reset-password',
    component: () => import('../views/ResetPasswordView.vue')
  },
  {
    path: '/pre-order/',
    name: 'order',
    component: () => import('../views/OrderView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
