<template>
  <div>
    <table id="demo" lay-filter="test"></table>
    <div
      v-show="false"
      type="text/html"
      id="toolbarDemo"
      v-for="(item, index) in headle"
      :key="index"
    >
      <div class="layui-btn-container">
        <button
          class="layui-btn layui-btn-sm"
          lay-event="add"
          v-if="index == 0 && item != ''"
        >
          {{ item }}
        </button>
        <button
          class="layui-btn layui-btn-sm"
          lay-event="delete"
          v-if="index == 1 && item != ''"
        >
          {{ item }}
        </button>
        <button
          class="layui-btn layui-btn-sm"
          lay-event="update"
          v-if="index == 2 && item != ''"
        >
          {{ item }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/request/http.js";
export default {
  name: "printTable",
  data() {
    return {
      // url: http.base_url + this.field,
      token: sessionStorage.getItem("token")
    };
  },
  props: {
    headle: Array,
    setheight: {
      type: Number,
      default: 0.78
    },
    field: String,
    header: Array
  },
  mounted() {
    var that = this;
    layui.use("table", function() {
      var table = layui.table;
      //第一个实例
      
      table.render({
        elem: "#demo",
        toolbar: "#demo",
        height: document.documentElement.scrollHeight * that.setheight,
        page: true,
        limit: 15,
        limits: [15, 30, 50, 100],
        headers: { token: sessionStorage.getItem("token") },
        url: http.base_url + that.field, //数据接口
        parseData: function(res) {
          console.log(res);
          let data = {
            code: 0, //解析接口状态
            msg: res.msg, //解析提示文本
            count: res.count, //解析数据长度
            data: res.data //解析数据列表
          };
          return data;
        },
        cols: that.header
      });
      table.on("tool(test)", function(obj) {
        // var checkStatus = table.checkStatus(obj.config.id);
        console.log(obj.data)
        switch (obj.event) {
          case "add":
            if(obj.data.uc_wage_status!==1){
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
      // table.on("event(uc_wage_base)", function(obj) {
      //   console.log(obj);
      // });
    });
  },
  methods: {}
};
</script>

<style lang="scss">
* {
  touch-action: pan-y;
}
</style>
