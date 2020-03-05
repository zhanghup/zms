import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'


import App from './App'

function LazyLoad({routes,vue,app,store},callback){
  let params = {}
  let pms = []


  // 初始化vue-router
  if (routes){
    pms.push(import("./router"))
    
  }

  // 初始化vuex
  if (store){
    pms.push(import("./store"))
  }

  Promise.all(pms).then(list =>{
    for(let ls of list){
      let {type,fn} = ls.default
      switch(type){
        case "router": params.router = fn(routes);break;
        case 'store': params.store = fn(store);break;
      }
    }
  })

  if (callback){
    callback({
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
    })
  }
}


class vue extends Vue {
  constructor (pp) {
    
    LazyLoad(pp,(params)=>{
      super(params)
    })
    

  }
}

vue.use(Vant)
export default vue