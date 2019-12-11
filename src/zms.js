import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";
import router from "./router";
import App from "./app";

class vue extends Vue {
  routes = [];

  constructor(param) {
    super({
      el: "#app",
      router: r,
      components: { App },
      template: "<App/>",
      routes: router(param.routers),
      ...param
    });
  }
}

vue.use(Vant);

[].map(component => {
  vue.component(component.name, component);
});

export default vue;
