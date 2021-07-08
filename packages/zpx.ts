import toobj from "./lib/toobj";
import Vals from './lib/vals'
import ajax, {Input} from "./lib/ajax";
import md5 from "./lib/md5";
import Promisem from "./lib/promisem"
import DictFormat, {Dict, DictItem} from "./lib/dict"
import {createStore, StoreOptions, Store} from 'vuex'
import {createRouter, Router, RouterOptions, createWebHashHistory, RouteLocationNormalizedLoaded} from "vue-router";
import {Ref} from "vue"
import mitt from 'mitt';

export interface IGraphql {
    query(methodfields: string, variables?: any, level?: number): Promisem

    mutate(methodfields: string, variables?: any, level?: number): Promisem
}

export class Zpx {

    constructor() {
    }

    /** utils */
    private __vf = new Vals()
    private __dict_init = false
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

    public dict(key: string): Dict {
        return this.__dict.Dict(key)
    }

    public dictitem(key: string): DictItem[] {
        return this.__dict.DictItems(key)
    }

    public SetDict(dicts: Dict[]) {
        this.__dict.SetDict(dicts)
        this.__vf.Dict(this.__dict)
        this.__dict_init = true
    }/** utils end */


    /** vuex */
    private __store_init = false
    private __store: Store<any> = createStore({})

    public store(...key: string[]): Store<any> | any {
        if (!this.__store_init) {
            console.error("[zpx] vuex未初始化")
        }
        if (key && key.length > 0) {
            return this.val(this.__store.state, ...key)
        }
        return this.__store
    }

    public storeGet(key: string): any {
        return this.__store.getters[key]
    }

    public InitStore<S>(options: StoreOptions<S>): Store<S> {
        this.__store = createStore(options)
        this.__store_init = true
        return this.__store
    }/** vuex end */


    /** vue-router */
    private __router_init = false
    private __router: Router = createRouter({history: createWebHashHistory(), routes: []})

    public router(): Router {
        if (!this.__router_init) {
            console.error("[zpx] vue-router未初始化")
        }
        return this.__router
    }

    public route(): Ref<RouteLocationNormalizedLoaded> {
        if (!this.__router_init) {
            console.error("[zpx] vue-router未初始化")
        }
        return this.__router.currentRoute
    }

    public InitRouter(options: RouterOptions): Router {
        this.__router = createRouter(options)
        this.__router_init = true
        return this.__router
    }/** vue-router end */


    /** apollo */
    private __apollo_client = new Map<string, IGraphql>()
    private __apollo_client_init = false

    public apo(args: string, param?: any): Promisem {
        if (!this.__apollo_client_init) {
            console.error("[zpx] apollo未初始化")
        }
        let [key, type, method, level] = args.split(":")
        if (key == '') {
            key = 'default'
        }

        let gql = this.__apollo_client.get(key)
        if (gql == null) {
            console.error(`【apollo】对象"${key}" 未初始化完成...`)
            return new Promisem((resolve, reject) => reject(`【apollo】对象"${key}" 未初始化完成...`))
        }
        if (type == undefined) {
            console.error(`【apollo】对象查询方法未定义...`)
            return new Promisem((resolve, reject) => reject("【apollo】对象查询方法未定义..."))
        } else if (type == 'mutate') {
            return gql.mutate(method, param, parseInt(level || "0"))
        } else {
            return gql.query(method, param, parseInt(level || "0"))
        }

    }

    public apollo(name?: string): IGraphql {
        if (!this.__apollo_client_init) {
            console.error("[zpx] apollo未初始化")
        }
        if (!name) {
            name = "default"
        }
        let v = this.__apollo_client.get(name)
        if (!v) {
            console.error(`【apollo】对象"${name}" 未初始化完成...`)
            return new class implements IGraphql {
                mutate(methodfields: string, variables?: any, level?: number): Promisem {
                    return new Promisem((resolve, reject) => reject("【apollo】对象查询方法未定义..."))
                }

                query(methodfields: string, variables?: any, level?: number): Promisem {
                    return new Promisem((resolve, reject) => reject("【apollo】对象查询方法未定义..."))
                }
            }
        }
        return v
    }

    public InitApolloClient(cli: Map<string, IGraphql>) {
        this.__apollo_client = cli
        this.__apollo_client_init = true
        return this.__apollo_client
    }/** apollo end */


    /** mitt 事件总线 */
    private emitter = mitt();

    public emit(ty: string | symbol, data: any) {
        this.emitter.emit(ty, data)
    }

    public on(ty: string | symbol, fn: any) {
        this.emitter.on(ty, fn)
    }

    public off(ty: string | symbol, fn: any) {
        this.emitter.off(ty, fn)
    }

    public mittAll() {
        return this.emitter.all
    }/** mitt end */

}

let zz = new Zpx()
export default zz


export {
    Promisem,
}