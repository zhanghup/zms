import toobj from "./lib/toobj";
import Vals from './lib/vals'
import ajax, {Input} from "./lib/ajax";
import md5 from "./lib/md5.ts";
import Promisem from "./lib/promisem"
import {Ref} from 'vue';
import DictFormat, {Dict} from "./lib/dict"
import {RouteLocationNormalizedLoaded, RouterOptions, RouteLocationRaw, NavigationFailure} from "vue-router"


interface IRouter {
    readonly currentRoute: Ref<RouteLocationNormalizedLoaded>;
    readonly options: RouterOptions;

    push(to: RouteLocationRaw): Promise<NavigationFailure | void | undefined>;

    replace(to: RouteLocationRaw): Promise<NavigationFailure | void | undefined>;

    go(delta: number): void;

}

interface IStore {
    readonly state: any;
    readonly getters: any;

    dispatch(type: string, payload?: any, options?: any): Promise<any>;

    commit(type: string, payload?: any, options?: any): void;

    [index: string]: any
}

export interface IGraphql {
    query?(methodfields: string, variables?: any, level?: number): Promisem

    mutate?(methodfields: string, variables?: any, level?: number): Promisem
}


export class Zpx {
    private __vf = new Vals()
    private __dict = new DictFormat()
    private __router: IRouter
    private __store: IStore
    private __gqlfn: (key: string) => IGraphql;
    private __gqlautofn: (opt: string, param?: any) => Promisem

    constructor() {
        this.__gqlfn = (key: string) => ({})
        this.__gqlautofn = (opt: string, param?: any) => (new Promisem((resolve => resolve())))
        this.__router = null
        this.__store = null
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

    public Router(): IRouter {
        return this.__router
    }

    public Store(): IStore {
        return this.__store
    }


    set gqlautofn(fn: (opt: string, param?: any) => Promisem) {
        this.__gqlautofn = fn
    }

    set gqlfn(fn: (key: string) => IGraphql) {
        this.__gqlfn = fn
    }

    set store(store: IStore) {
        this.__store = store
    }

    set router(router: IRouter) {
        this.__router = router
    }

    set dict(dicts: Dict[]) {
        this.__dict.SetDict(dicts)
        this.__vf.Dict(this.__dict)
    }
}

export default new Zpx()


export {
    Promisem
}