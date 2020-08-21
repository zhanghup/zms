// import Vue from "vue";
import { GetValue, GetFormat } from "./init/value";
import Promisem from "./init/promise";
import ajax from "./init/utils/ajax.js";
import utils from "./init/utils/index";
import axios from "./init/axios";

export { GetValue, GetFormat, Promisem, ajax, utils, axios };

export default function(Vue, param = {}) {
  Vue.prototype.$utils = utils;
  Vue.prototype.$v = GetValue;
  Vue.prototype.$f = GetFormat;
  Vue.prototype.$http = axios;
  return new Vue(param);
}
