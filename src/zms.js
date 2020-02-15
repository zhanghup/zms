import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import router from './router'
import App from './app'
import axios from 'axios'

class vue extends Vue {
  $axios = null
  $$settings = {}

  constructor (param) {
    super({
      el: '#app',
      render: h => h(App),
      routes: router(param.myroutes),
      ...param.vue
    })
    this.$$settings = param
    this.$$Init()
  }

  $$InitAxios () {
    this.$axios = axios.create()
  }

  $$Init () {
    this.$$initAxios()
    if (this.$$settings.init && this.$$settings.init instanceof Function) {
      this.$$settings.init.call(this)
    }
  }
}

vue.use(Vant)

export default vue
