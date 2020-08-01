console.log ('引入成功')
 
(function(window){
    
    const PENDING = 'pending';
    const RESOLVED = 'resolved';
    const REJECTED = 'rejected';
 
    class Promise{
        /**
         * Promise构造函数
         * excutor:执行器函数 （同步执行）
         */
        constructor(excutor){
            //  将当前promise对象保存起来
            const self  = this;
            self.status = PENDING; // 给Promise对象指定一个status属性，初始值是pending
            self.data = undefined; // 给promise对象指定一个用于存储结果数据的属性
            self.callbacks = [];  //回调函数列表，其中每个元素结构是{onResolved(){},onRejected(){}}
 
            function resolve(value){
                // 如果当前状态不是pending，直接结束
                if (self.status != PENDING){
                    return;
                }
                // 将状态改为resolved
                self.status = RESOLVED;
                // 保存value数据
                self.data = value;
                // 如果有待执行的callback函数，异步执行回调
                if (self.callbacks.length>0){
                    self.callbacks.forEach(callbacksObj => {
                        setTimeout(()=>{ // 把所有成功的回调放进异步队列里面执行
                            callbacksObj.onResolved(value);
                        },0)
                        
                    });
                }
            }
            function reject(reason){
                // 如果当前状态不是pending，直接结束           
                if (self.status != PENDING){
                    return;
                }
                // 将状态改为rejected
                self.status = REJECTED;
                // 保存value数据
                self.data = reason;
                // 如果有待执行的callback函数，异步执行回调
                if (self.callbacks.length>0){
                    self.callbacks.forEach(callbacksObj => {
                        setTimeout(()=>{ // 把所有成功的回调放进异步队列里面执行
                            callbacksObj.onRejected(reason);
                        },0)
                    });
                }
            }
 
            //立即同步执行excutor 
            try{
                excutor(resolve, reject)
            }catch(error){
                // 如果执行器抛出异常，promise对象变为rejected状态
                reject(error)
            }
        }
 
        /**
         * Promise 原型对象的then()
         * 指定成功和失败的回调函数
         * return: 一个新的Promise对象
         */
        then(onResolved, onRejected){
        
            onResolved = typeof onResolved === 'function' ? onResolved : value => value // 向后传递成功的value
            // 指定默认的失败的回调，实现错误/异常传透的关键点
            onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
            const self = this;
    
            // 返回一个新的promise对象
            return new Promise((resolve,reject)=>{
    
                /**
                 * 调用指定回调函数处理，根据执行结果，改变return的promise的状态
                 * @param {*} callback  
                 */
                function handle(callback) {
                    /**
                     * 1.如果抛出异常，return的promise就会失败，reason就是error
                     * 2.如果回调函数返回的不是promise，return的promise就会成功，value就是返回的值
                     * 3.如果回调函数返回的是promise，return的promise结果就是这个promise的结果
                     */
                    try{
                        const result = callback(self.data);
                        if (result instanceof Promise) {
                            // result.then(
                            //     value =>resolve(value), // 当result成功时，返回的promise也成功
                            //     reason =>reject(reason) 
                            // )
                            result.then(resolve,reject)
                        } else {
                            // 3.
                            resolve(result);
                        }
                    }catch(error){
                        // 1.
                        reject(error);
                    }
                }
                //  当前状态还是pending，将回调函数保存起来
                if (self.status === PENDING) {
                    self.callbacks.push({
                        onResolved(value){
                            handle(onResolved);
                        },
                        onRejected(reason){
                            handle(onRejected);
                        }
                    });
                } else if (self.status === RESOLVED){ //如果当前是resolved状态，异步执行onResolve并改变return的promise状态
                    setTimeout(()=>{
                        handle(onResolved);
                    });
                } else { //如果当前是rejected状态，异步执行onRejected 并改变return的promise状态
                    setTimeout(()=>{
                        handle(onRejected);
                    })
                }
            })
    
    
        }
    
        /**
         * Promise 原型对象的catch()
         * 指定失败的回调函数
         * return: 一个新的Promise对象
         */
        catch(onRejected){
            return this.then(undefined , onRejected)
        }
        /**
         * Promise 函数对象的resolve方法
         * return: 一个指定结果的成功的Promise
         */
        static resolve(value){
            return new Promise((resolve,reject)=>{
                // value是promise
                if (value instanceof Promise){
                    // 使用value的结果作为promise的结果
                    value.then(resolve,reject);
                }else {
                    resolve(value);
                }
            })
        }
        /**
         * Promise 函数对象的reject方法
         * return: 一个指定结果的成功的Promise
         */
        static reject(reason){
            //  返回一个失败的promise
            return new Promise((resolve,reject)=>{
                reject(reason);
            })
        }
        
        /**
         * Promise 函数对象的race方法
         * return: 一个Promise，状态由第一个有结果的Promise决定
         */
        static race(promises){
            // 返回一个promise
            return new Promise((resolve,reject)=>{
                promises.forEach((p,index)=>{
                    Promise.resolve(p).then(
                        value =>{  // 一旦有成功，将return变成成功
                            resolve(value);
                        },
                        reason =>{  // 一旦有失败，就return 失败
                            reject(reason);
                        }
                    )
                })
            })
        }
        /**
            * 自定义函数
            * 返回一个promise对象，在指定的事件后才确定结果
            */
        static resolveDelay(value,time){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve(value)
                },time);
            })
        }
        /**
            * 自定义函数
            * 返回一个promise对象，在指定的事件后才失败
            */
        static rejectDelay(reason,time){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    reject(reason)
                },time);
            })
        }
 
    }
 
    // 向外暴露Promise函数
    window.Promise = Promise;
})(window)