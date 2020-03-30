import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default function(zpx) {
  zpx.initRouter = (routes, params) => {
    let router = new Router({
      mode: "history",
      routes: routes,
      ...params
    });
    zpx.settings.router = router;
    return router;
  };
}
