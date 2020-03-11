<template>
  <div class="about">
    <test />
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
              e: 1
            }
          }
        }
      }
    };
  },
  created() {
    console.log(this.$v("b.c", this.a), ":-------------", this.a);
  }
};
</script>
