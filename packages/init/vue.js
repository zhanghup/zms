import "./value";

import App from "./App";

export default function(zpx) {
  zpx.init = (param, app) => {
    let obj = {
      el: "#app",
      render: h => {
        if (app) {
          return h(app);
        } else {
          return h(App);
        }
      },
      ...zpx.settings,
      ...param
    };
    return new zpx(obj);
  };
}
