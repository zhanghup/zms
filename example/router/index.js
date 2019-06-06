import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@@/views/HelloWorld')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@@/views/test')
    }
  ]
})
