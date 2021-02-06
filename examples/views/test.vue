<template>
  <div class="about">
    {{ $v("b.c", a) }}
    <div>{{ $utils.uuid() }}</div>
    <div>{{ $utils.md5("123") }}</div>
    <button @click="dian">点点点点</button>
    <button @click="daochu">导出</button>
  </div>
</template>
<script>
import {ExportData} from "../../packages/init/excel"

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
    daochu(){
      ExportData({header:this.columns(),data:this.datas()})
      // ExportExcel(this.columns(),this.datas(),{filename:"a.xlsx"})
    },
    columns(){
      let cols = []
      for (let i = 0; i < 100; i++){
        cols.push({
          title:"AAA"+i,
        })
      }

      return [cols]
    },
    datas(){
      let datas = []
      for (let i = 0; i < 10000;i++){
        let info = []
        for (let j = 0; j < 100; j++){
          info.push({title:j})
        }
        datas.push(info)
      }
      return datas
    }
  },
  created() {},
};
</script>
