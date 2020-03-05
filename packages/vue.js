import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'

import App from './App'
import fnrouter from "./router.js"
import fnstore from "./store.js"
import components from "./components/index.js"


for (let k in components){
  Vue.component(k,components[k])
}

function LazyLoad({routes,vue,app,store}){
  let params = {}

  if(routes){
    params.router = fnrouter.fn(routes)
  }
  
  if(store){
    params.store = fnstore.fn(store)
  }

  return {
      el: '#app',
      render: h => {
        if (app){
          return h(app)
        }else{
          return h(App)
        }
      },
      ...params,
      ...vue
    }
}


class vue extends Vue {
  constructor (pp) {
    let param = LazyLoad(pp)
   super(param )
  }
}

vue.use(Vant)
export default vue
