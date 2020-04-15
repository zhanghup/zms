import Vue from "vue";
import initVue from "./init/vue";
import initRouter from "./init/router.js";
import initStore from "./init/store.js";

import components from "./components/index.js";

for (let k in components) {
  Vue.component(k, components[k]);
}

let zpx = Vue;
zpx.settings = {};
initVue(zpx);
initStore(zpx);
initRouter(zpx);
export default zpx;
