<template>
  <div class="home">
    <router-item :list="list" />
  </div>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return {
      list:[
        {title:"订单中心",name:"Order",icon:"icon"},
        {title:"地址管理",name:"Address",icon:"icon"},
        {title:"关于我们",name:"About",icon:"icon"},
      ]
    }
  }
}
</script>
