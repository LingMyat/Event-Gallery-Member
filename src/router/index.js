import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            path: "/login",
            name: "login",
            component: () => import('../pages/auth/Login.vue'),
        },
        {
            path: "/register",
            name: "register",
            component: () => import('../pages/auth/Register.vue'),
        },
        {
            path: "/",
            name: "home",
            component: () => import('../pages/Home.vue'),
        }
    ],
});

export default router;