import toobj from "./lib/toobj";
import Vals from './lib/vals'
import ajax, {Input} from "./lib/ajax";
import md5 from "./lib/md5.ts";
import Promisem from "./lib/promisem"
import DictFormat, {Dict} from "./lib/dict"
import {createStore, StoreOptions, Store} from 'vuex'
import {createRouter, Router, RouterOptions, createWebHashHistory} from "vue-router";

export interface IGraphql {
    query(methodfields: string, variables?: any, level?: number): Promisem

    mutate(methodfields: string, variables?: any, level?: number): Promisem
}

export interface GqlClient {
    [index: string]: IGraphql
}


export class Zpx {
    private __vf = new Vals()
    private __dict_init = false
    private __dict = new DictFormat()
    private __store_init = false
    private __store: Store<any> = createStore({})
    private __router_init = false
    private __router: Router = createRouter({history: createWebHashHistory(), routes: []})
    private __apollo_client: GqlClient = {}
    private __apollo_client_init = false

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

    public store(...key: string[]): Store<any> | any {
        if (!this.__store_init) {
            console.error("[zpx] vuex未初始化")
        }
        if (key && key.length > 0) {
            return this.val(this.__store.state, ...key)
        }
        return this.__store
    }

    public router(): Router {
        if (!this.__router_init) {
            console.error("[zpx] vue-router未初始化")
        }
        return this.__router
    }

    public apollo(args: string, param?: any): IGraphql | Promisem | undefined {
        if (!this.__apollo_client_init) {
            console.error("[zpx] apollo未初始化")
        }
        let [key, type, method, level] = args.split(":")
        let gql: IGraphql;
        if (key == '') {
            gql = this.__apollo_client['default']
            if (gql == null) {
                console.error(`【apollo】对象"default" 未初始化完成...`)
                return
            }
        } else {
            gql = this.__apollo_client[key]
            if (gql == null) {
                console.error(`【apollo】对象"${key}" 未初始化完成...`)
                return
            }
        }
        if (type == undefined) {
            return gql
        } else if (type == 'mutate') {
            return gql.mutate(method, param, parseInt(level || "0"))
        } else {
            return gql.query(method, param, parseInt(level || "0"))
        }
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

    public InitApolloClient(cli: GqlClient): GqlClient {
        this.__apollo_client = cli
        this.__apollo_client_init = true
        return this.__apollo_client
    }

    public SetDict(dicts: Dict[]) {
        this.__dict.SetDict(dicts)
        this.__vf.Dict(this.__dict)
        this.__dict_init = true
    }
}

let zz = new Zpx()
export default zz


export {
    Promisem,
}