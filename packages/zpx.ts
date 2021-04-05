import toobj from "./lib/toobj";
import Vals from './lib/vals'
import ajax, {Input} from "./lib/ajax";
import md5 from "./lib/md5.ts";
import Promisem from "./lib/promisem"
import DictFormat, {Dict} from "./lib/dict"
import {createStore, StoreOptions, Store} from 'vuex'
import {createRouter, Router, RouterOptions, createWebHashHistory} from "vue-router";


export class Zpx {
    private __vf = new Vals()
    private __dict_init = false
    private __dict = new DictFormat()
    private __store_init = false
    private __store: Store<any> = createStore({})
    private __router_init = false
    private __router: Router = createRouter({history: createWebHashHistory(), routes: []})

    constructor() {
    }

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

    public store(): Store<any>{
        if (!this.__router_init){
            console.error("[zpx] vuex未初始化")
        }
        return this.__store
    }

    public router(): Router {
        if (!this.__router_init){
            console.error("[zpx] vue-router未初始化")
        }
        return this.__router
    }

    public InitStore<S>(options: StoreOptions<S>): Store<S> {
        this.__store = createStore(options)
        this.__store_init = true
        return this.__store
    }

    public InitRouter(options: RouterOptions): Router {
        this.__router = createRouter(options)
        this.__router_init = true
        return this.__router
    }

    public SetDict(dicts: Dict[]) {
        this.__dict.SetDict(dicts)
        this.__vf.Dict(this.__dict)
        this.__dict_init = true
    }
}

export default new Zpx()


export {
    Promisem
}