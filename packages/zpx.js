import Vue from "vue";
import initVue from "./init/vue";
import initRouter from "./init/router.js";
import initStore from "./init/store.js";
import { GetValue, GetFormat } from "./init/value";

let zpx = Vue;
zpx.settings = {};
initVue(zpx);
initStore(zpx);
initRouter(zpx);
export default zpx;

export { GetValue, GetFormat };
