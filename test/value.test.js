"use strict";
var calculate = require("../public/value");

describe("value", function() {
  window.test = {
    station: {
      id: "1",
      name: "2",
      sensors: [
        { id: 1, name: "压力" },
        { id: 2, name: "流量" },
        { id: 3, name: "浊度", unit: { a: "ZD" } }
      ]
    }
  };
});
