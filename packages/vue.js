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
    console.log("11111111111111111", vue.sync)
    super(vue.sync);
    console.log("22222222222222222")
  }

  static initRouter (routes, params) {
    if (!routes) return;
    console.log("---------------")
    vue.sync.router = fnrouter(routes, params);
    console.log(vue.sync)
    return vue.sync.router;
  }

  static initVuex (store) {
    if (!store) return;
    vue.sync.store = fnstore(store);
    return vue.sync.store;
  }
}

vue.sync = {};

vue.use(Vant);
export default vue;
