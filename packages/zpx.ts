// import Vue from "vue";
// import { GetValue, GetFormat, SetDicts } from "./init/value";
// import Promisem from "./init/promise";
// import ajax from "./init/utils/ajax.js";
// import utils from "./init/utils/index";
// import axios from "./init/axios";

// export { GetValue, GetFormat, SetDicts, Promisem, ajax, utils, axios };

import Vals from './lib/vals'

export class Zpx {
    private vf = new Vals()

    public $v(value: any, ...keyOrFormat: string[]) {
        return this.vf.$v(value, ...keyOrFormat)
    }
}

export default new Zpx()