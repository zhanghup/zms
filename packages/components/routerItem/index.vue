<template>
  <div class="item-wrap">
    <div v-for="item in list" :key="item.name"  class="item">
      <i></i>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>
<script>
/*
[
  {
    "title":"订单中心"，
    “name":"Order",
    "icon":"order",
    "params":{},
  }
]
*/
export default {
  name:"router-item",
  props:{
    list:Array
  }
}
</script>
<style lang="less" scoped>
.item-wrap{
  display:flex;
  flex-direction:column;
}


</style>
