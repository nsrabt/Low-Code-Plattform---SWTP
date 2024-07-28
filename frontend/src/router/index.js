import { createRouter, createWebHistory } from "vue-router";

import dashboard from "../Pages/master/dashboard.vue";

import home from "../Pages/home.vue"
import profile from "../Pages/profile.vue"
import login from "../Pages/login.vue"
import workflow from "../Pages/Workflow.vue"
import settings from "../Pages/settings.vue"
import pdfworkflow from "../Pages/pdfworkflow.vue"
import process from "../Pages/process.vue"
import fillingdata from "@/Pages/fillingdata.vue";
import pdfcontrol from "../Pages/pdfcontrol.vue"
import processroles from "../Pages/processroles.vue"
import Fillinglogin from "@/Pages/fillinglogin.vue";





const routes = [
  {
    name: 'Dashboard',
    path: '/',
    component: dashboard
  },
  {
    name: 'Home',
    path: '/home',
    component: home
  },
  {
    name: 'processroles',
    path: '/processroles',
    component: processroles
  },
  {
    name: 'Pdfcontrol',
    path: '/pdfcontrol',
    component: pdfcontrol
  },
  {
    name: 'fillingdata',
    path: '/fillingdata',
    component: fillingdata
  },
  {
    name: 'Pdfworkflow',
    path: '/pdfworkflow',
    component: pdfworkflow
  },
  {
    name: 'Settings',
    path: '/settings',
    component: settings
  },
  {
    name: 'Profile',
    path: '/profile',
    component: profile
  },
  {
    name: 'Login',
    path: '/login',
    component: login
  },
  {
    name: 'NewWorkflow',
    path: '/createWorkflow',
    component: workflow
  },

  {
    name: 'EditWorkflow',
    path: '/editWorkflow/:id',
    component: workflow
  },
  {
    name: 'fillinglogin',
    path: '/fillinglogin',
    component: Fillinglogin
  },
  {
    name: 'ProcessOverview',
    path: '/processOverview',
    component: process
  }
]
const router = Router();
export default router;
function Router() {
    const router = new createRouter({
        history: createWebHistory(),
        routes,
    });
    return router;
}