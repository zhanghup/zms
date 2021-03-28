import toobj from "./lib/toobj";
import Vals from './lib/vals'
import ajax, {Input} from "./lib/ajax";
import md5 from "./lib/md5.ts";
import Promisem from "./lib/promisem"

import DictFormat, {Dict} from "./lib/dict"

export class Zpx {
    private __vf = new Vals()
    private __dict = new DictFormat()

    public val(value: any, ...keyOrFormat: string[]) {
        return this.__vf.$v(value, ...keyOrFormat)
    }

    public ajax(input: Input) {
        return ajax(input)
    }

    public md5(input: string) {
        return md5(input)
    }

    public obj(input: any) {
        return toobj(input)
    }

    public SetDict(dicts: Dict[]) {
        this.__dict.SetDict(dicts)
        this.__vf.Dict(this.__dict)
    }
}

export default new Zpx()


export {
    Promisem
}