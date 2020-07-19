import { GetValue, GetFormat } from "./value";
import utils from "./utils/index"

import App from "./App";

export default function(zpx) {
  zpx.prototype.$utils = utils
  zpx.prototype.$v = GetValue
  zpx.prototype.$f = GetFormat


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
