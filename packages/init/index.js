import "./value";

import App from "./App";

export default function ({ vue, app }) {
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
