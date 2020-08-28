# Vue 扩展设置

## 设置字典项

```js
import SetDicts from "zpx";

SetDicts([
  {
    code: "A01",
    values: [
      { name: "张三", value: "zhangsan" },
      { name: "李四", value: "lisi" },
    ],
  },
]);
```

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

- 示例 1

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

- 示例 2

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
let result = this.$utils.obj({
  "user.name": "test",
  "user.age": 16,
  person: true,
});
```

## 扩展 Vue.prototype.\$http 方法

## 扩展 Vue.prototype.\$v 方法

```js
/*
    key: 需要取值的key
    obj: 被取值的对象
    format: 详见Vue.prototype.$f
*/
this.$v(key, obj, ...format);

/*
    10W数据性能测试(911ms)
*/
this.$v("a.b.c.d.e.f", { a: { b: { c: { d: { e: { f: 1 } } } } } });
/*
    10W数据性能测试(1474ms)
*/
this.$v("a.b.c.[d.e.f === 2].d.e.f", { a: { b: { c: [{ d: { e: { f: 1 } } }, { d: { e: { f: 1 } } }, { d: { e: { f: 1 } } }] } } });
/*
    10W数据性能测试(2304ms)
*/
this.$v("a.b.c.[d.e.f === 2].d.e.f", { a: { b: { c: [{ d: { e: { f: 1 }, k: 2 } }, { d: { e: { f: 2 }, k: 3 } }, { d: { e: { f: 3 } }, k: 4 }] } } });
/*
    10W数据性能测试(1878ms)
*/
this.$v("a.b.c.[k === 2].d.e.f", {
  a: {
    b: {
      c: [
        { d: { e: { f: 1 } }, k: 2 },
        { d: { e: { f: 2 } }, k: 3 },
        { d: { e: { f: 3 } }, k: 4 },
      ],
    },
  },
});
```

## 扩展 Vue.prototype.\$f 方法

```js
/*
    v: 需要格式化的值
    format: 格式化的方式
*/
this.$f(v, ...format);
```

- format == string 方法

| 方法名   | 说明                                                | 案例                                                           |
| -------- | --------------------------------------------------- | -------------------------------------------------------------- |
| templage | 将值替换到摸个字符串中,需要包含 \${value}           | this.$f("abc","templage:哈哈${value}") => "哈哈 abc"           |
| toFixed  | 使用方式通 js 方法 toFixed                          | this.\$f(123,"toFixed:2") => 123.00                            |
| time     | 将时间戳格式化成字符串                              | this.\$f(0,"time:YYYY-MM-DD") => 1970-01-01                    |
| dict     | 格式化字典项，前提是已经[设置](#设置字典项)了字典项 | dicts=[{name:"你好",value:0}] this.\$f(0,"dict:A01") => "你好" |
