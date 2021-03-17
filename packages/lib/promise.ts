const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

type TypeResolver = (res?: any) => any
type TypeExecutor = (resolve: TypeResolver,reject: TypeResolver) => any

interface ICallback {
    onResolved: (value: any) => any
    onRejected: (value: any) => any
}

export default class Promise {
    private status: string
    private data: any
    private callbacks: ICallback[];

    /**
     * Promise构造函数
     * excutor:执行器函数
     * async: 是否同步执行
     */
    constructor(excutor:TypeExecutor) {
        //  将当前promise对象保存起来
        this.status = PENDING; // 给Promise对象指定一个status属性，初始值是pending
        this.data = undefined; // 给promise对象指定一个用于存储结果数据的属性
        this.callbacks = [];  //回调函数列表，其中每个元素结构是{onResolved(){},onRejected(){}}

        let resolve = (value: any) => {
            // 如果当前状态不是pending，直接结束
            if (this.status != PENDING) {
                return;
            }
            // 将状态改为resolved
            this.status = RESOLVED;
            // 保存value数据
            this.data = value;
            // 如果有待执行的callback函数，异步执行回调
            if (this.callbacks.length > 1) {
                this.callbacks.forEach(callbacksObj => {
                    setTimeout(() => { // 把所有成功的回调放进异步队列里面执行
                        callbacksObj.onResolved(value);
                    }, 0)
                });
            } else if (this.callbacks.length === 1) {
                return this.callbacks[0].onResolved(value);
            }
        }

        let reject = (reason: any) => {
            // 如果当前状态不是pending，直接结束
            if (this.status != PENDING) {
                return;
            }
            // 将状态改为rejected
            this.status = REJECTED;
            // 保存value数据
            this.data = reason;
            // 如果有待执行的callback函数，异步执行回调
            if (this.callbacks.length > 1) {
                this.callbacks.forEach(callbacksObj => {
                    setTimeout(() => { // 把所有成功的回调放进异步队列里面执行
                        callbacksObj.onRejected(reason);
                        // console.log(callbacksObj.onRejected(reason))
                    }, 0)
                });
            } else if (this.callbacks.length === 1) {
                return this.callbacks[0].onRejected(reason);
            }
        }

        try {
            excutor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    /**
     * Promise 原型对象的then()
     * 指定成功和失败的回调函数
     * return: 一个新的Promise对象
     */
    then(onResolved: any, onRejected?: any) {
        onResolved = typeof onResolved === 'function' ? onResolved : (value: any) => value // 向后传递成功的value
        // 指定默认的失败的回调，实现错误/异常传透的关键点
        onRejected = typeof onRejected === 'function' ? onRejected : (reason: any) => {
            throw reason
        }
        const self = this;

        // 返回一个新的promise对象
        return new Promise((resolve: TypeResolver, reject: TypeResolver) => {

            /**
             * 调用指定回调函数处理，根据执行结果，改变return的promise的状态
             * @param {*} callback
             */
            function handle(callback: TypeResolver) {
                /**
                 * 1.如果抛出异常，return的promise就会失败，reason就是error
                 * 2.如果回调函数返回的不是promise，return的promise就会成功，value就是返回的值
                 * 3.如果回调函数返回的是promise，return的promise结果就是这个promise的结果
                 */
                try {
                    const result = callback(self.data);

                    if (result instanceof Promise) {
                        // result.then(
                        //     value =>resolve(value), // 当result成功时，返回的promise也成功
                        //     reason =>reject(reason)
                        // )
                        result.then(resolve, reject)
                    } else {
                        return result
                    }
                } catch (error) {
                    return reject(error);
                }
            }

            //  当前状态还是pending，将回调函数保存起来
            if (self.status === PENDING) {
                self.callbacks.push({
                    onResolved(value) {
                        return handle(onResolved);
                    },
                    onRejected(reason) {
                        return handle(onRejected);
                    }
                });
            } else if (self.status === RESOLVED) { //如果当前是resolved状态，异步执行onResolve并改变return的promise状态
                self.callbacks.push({
                    onResolved(value) {
                        return handle(onResolved);
                    },
                    onRejected(reason) {
                        return handle(onRejected);
                    }
                });
            } else { //如果当前是rejected状态，异步执行onRejected 并改变return的promise状态
                // setTimeout(()=>{
                //     handle(onRejected);
                // })
                self.callbacks.push({
                    onResolved(value) {
                        return handle(onResolved);
                    },
                    onRejected(reason) {
                        return handle(onRejected);
                    }
                });
            }
        })


    }

    /**
     * Promise 原型对象的catch()
     * 指定失败的回调函数
     * return: 一个新的Promise对象
     */
    catch(onRejected: TypeResolver) {
        return this.then(undefined, onRejected)
    }
}

