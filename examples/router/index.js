import Vue from "vue";
import router from "vue-router";
Vue.use(router);

export default new router({
  routes: [
    {
      path: "/",
      name: "Test",
      component: () => import("../views/test.vue"),
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../views/About.vue"),
    },
  ],
});
