<template>
  <div>
    <table id="demo" lay-filter="test"></table>
    <script type="text/html" id="toolbarDemo">
      <div class="layui-btn-container">
        <button class="layui-btn layui-btn-sm" lay-event="add">添加</button>
        <button class="layui-btn layui-btn-sm" lay-event="delete">删除</button>
        <button class="layui-btn layui-btn-sm" lay-event="update">编辑</button>
      </div>
    </script>
  </div>
</template>

<script>
import http from "@/request/http.js";
export default {
  name: "printTable",
  data() {
    return {
      url: http.base_url + "userWagesLists",
      token: sessionStorage.getItem("token")
    };
  },
  props: {
    CostsList: Array,
    print_header: Array
  },
  mounted() {
    layui.use("table", function() {
      var table = layui.table;
      //第一个实例
      table.render({
        elem: "#demo",
        toolbar: "#demo",
        height: 600,
        page: true,
        limit: 15,
        limits: [15, 30, 50, 100],
        headers: { token: sessionStorage.getItem("token") },
        url: http.base_url + "userWagesLists", //数据接口
        parseData: function(res) {
          console.log(res);
          let data = {
            code: 0, //解析接口状态
            msg: res.msg, //解析提示文本
            count: res.count, //解析数据长度
            data: res.data //解析数据列表
          };
          console.log(data);
          //res 即为原始返回的数据
          return data;
        },
        cols: [
          [
            //表头
            {
              field: "center_companyId",
              title: "ID",
              width: 80,
              sort: true
            },
            { field: "username", title: "用户名", width: 80 },
            {
              fixed: "right",
              title: "操作",
              toolbar: "#toolbarDemo",
              width: 150,
              align: "center"
            }
          ]
        ]
      });
      table.on("tool(test)", function(obj) {
        console.log(obj);
        // var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
          case "add":
            console.log("添加");
            layer.msg("添加");
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
  },
  methods: {}
};
</script>

<style lang="scss" scoped></style>
