<template>
  <div class="item-wrap">
    <div v-for="item in list" :key="item.name" class="item" @click="myrouter(item)">
      <i v-if="item.icon" class="iconfont icon-left" :class="[item.icon]"></i>
      <div class="item-content">
        <slot>
          <div>{{item.title}}</div>
        </slot>
      </div>
      <i class="iconfont iconright icon-right"></i>
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
    "query":{}
  }
]
*/
export default {
  name: "router-item",
  props: {
    list: Array,
    auto: { type: Boolean, default: true }
  },

  methods: {
    myrouter(item) {
      if (!this.auto) {
        this.$emit("on-change", item);
        return;
      }
      if (this.$router) {
        this.$router.push({
          name: item.name,
          params: item.params,
          query: item.query
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.item-wrap {
  display: flex;
  flex-direction: column;

  .item {
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 15px;
    border-bottom: 1px solid #eee;

    .item-content {
      flex-grow: 1;
    }
  }
}

.icon-left {
  margin-right: 10px;
  position: relative;
  top: 1px;
  color: #333;
}
.icon-right {
  font-size: 15px;
  color: #999;
}
</style>
