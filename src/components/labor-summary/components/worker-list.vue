<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item label="姓名">
        <el-input v-model="userName" placeholder="请输入" clearable> </el-input>
      </el-form-item>
      <el-form-item label="月份">
        <el-date-picker
          type="month"
          format="yyyy-MM"
          value-format="yyyy-MM"
          placeholder="请选择"
          v-model="queryYearMonth"
          clearable
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <print-table
      :setdata="setdata"
      :demo_id="table_id"
      :lay_filter="table_id"
      field="firmLaborCostPerson"
      v-if="isload"
      totalName="total"
      pageName="limit"
      limitName="pageSize"
      :header="header2"
      @checkleave="opendetaillist"
    ></print-table>
    <!-- <table :id="table_id" lay-filter="test2"></table> -->
    <!-- <Ca-rule-table
      style="width:70%;"
      :setheight="0.6"
      :DataList="workerList"
      :header="header"
      :setsummary="true"
      :headle="headle"
      @checkleave="opendetaillist"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging> -->
  </div>
</template>

<script>
import http from "@/request/http.js";
import printTable from "@/components/Ca-table/print-table.vue";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apifirmLaborCostPerson } from "@/request/api.js";
export default {
  name: "workerlist",
  data() {
    return {
      setdata: {
        workTeam_id: this.teamId
      },
      setheight: 0.6,
      isload: true,
      currentlimit: 15,
      currentpage: 1,
      total: 0,
      userName: "",
      queryYearMonth: "",
      workerList: [],
      header: [
        ["项目", "construct_project_name"],
        ["施工项目", "construct_project_workTeam_category", 100],
        ["打卡人", "username", 100],
        ["打卡年月", "yearMon"],
        ["出勤天数", "attendanceDays", 130],
        ["实际工作时长", "hr_attend_WTLength", 130],
        ["单价", "january", 90],
        ["应发工资", "wage", 100]
      ],
      headle: ["打卡详情"],
      header2: [
        [
          //表头
          {
            field: "construct_project_name",
            title: "项目",
            width: 90,
            totalRowText: "合计"
          },
          {
            field: "construct_project_workTeam_category",
            title: "施工项目",
            width: 100,
            templet: d => {
              d.construct_project_workTeam_category =
                d.construct_project_workTeam_category == 1
                  ? "预埋"
                  : d.construct_project_workTeam_category == 2
                  ? "消防水"
                  : d.construct_project_workTeam_category == 3
                  ? "消防电"
                  : d.construct_project_workTeam_category == 4
                  ? "防排烟"
                  : "消防水电";
              return d.construct_project_workTeam_category;
            }
          },
          { field: "username", title: "打卡人", width: 100 },
          { field: "yearMon", title: "打卡年月", width: 100 },
          { field: "attendanceDays", title: "出勤天数", width: 80 },
          {
            field: "hr_attend_WTLength",
            title: "实际工作时长",
            width: 80,
            totalRow: true
          },
          { field: "january", title: "单价", width: 80, totalRow: true },
          { field: "wage", title: "应发工资", width: 80, totalRow: true },
          {
            fixed: "right",
            title: "操作",
            width: 100,
            align: "center",
            templet: d => {
              return `<button
          class="layui-btn layui-btn-sm"
          lay-event="add"
        >
          查看打卡
        </button>`;
            }
          }
        ]
      ]
    };
  },
  components: {
    // CaRuleTable,
    // paging,
    printTable
  },

  props: {
    print_title: String,
    teamId: String,
    table_id: String
  },
  watch: {
    teamId() {
      // this.getdata();
      // this.isload = false;
      // this.$nextTick(() => {
      //   this.isload = true;
      // });
    }
  },
  created() {
    // this.getdata();
  },
  methods: {
    query() {
      this.setdata = {
        attend_date: this.queryYearMonth,
        userName: this.userName,
        workTeam_id: this.teamId
      };
      this.getdata();
      // this.currentpage = 1;
      // this.currentlimit = 15;
      // this.getTeamList();
    },
    getdata() {
      var that = this;
      console.log(http.base_url + "firmLaborCostPerson");
      layui.use("table", function() {
        var table = layui.table;
        //第一个实例
        table.render({
          elem: `#${that.table_id}`,
          toolbar: `#${that.table_id}`,
          height: document.documentElement.scrollHeight * that.setheight,
          page: true,
          title: that.print_title,
          totalRow: true,
          limit: 15,
          request: {
            pageName: "limit", //页码的参数名称，默认：page
            limitName: "pageSize" //每页数据量的参数名，默认：limit
          },
          where: that.setdata,
          limits: [15, 30, 50, 100],
          headers: { token: sessionStorage.getItem("token") },
          url: http.base_url + "firmLaborCostPerson", //数据接口
          parseData: function(res) {
            console.log(res);
            let data = {
              code: 0, //解析接口状态
              msg: res.msg, //解析提示文本
              count: res.total, //解析数据长度
              data: res.data //解析数据列表
            };
            console.log(data);
            return data;
          },
          cols: that.header2
        });
        table.on("tool(test2)", function(obj) {
          switch (obj.event) {
            case "add":
              if (obj.data.uc_wage_status !== 1) {
                that.$emit("opendetaillist", obj.data);
              }
              break;
            // case "click":
            //   that.$emit("cellCilck", obj.data);
            //   break;
            // case "delete":
            //   layer.msg("删除");
            //   break;
            // case "update":
            //   layer.msg("编辑");
            //   break;
          }
        });
      });
    },
    opendetaillist(row) {
      console.log(row);
      this.$emit("opendetaillist", row);
    }
    // getpage(val) {
    //   this.currentpage = val;
    //   this.getTeamList();
    // },
    // getlimit(val) {
    //   this.currentlimit = val;
    //   this.getTeamList();
    // },
    // getTeamList() {
    //   let data = {
    //     attend_date: this.queryYearMonth,
    //     userName: this.userName,
    //     workTeam_id: this.teamId,
    //     pageSize: this.currentlimit,
    //     limit: this.currentpage
    //   };
    //   apifirmLaborCostPerson(data).then(res => {
    //     console.log(res);
    //     this.total = res.total;
    //     this.workerList = res.data.map(item => {
    //       item.construct_project_workTeam_category =
    //         item.construct_project_workTeam_category == 2
    //           ? "消防水"
    //           : item.construct_project_workTeam_category == 3
    //           ? "消防电"
    //           : item.construct_project_workTeam_category == 4
    //           ? "防排烟"
    //           : "消防水电";
    //       return item;
    //     });
    //   });
    // }
  }
};
</script>

<style lang="scss" scoped></style>
