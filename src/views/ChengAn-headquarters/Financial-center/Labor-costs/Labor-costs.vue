<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item>
        <el-select v-model="company_id" placeholder="请选择公司">
          <el-option
            v-for="item in companyList"
            :key="item.company_id"
            :label="item.company_name"
            :value="item.company_id"
          >
          </el-option
        ></el-select>
      </el-form-item>
      <el-form-item
        ><el-input v-model="userName" placeholder="用户名" clearable></el-input
      ></el-form-item>
      <el-form-item
        ><el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="openwin">历史</el-button>
        <el-button type="primary" @click="openprint">打印</el-button>
        <el-button type="primary" @click="updata">更新</el-button>
      </el-form-item>
    </el-form>
    <!-- <Ca-rule-table
      :DataList="CostsList"
      :header="header"
      :iscellCilck="true"
      :Judge_field="Judge_field"
      cellField="基本工资"
      @cellCilck="cellCilck"
      :headle="headle"
      @checkleave="file"
    ></Ca-rule-table> -->
    <print-table
      :headle="headle"
      field="userWagesLists"
      :header="header2"
      @cellCilck="cellCilck"
      @checkleave="file"
    ></print-table>
    <!-- <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      @setpage="getpage"
      @setlimit="getlimit"
      :total="total"
    ></paging> -->
    <el-dialog
      :visible.sync="isopenEdit"
      title="编辑工资"
      width="30%"
      v-dialogDrag
    >
      <edit-wages
        v-if="isopenEdit"
        :wagesForm="wagesForm"
        @close="close"
      ></edit-wages>
    </el-dialog>

    <!-- <el-dialog :visible.sync="isprint" :show-close="true" :fullscreen="true">
    </el-dialog> -->

    <!-- <div v-if="isprint" class="printTable">
      <print-table
        @close="close"
        :CostsList="CostsList"
        v-if="isprint"
        :print_header="print_header"
      ></print-table>
    </div> -->
  </div>
</template>

<script>
// import printTable from "./components/print-table";
import editWages from "./components/edit-wages";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import printTable from "@/components/Ca-table/print-table.vue";
import {
  apiuserWagesLists,
  apisave_userWages,
  apiupdate_Wages
} from "@/request/api.js";
export default {
  name: "LaborCosts",
  data() {
    return {
      currentpage: 1,
      currentlimit: 15,
      total: 0,
      userName: "",
      companyList: [
        { company_id: 12, company_name: "诚安时代" },
        { company_id: 13, company_name: "传诚管理" },
        { company_id: 14, company_name: "诚安科技" },
        { company_id: 15, company_name: "传诚教育" },
        { company_id: 16, company_name: "诚安建设" }
      ],
      company_id: "",
      header2: [
        [
          //表头
          {
            field: "center_name",
            title: "中心名",
            width: 110,
            sort: true
          },
          { field: "username", title: "用户名", width: 90 },
          { field: "finance_wages_attCount", title: "出勤天数", width: 90 },
          { field: "finance_wages_vacaCount", title: "休假天数", width: 90 },
          { field: "finance_wages_leaveCount", title: "请假天数", width: 90 },
          { field: "usernuc_wage_actualDayame", title: "实际出勤", width: 90 },
          {
            field: "uc_wage_base",
            title: "基本工资",
            width: 90,
            event: "click"
          },
          { field: "uc_wage_post", title: "岗位工资", width: 90 },
          { field: "uc_wage_achieve", title: "绩效工资", width: 90 },
          { field: "uc_wage_subsidy", title: "津贴补助", width: 90 },
          { field: "uc_wages_dedu", title: "考勤扣除", width: 90 },
          { field: "uc_wages_baseTotal", title: "应发小计", width: 90 },
          { field: "uc_wage_socSec", title: "代扣社保", width: 90 },
          { field: "uc_wage_accFund", title: "公积金", width: 90 },
          { field: "", title: "扣除小计", width: 90 },
          { field: "uc_wage_tax", title: "代扣个税", width: 90 },
          { field: "uc_wage_realhair", title: "实发工资", width: 90 },
          {
            fixed: "right",
            title: "操作",
            toolbar: "#toolbarDemo",
            width: 150,
            align: "center"
          }
        ]
      ],
      header: [
        ["中心名", "center_name", 110],
        ["用户名", "username", 90],
        ["出勤天数", "finance_wages_attCount", 100],
        ["休假天数", "finance_wages_vacaCount", 100],
        ["请假天数", "finance_wages_leaveCount", 100],
        ["实际出勤", "uc_wage_actualDay", 100],
        ["基本工资", "uc_wage_base", 100],
        ["岗位工资", "uc_wage_post", 100],
        ["绩效工资", "uc_wage_achieve", 100],
        ["津贴补助", "uc_wage_subsidy", 100],
        ["考勤扣除", "uc_wages_dedu", 100],
        ["应发小计", "uc_wages_baseTotal", 100],
        ["代扣社保", "uc_wage_socSec", 100],
        ["公积金", "uc_wage_accFund", 100],
        ["扣除小计", "", 100],
        ["代扣个税", "uc_wage_tax", 100],
        ["实发工资", "uc_wage_realhair", 100]
      ],
      print_header: [
        ["中心名", "center_name", 2],
        ["用户名", "username", 3],
        ["出勤天数", "finance_wages_attCount", 2],
        ["休假天数", "finance_wages_vacaCount", 2],
        ["请假天数", "finance_wages_leaveCount", 2],
        ["实际出勤", "uc_wage_actualDay", 2],
        ["基本工资", "uc_wage_base", 4],
        ["岗位工资", "uc_wage_post", 2],
        ["绩效工资", "uc_wage_achieve", 2],
        ["津贴补助", "uc_wage_subsidy", 2],
        ["考勤扣除", "uc_wages_dedu", 2],
        ["应发小计", "uc_wages_baseTotal", 2],
        ["代扣社保", "uc_wage_socSec", 2],
        ["公积金", "uc_wage_accFund", 2],
        ["扣除小计", "", 2],
        ["代扣个税", "uc_wage_tax", 2],
        ["实发工资", "uc_wage_realhair", 2]
      ],
      CostsList: [],
      headle: ["存档"],
      wagesForm: {},
      isopenEdit: false,
      isprint: false,
      Judge_field: "uc_wage_status" //判断是否禁用的字段
    };
  },
  components: {
    CaRuleTable,
    paging,
    editWages,
    printTable
  },
  mounted() {
    this.getCostsList();
  },
  methods: {
    updata() {
      apiupdate_Wages().then(() => {
        console.log("OK");
        this.getCostsList();
      });
    },
    openprint() {
      this.isprint = true;
    },
    close() {
      this.isprint = false;
      console.info("isprint", this.isprint);
      this.isopenEdit = false;
      this.getCostsList();
    },
    cellCilck(row) {
      console.log(row);
      this.isopenEdit = true;
      this.wagesForm = {
        uc_wage_userid: row.userid,
        uc_wage_id: row.uc_wage_id ? row.uc_wage_id : 0,
        uc_wage_base: row.uc_wage_base,
        uc_wage_post: row.uc_wage_post,
        uc_wage_achieve: row.uc_wage_achieve,
        uc_wage_actualDay: row.uc_wage_actualDay,
        uc_wage_subsidy: row.uc_wage_subsidy,
        uc_wage_socSec: row.uc_wage_socSec,
        uc_wage_accFund: row.uc_wage_accFund,
        uc_wage_tax: row.uc_wage_tax
      };
    },
    openwin() {
      //遍历打开的标签，没有201就加上
      if (!this.$store.state.openTabs.some(item => item.id == "201")) {
        this.$store.commit("addTabs", {
          route: "/History",
          title: "历史人员成本",
          id: "201"
        });
      }
      this.$store.commit("changeActiveIndex", "201");
      this.$router.push({
        path: "/History"
      });
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getCostsList();
    },
    getpage(e) {
      this.currentpage = e;
      this.getCostsList();
    },
    //存档
    file(row) {
      row.uc_wage_userid = row.uc_wage_userId;
      row.uc_wage_center_name = row.center_name;
      row.uc_wage_company_name = row.company_name;
      console.log(row);
      this.$confirm(`是否存档?`)
        .then(() => {
          apisave_userWages(row).then(res => {
            console.log(res);
            this.getCostsList();
          });
        })
        .catch(() => {});
    },
    query() {
      this.currentlimit = 15;
      this.currentpage = 1;
      this.getCostsList();
    },
    getCostsList() {
      let data = {
        limit: this.currentlimit,
        page: this.currentpage,
        username: this.userName,
        company_id: this.company_id
      };
      apiuserWagesLists(data).then(res => {
        console.log(res);
        this.total = res.count;
        this.CostsList = res.data.map(item => {
          item.finance_wages_vacaCount =
            31 - item.finance_wages_attCount - item.finance_wages_leaveCount;
          item.uc_wages_dedu = (
            ((item.uc_wage_base + item.uc_wage_post) / 31) *
            item.finance_wages_vacaCount
          ).toFixed(2);
          item.uc_wages_baseTotal = (
            item.uc_wage_post +
            item.uc_wage_base +
            item.uc_wage_subsidy -
            item.uc_wages_dedu
          ).toFixed(2);
          item.uc_wage_realhair = (
            item.uc_wages_baseTotal -
            item.uc_wage_tax -
            item.uc_wage_socSec
          ).toFixed(2);
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.printTable {
  width: 100%;
  background: #fff;
  height: 937px;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
</style>
