import "./value";
import "./axios";

import App from "./app";

export default function({ vue, app }) {
  return {
    el: "#app",
    render: h => {
      if (app) {
        return h(app);
      } else {
        return h(App);
      }
    },
    ...vue
  };
}
