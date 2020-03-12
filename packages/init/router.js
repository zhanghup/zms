import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let router = null;

export default function(routes,params) {
  router = new Router({
    mode: "history",
    routes: routes,
    ...params
  });
  return router;
}
