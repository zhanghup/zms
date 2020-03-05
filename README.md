# zander-vue-vant

## 开始

* routes.js
```js

export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]
```

* store.js
```js
export default {
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
}
```

* main.js
```js
import Vue from 'packages/vue.js'
import routes from './routes'
import store from './store'

new Vue({
  routes,
  store,
})


```