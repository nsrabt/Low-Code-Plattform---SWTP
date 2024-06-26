import { createRouter, createWebHistory } from "vue-router";

import dashboard from "../Pages/master/dashboard.vue";

import home from "../Pages/home.vue"
import profile from "../Pages/profile.vue"
import login from "../Pages/login.vue"
import workflow from "../Pages/Workflow.vue"
import settings from "../Pages/settings.vue"
import pdfworkflow from "../Pages/pdfworkflow.vue"



const routes = [
    {
        name: 'Dashboard',
        path: '/',
        component:dashboard
    },
    {
        name: 'Home',
        path: '/home',
        component:home
    },
    {
        name: 'Pdfworkflow',
        path: '/pdfworkflow',
        component:pdfworkflow
    },
    {
        name: 'Settings',
        path: '/settings',
        component:settings
    },
    {
        name: 'Profile',
        path: '/profile',
        component:profile
    },
    {
        name: 'Login',
        path: '/login',
        component:login
    },
    {
        name: 'Workflow',
        path: '/workflow',
        component:workflow
    }
];
const router = Router();
export default router;
function Router() {
    const router = new createRouter({
        history: createWebHistory(),
        routes,
    });
    return router;
}