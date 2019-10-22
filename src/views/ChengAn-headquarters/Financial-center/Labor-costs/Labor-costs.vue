<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item>
        <select-company @setCompanyName="getCompanyName"></select-company>
      </el-form-item>
      <el-form-item
        ><el-input v-model="userName" placeholder="用户名" clearable></el-input
      ></el-form-item>
      <el-form-item
        ><el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="openwin">历史</el-button>
        <el-button type="primary" @click="updata">更新</el-button>
        <el-button type="primary" @click="file">存档</el-button>
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
      v-if="isreload"
      :setdata="setdata"
      :url="url"
      :Judge_field="Judge_field"
      :header="header2"
      :title="print_title"
      pageName="page"
      limitName="limit"
      totalName="count"
      @checkbox="checkbox"
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
  </div>
</template>

<script>
// import printTable from "./components/print-table";
import editWages from "./components/edit-wages";
// import paging from "@/components/paging/paging";
// import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import { http } from "@/request/http.js";
import selectCompany from "@/components/Ca-select/select-company.vue";
import printTable from "@/components/Ca-table/print-table.vue";
import { lastmonth_num } from "@/components/global-fn/global-fn";
import {
  apiuserWagesLists,
  apisave_userWages,
  apiupdate_Wages
} from "@/request/api.js";
export default {
  name: "LaborCosts",
  data() {
    return {
      url: "http://www.ca315189.com:89/userWagesLists", //localhost:8081
      print_title: `员工工资表（${new Date().getMonth()}月份）`,
      setdata: {},
      isreload: true,
      currentpage: 1,
      currentlimit: 15,
      total: 0,
      userName: "",
      company_id: "",
      header2: [
        [
          //表头
          {
            checkbox: true
          },
          {
            field: "uc_wage_status",
            title: "状态",
            width: 100,
            templet: d => {
              if (d.uc_wage_status === 1) {
                return `<span style="color:#ccc">已存档</span>`;
              } else {
                return `<span style="color:#0190A0">未存档</span>`;
              }
            }
          },
          {
            field: "center_name",
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
            field: "uc_wages_dedu",
            title: "考勤扣除",
            width: 90,
            totalRow: true
          },
          {
            field: "uc_wages_baseTotal",
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
            width: 90
          },
          {
            field: "uc_wage_realhair",
            title: "实发工资",
            width: 90,
            totalRow: true
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
      CostsList: [],
      wagesForm: {},
      isopenEdit: false,
      Judge_field: "uc_wage_status", //判断是否禁用的字段
      check_arr: []
    };
  },
  components: {
    // CaRuleTable,
    // paging,
    editWages,
    printTable,
    selectCompany
  },
  methods: {
    checkbox(row) {
      let repeat = this.check_arr.some(item => item.userid == row.userid);
      if (repeat) {
        this.check_arr = this.check_arr.filter(
          item => item.userid !== row.userid
        );
      } else {
        this.check_arr.push(row);
      }
    },
    updata() {
      apiupdate_Wages().then(() => {
        // this.getCostsList();
        this.isreload = false;
        this.$nextTick(() => {
          this.isreload = true;
        });
      });
    },
    close() {
      this.isopenEdit = false;
      // this.getCostsList();
      this.isreload = false;
      this.$nextTick(() => {
        this.isreload = true;
      });
    },
    cellCilck(row) {
      console.log(row);
      this.isopenEdit = true;
      this.wagesForm = {
        uc_wage_userId: row.userid,
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
    file() {
      this.check_arr.forEach(item => {
        item.uc_wage_userid = item.uc_wage_userId;
        item.uc_wage_center_name = item.center_name;
        item.uc_wage_company_name = item.company_name;
      });
      // console.log(this.check_arr);
      this.$confirm(`是否存档?`)
        .then(() => {
          apisave_userWages({
            rows: JSON.stringify(this.check_arr)
          }).then(res => {
            console.log(res);
            this.isreload = false;
            this.$nextTick(() => {
              this.isreload = true;
            });
          });
        })
        .catch(() => {});
    },
    //选择公司
    getCompanyName(e) {
      this.company_id = e.company_id;
      this.print_title = `${
        e.company_name
      }员工工资表（${new Date().getMonth()}月份）`;
    },
    query() {
      this.setdata = {
        username: this.userName,
        company_id: this.company_id
      };
      this.isreload = false;
      this.$nextTick(() => {
        this.isreload = true;
      });
      // this.currentlimit = 15;
      // this.currentpage = 1;
      // this.getCostsList();
    },
    getCostsList() {
      let data = {
        limit: this.currentlimit,
        page: this.currentpage,
        username: this.userName,
        company_id: this.company_id
      };
      apiuserWagesLists(data).then(res => {
        console.timeEnd("t1");
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
