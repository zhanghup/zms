import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        meta: {
            title: "首页",
            keepAlive: true
        },
        component: () => import("./views/vals_test"),
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;