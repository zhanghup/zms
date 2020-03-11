import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";
import _init from "./init";
import fnrouter from "./init/router.js";
import fnstore from "./init/store.js";

import components from "./components/index.js";

for (let k in components) {
  Vue.component(k, components[k]);
}

class vue extends Vue {
  constructor(param) {
    vue.sync = { ...vue.sync, ..._init(param) };
    super(vue.sync);
  }
}

vue.sync = {};
vue.initRouter = (routes) =>{
  if (!routes) return;
  vue.sync.router = fnrouter(routes);
  return vue.sync.router;
}

vue.initVuex = (store)=> {
  if (!store) return;
  vue.sync.store = fnstore(store);
  return vue.sync.store;
}



vue.use(Vant);
export default vue;
