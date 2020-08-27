# Vue 扩展方法

## 扩展 Vue.prototype.\$v 方法

## 扩展 Vue.prototype.\$f 方法

## 扩展 Vue.prototype.\$utils 方法

### 1. \$utils.ajax

```js
// 方法
function Ajax({url,method,async,header,contentType,timeout, data,success,error})

// 例如
this.$utils.ajax({
    url:"/app/users",
    success:res=>{
        console.log(res)
    }
})
```

| 参数        | 说明                                                           | 默认值                                 |
| ----------- | -------------------------------------------------------------- | -------------------------------------- |
| url         | 请求参数                                                       | <span style="color:red;">\*必填</span> |
| method      | 请求方法                                                       | POST                                   |
| async       | 是否异步执行,由于 axios 不支持同步方法，因此扩充了这个使用方法 | true                                   |
| header      | 请求头                                                         | 无                                     |
| contentType | 请求数据类型                                                   | application/json                       |
| timeout     | 超时时间，同步方法不支持超时                                   | 10000(10 秒)                           |
| data        | 请求参数                                                       | 无                                     |
| success     | 成功回调                                                       | 无                                     |
| error       | 失败回调                                                       | 无                                     |

### 2. \$utils.uuid

```js
// 采用uuid.V4算法
this.$utils.uuid();
```

### 3. \$utils.md5

```js
this.$utils.md5();
```

### 4. \$utils.obj

```js
/*
    返回结果：
    result = {
        person:true,
        user:{
            name:"test",
            age:16
        },
    }
*/
let result = this.$utils.obj([
  { key: "user.name", value: "test" },
  { key: "user.age", value: 16 },
  { key: "person", value: true },
]);
```

## 扩展 Vue.prototype.\$http 方法
