import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/store.js'
import axios from 'axios'

import dashboard from '../Pages/master/dashboard.vue'

import home from '../Pages/home.vue'
import profile from '../Pages/profile.vue'
import login from '../Pages/login.vue'
import workflow from '../Pages/Workflow.vue'
import settings from '../Pages/settings.vue'
import pdfworkflow from '../Pages/pdfworkflow.vue'
import process from '../Pages/process.vue'
import fillingdata from '@/Pages/fillingdata.vue'
import pdfcontrol from '../Pages/pdfcontrol.vue'
import processroles from '../Pages/processroles.vue'
import Fillinglogin from '@/Pages/fillinglogin.vue'
import fillinghome from '@/Pages/fillinghome.vue'
import platformmanager from '@/Pages/platformmanager.vue'
const routes = [
  {
    name: 'Dashboard',
    path: '/',
    component: dashboard,
    meta: { requiresAuth: true }
  },
  {
    name: 'Home',
    path: '/home',
    component: home,
    meta: { requiresAuth: true }
  },
  {
    name: 'platformmanager',
    path: '/platformmanager',
    component: platformmanager,
    meta: { requiresAuth: true }
  },
  {
    name: 'fillinghome',
    path: '/fillinghome',
    component: fillinghome,
    meta: { requiresAuth: true }
  },
  {
    name: 'processroles',
    path: '/processroles',
    component: processroles,
    meta: { requiresAuth: true }
  },
  {
    name: 'Pdfcontrol',
    path: '/pdfcontrol',
    component: pdfcontrol,
    meta: { requiresAuth: true }
  },
  {
    name: 'fillingdata',
    path: '/fillingdata',
    component: fillingdata,
    meta: { requiresAuth: true }
  },
  {
    name: 'Pdfworkflow',
    path: '/pdfworkflow',
    component: pdfworkflow,
    meta: { requiresAuth: true }
  },
  {
    name: 'Settings',
    path: '/settings',
    component: settings,
    meta: { requiresAuth: true }
  },
  {
    name: 'Profile',
    path: '/profile',
    component: profile,
    meta: { requiresAuth: true }
  },
  {
    name: 'Login',
    path: '/login',
    component: login,
    meta: { guest: true }
  },
  {
    name: 'NewWorkflow',
    path: '/createWorkflow',
    component: workflow,
    meta: { requiresAuth: true }
  },
  {
    name: 'EditWorkflow',
    path: '/editWorkflow/:id',
    component: workflow,
    meta: { requiresAuth: true }
  },
  {
    name: 'fillinglogin',
    path: '/fillinglogin',
    component: Fillinglogin,
    meta: { requiresAuth: true }
  },
  {
    name: 'ProcessOverview',
    path: '/processOverview',
    component: process,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  await store.dispatch('checkAuth')
  const isLoggedIn = store.getters.isLoggedIn

  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
    console.log('User is not authenticated, redirecting to login')
    next({ name: 'Login' })
  } else if (to.matched.some((record) => record.meta.guest) && isLoggedIn) {
    console.log('User is authenticated, redirecting to home')
    next({ name: 'Home' })
  } else {
    console.log('Route does not require authentication or user is authorized, proceeding to route')
    next()
  }
})

export default router
