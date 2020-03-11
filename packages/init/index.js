import fnrouter from "./router.js";
import fnstore from "./store.js";
import App from "./App";
import "./value";

export default function({ router, vue, app, store }) {
  return {
    el: "#app",
    render: h => {
      if (app) {
        return h(app);
      } else {
        return h(App);
      }
    },
    router: fnrouter(router),
    store: fnstore(store),
    ...vue
  };
}
