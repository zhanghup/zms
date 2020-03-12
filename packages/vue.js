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

  static initRouter  (routes,params){
    if (!routes) return;
    vue.sync.router = fnrouter(routes,params);
    return vue.sync.router;
  }

  static initVuex  (store) {
    if (!store) return;
    vue.sync.store = fnstore(store);
    return vue.sync.store;
  }
}

vue.sync = {};

vue.use(Vant);
export default vue;
