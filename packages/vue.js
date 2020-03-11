import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";
import _init from "./init";

import components from "./components/index.js";

for (let k in components) {
  Vue.component(k, components[k]);
}

class vue extends Vue {
  static sync = {};

  constructor(param) {
    super(_init(param));
  }
}

vue.use(Vant);
export default vue;
