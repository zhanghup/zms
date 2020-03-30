import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default function(zpx) {
  zpx.initVuex = store => {
    let mystore = new Vuex.Store(store);
    zpx.settings.store = mystore;
    return mystore;
  };
}
