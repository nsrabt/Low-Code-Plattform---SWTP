import { createRouter, createWebHistory } from "vue-router";

import dashboard from "../Pages/master/dashboard.vue";

import home from "../Pages/home.vue"
import profile from "../Pages/profile.vue"

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
        name: 'Profile',
        path: '/profile',
        component:profile
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