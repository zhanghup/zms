import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let router = null;

export default function(routes) {
  router = new Router({
    mode: "history",
    routes: routes
  });
  return router;
}
