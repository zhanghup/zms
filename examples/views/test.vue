<template>
  <div class="about">
    {{ $v("b.c", a) }}
    <div>{{ $utils.uuid() }}</div>
    <div>{{ $utils.md5("123") }}</div>
    <button @click="dian">点点点点</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      a: {
        b: {
          c: {
            d: {
              e: 1,
            },
          },
        },
      },
    };
  },
  methods: {
    dian() {
      this.$http.setHeader({ auth: "hahahahahhhahahha" });
      this.$http
        .post("https://junji.wx.ffcode.cn/swj/iot")
        .then((r) => {
          console.log(r);
        })
        .catch((r) => {
          console.log(r);
        });
    },
  },
  created() {},
};
</script>
