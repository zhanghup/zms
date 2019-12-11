import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

[].map(component => {
  Vue.component(component.name, component);
});

export default {
  version: "1.0.0"
};
