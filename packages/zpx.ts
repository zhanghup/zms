// import Vue from "vue";
// import { GetValue, GetFormat, SetDicts } from "./init/value";
export * from "./lib/promise";

// import axios from "./init/axios";
// export { GetValue, GetFormat, SetDicts, Promisem, ajax, utils, axios };

import Vals from './lib/vals'
import ajax, {Input} from "./lib/ajax";
import md5 from "./lib/md5.ts";

import DictFormat, {Dict} from "./lib/dict"

export class Zpx {
    private vf = new Vals()
    private dict = new DictFormat()

    public $v(value: any, ...keyOrFormat: string[]) {
        return this.vf.$v(value, ...keyOrFormat)
    }

    public $ajax(input: Input) {
        return ajax(input)
    }

    public $md5(input: string) {
        return md5(input)
    }

    public SetDict(dicts: Dict[]) {
        this.dict.SetDict(dicts)
        this.vf.Dict(this.dict)
    }
}

export default new Zpx()

