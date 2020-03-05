// import Vue from 'vue'
import store from './store'
import Vue from "../packages/vue"
import routes from './router'

Vue.config.productionTip = false

// console.log(VV.config.productionTip,VV.test)

new Vue({
  routes,
  store
})
