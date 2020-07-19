<template>
  <div class="about">
    {{ $v("b.c", a) }}
    <div>{{$utils.uuid()}}</div>
    <div>{{$utils.md5("123")}}</div>
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
  created() {}
};
</script>
