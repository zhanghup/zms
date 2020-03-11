// import Vue from 'vue'
import store from "./store";
import Vue from "zpx";
import "./router";

Vue.config.productionTip = false;

// console.log(VV.config.productionTip,VV.test)

Vue.initVuex(store);

new Vue({});
