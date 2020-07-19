import zpx from "../../packages/zpx";

zpx.initRouter([
  {
    path: "/",
    name: "Test",
    component: () => import("../views/test.vue")
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  }
]);
