<template>
  <div class="about">
    <test />dddddddddd
    {{ $v("b.c", a) }}
  </div>
</template>
<script>
export default {
  data () {
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
  created () { }
};
</script>
