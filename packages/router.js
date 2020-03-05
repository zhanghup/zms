import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = null

export default {
  type: 'router',
  fn:function (routes) {
    router = new Router({
      mode: 'history',
      routes: routes
    })
    console.log(router,routes)
    return router
  }
}