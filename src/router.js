import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default function (routes) {
  return new Router({
    mode: 'history',
    routes: routes
  })
}
