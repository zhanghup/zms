<template>
  <div>dddddddddd</div>
  <div>user.name = {{username}}</div>
  <div>user.birth = {{birth}}</div>
  <div>children[0].name = {{c1}}</div>
  <div>children.[0].name = {{c2}}</div>
  <div>children[id=="1"].name = {{c3}}</div>
</template>
<script lang="ts" setup>
import zpx from "../../packages/zpx"

let info = {
  user: {
    name: "zander",
    birth: 1615454270,
  },
  children:[{id:"1",name:"小明",age:12,sub:{id:"3"}},{id:"2",name:"小红",age:7}]
}

const username = zpx.$v(info,"user.name")
const birth = zpx.$v(info,"user.birth","T:YYYY-MM-DD")
const c1 = zpx.$v(info,"children[0].name")
const c2 = zpx.$v(info,"children.[0].name")
const c3 = zpx.$v(info,`children[sub.id == "3"].name`)
</script>