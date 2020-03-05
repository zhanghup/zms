import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  type:"store",
  fn:function (store){
    let mystore = new Vuex.Store(store)
    return mystore
  }
}
