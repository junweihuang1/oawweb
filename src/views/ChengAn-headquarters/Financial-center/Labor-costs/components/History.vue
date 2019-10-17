<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item>
        <select-company @setCompanyName="getCompanyName"></select-company>
        <!-- <el-select v-model="company_id" placeholder="请选择公司">
          <el-option
            v-for="item in companyList"
            :key="item.company_id"
            :label="item.company_name"
            :value="item.company_id"
          >
          </el-option
        ></el-select> -->
      </el-form-item>
      <el-form-item
        ><el-input v-model="userName" placeholder="用户名" clearable></el-input
      ></el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="query_month"
          type="month"
          placeholder="选择月份"
          format="yyyy-MM"
          value-format="yyyy-MM"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        ><el-button type="primary" @click="query">查询</el-button></el-form-item
      >
      <el-form-item>
        <el-button type="primary" @click="add">添加</el-button>
      </el-form-item>
    </el-form>
    <print-table
      demo_id="history"
      lay_filter="lay_history"
      v-if="isreload"
      :url="url"
      :setdata="setdata"
      :header="header2"
      :title="print_title"
      pageName="page"
      limitName="limit"
      totalName="count"
      @delete="deleteitem"
    ></print-table>
    <!-- <Ca-rule-table
      :setsummary="true"
      :DataList="CostsList"
      :header="header"
      :headle="headle"
      @delete="deleteitem"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      @setpage="getpage"
      @setlimit="getlimit"
      :total="total"
    ></paging> -->
    <el-dialog
      top="8vh"
      v-dialogDrag
      :visible.sync="isadd"
      title="添加工资记录"
      width="35%"
      :append-to-body="true"
    >
      <Incoming-wages v-if="isadd" @close="closewin"></Incoming-wages>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/request/http.js";
import printTable from "@/components/Ca-table/print-table.vue";
import selectCompany from "@/components/Ca-select/select-company.vue";
import IncomingWages from "./Incoming-wages";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import { apiuserWagesLibs, apidele_userWages } from "@/request/api.js";
export default {
  name: "History",
  data() {
    return {
      url: http.base_url + "userWagesLibs",
      setdata: {},
      isreload: true,
      currentpage: 1,
      currentlimit: 15,
      total: 50,
      userName: "",
      isadd: false,
      company_id: "",
      query_month: "",
      header: [
        ["中心名", "uc_wage_center_name", 90],
        ["用户名", "username", 90],
        ["出勤天数", "finance_wages_attCount", 100],
        ["休假天数", "finance_wages_vacaCount", 100],
        ["请假天数", "finance_wages_leaveCount", 100],
        ["实际出勤", "uc_wage_actualDay", 100],
        ["基本工资", "uc_wage_base", 100],
        ["岗位工资", "uc_wage_post", 100],
        ["绩效工资", "uc_wage_achieve", 100],
        ["津贴补助", "uc_wage_subsidy", 100],
        ["考勤扣除", "uc_wage_dedu", 100],
        ["应发小计", "uc_wage_baseTotal", 100],
        ["代扣社保", "uc_wage_socSec", 100],
        ["公积金", "", 100],
        ["扣除小计", "", 100],
        ["代扣个税", "uc_wage_tax", 100],
        ["实发工资", "uc_wage_realhair", 100]
      ],
      header2: [
        [
          //表头
          {
            field: "uc_wage_center_name",
            title: "中心名",
            width: 100,
            sort: true
          },
          {
            field: "username",
            title: "用户名",
            width: 100,
            sort: true,
            totalRowText: "合计"
          },
          { field: "finance_wages_attCount", title: "出勤天数", width: 90 },
          {
            field: "finance_wages_vacaCount",
            title: "休假天数",
            width: 90
          },
          { field: "finance_wages_leaveCount", title: "请假天数", width: 90 },
          { field: "uc_wage_actualDay", title: "实际出勤", width: 90 },
          {
            field: "uc_wage_base",
            title: "基本工资",
            width: 90,
            event: "click"
          },
          { field: "uc_wage_post", title: "岗位工资", width: 90 },
          { field: "uc_wage_achieve", title: "绩效工资", width: 90 },
          { field: "uc_wage_subsidy", title: "津贴补助", width: 90 },
          {
            field: "uc_wage_dedu",
            title: "考勤扣除",
            width: 90
          },
          {
            field: "uc_wage_baseTotal",
            title: "应发小计",
            width: 90,
            totalRow: true
          },
          {
            field: "uc_wage_socSec",
            title: "代扣社保",
            width: 90,
            totalRow: true
          },
          { field: "uc_wage_accFund", title: "公积金", width: 90 },
          { field: "", title: "扣除小计", width: 90 },
          {
            field: "uc_wage_tax",
            title: "代扣个税",
            width: 90,
            totalRow: true
          },
          {
            field: "uc_wage_realhair",
            title: "实发工资",
            width: 90,
            totalRow: true
          },
          {
            fixed: "right",
            title: "操作",
            width: 150,
            align: "center",
            templet: d => {
              return `<button
          class="layui-btn layui-btn-danger layui-btn-sm"
          lay-event="delete"
        >
          删除
        </button>`;
            }
          }
        ]
      ],
      CostsList: [],
      headle: ["", "删除"],
      print_title: `员工工资表（${new Date().getMonth()}月份）`
    };
  },
  components: {
    CaRuleTable,
    paging,
    IncomingWages,
    selectCompany,
    printTable
  },
  mounted() {
    // this.getCostsList();
  },
  methods: {
    closewin() {
      this.isadd = false;
      this.getCostsList();
    },
    add() {
      this.isadd = true;
    },
    deleteitem(e) {
      this.$confirm("确认删除" + e.username + "的工资信息？")
        .then(res => {
          // this.$message.warning("此功能暂未启用");
          apidele_userWages({ finance_wages_id: e.finance_wages_id }).then(
            res => {
              console.log(res);
              this.$message.success(res.msg);
              this.isreload = false;
              this.$nextTick(() => {
                this.isreload = true;
              });
              // this.getCostsList();
            }
          );
        })
        .catch(() => {});
    },
    // getlimit(e) {
    //   this.currentlimit = e;
    //   this.getCostsList();
    // },
    // getpage(e) {
    //   this.currentpage = e;
    //   this.getCostsList();
    // },
    query() {
      // this.currentlimit = 15;
      // this.currentpage = 1;
      // this.getCostsList();
      this.setdata = {
        uc_wage_yearMon: this.query_month,
        username: this.userName,
        uc_wage_company_id: this.company_id
      };
      this.isreload = false;
      this.$nextTick(() => {
        this.isreload = true;
      });
    },
    getCompanyName(e) {
      // console.log(e);
      this.company_id = e.company_id;
      this.print_title = `${
        e.company_name
      }员工工资表（${new Date().getMonth()}月份）`;
      console.log(this.print_title);
    }
    // getCostsList() {
    //   let data = {
    //     limit: this.currentlimit,
    //     page: this.currentpage,
    //     uc_wage_yearMon: this.query_month,
    //     username: this.userName,
    //     uc_wage_company_id: this.company_id
    //   };
    //   console.log(data);
    //   apiuserWagesLibs(data).then(res => {
    //     console.log(res);
    //     this.total = res.count;
    //     this.CostsList = res.data;
    //   });
    // }
  }
};
</script>

<style lang="scss" scoped></style>
