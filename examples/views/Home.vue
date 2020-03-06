<template>
  <div class="home">
    <router-item :list="list"></router-item>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      list: [
        {
          title: "订单中心",
          name: "Order",
          icon: "iconorder",
          query: { a: 1, b: 2 }
        },
        { title: "地址管理", name: "Address", icon: "icondizhi" },
        { title: "关于我们", name: "About", icon: "iconguanyu" }
      ]
    };
  }
};
</script>
