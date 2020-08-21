import Vue from "vue";
import zpx from "../packages/zpx";
import router from "./router";
import store from "./store";
import App from "./App";

Vue.config.productionTip = false;

zpx(Vue, {
  render(h) {
    return h(App);
  },
  router,
  store,
}).$mount("#app");
