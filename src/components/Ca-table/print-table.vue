<template>
  <div>
    <table id="demo" lay-filter="test"></table>
  </div>
</template>

<script>
import http from "@/request/http.js";
export default {
  name: "printTable",
  data() {
    return {
      token: sessionStorage.getItem("token")
    };
  },
  props: {
    setheight: {
      type: Number,
      default: 0.78
    },
    field: String,
    header: Array,
    Judge_field: String,
    setdata: Object,
    pageName: String,
    limitName: String,
    totalName: String
  },
  beforeMount() {},
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      var that = this;
      console.log(that.setdata);
      layui.use("table", function() {
        var table = layui.table;
        //第一个实例
        table.render({
          elem: "#demo",
          toolbar: "#demo",
          height: document.documentElement.scrollHeight * that.setheight,
          page: true,
          totalRow: true,
          limit: 15,
          request: {
            pageName: that.pageName, //页码的参数名称，默认：page
            limitName: that.limitName //每页数据量的参数名，默认：limit
          },
          where: that.setdata,
          limits: [15, 30, 50, 100],
          headers: { token: sessionStorage.getItem("token") },
          url: http.base_url + that.field, //数据接口
          parseData: function(res) {
            console.log(res);
            let data = {
              code: 0, //解析接口状态
              msg: res.msg, //解析提示文本
              count: res[that.totalName], //解析数据长度
              data: res.data //解析数据列表
            };
            console.log(data);
            return data;
          },
          cols: that.header
        });
        table.on("tool(test)", function(obj) {
          switch (obj.event) {
            case "add":
              if (obj.data.uc_wage_status !== 1) {
                that.$emit("checkleave", obj.data);
              }
              break;
            case "click":
              that.$emit("cellCilck", obj.data);
              break;
            case "delete":
              layer.msg("删除");
              break;
            case "update":
              layer.msg("编辑");
              break;
          }
        });
      });
    }
  }
};
</script>

<style lang="scss">
* {
  touch-action: pan-y;
}
</style>
