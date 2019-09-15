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
        ><el-input v-model="userName" placeholder="用户名"></el-input
      ></el-form-item>
      <el-form-item
        ><el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="openwin">历史</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="CostsList"
      :header="header"
      :iscellCilck="true"
      cellField="基本工资"
      @cellCilck="cellCilck"
      :headle="headle"
      @checkleave="file"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      @setpage="getpage"
      @setlimit="getlimit"
      :total="total"
    ></paging>
    <el-dialog :visible.sync="isopenEdit" title="编辑工资" width="30%">
<edit-wages v-if="isopenEdit" :wagesForm="wagesForm" @close="close"></edit-wages>
    </el-dialog>
  </div>
</template>

<script>
import editWages from "./components/edit-wages";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import { apiuserWagesLists, apisave_userWages } from "@/request/api.js";
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
      headle: ["存档"],
      wagesForm:{},
      isopenEdit:false
    };
  },
  components: {
    CaRuleTable,
    paging,editWages
  },
  mounted() {
    this.getCostsList();
  },
  methods: {
    close(){
      this.isopenEdit=false
      this.getCostsList()
    },
    cellCilck(row){
      console.log(row)
      this.isopenEdit=true
      this.wagesForm={
        uc_wage_userId:row.userid,
        uc_wage_id:row.uc_wage_id?row.uc_wage_id:0,
        uc_wage_base:row.uc_wage_base,
        uc_wage_post:row.uc_wage_post,
        uc_wage_achieve:row.uc_wage_achieve,
        uc_wage_actualDay:row.uc_wage_actualDay,
        uc_wage_subsidy:row.uc_wage_subsidy,
        uc_wage_socSec:row.uc_wage_socSec,
        uc_wage_accFund:row.uc_wage_accFund,
        uc_wage_tax:row.uc_wage_tax
      }
    },
    openwin() {
      this.$store.commit("addTabs", {
        route: "/History",
        title: "历史人员成本",
        id: "201"
      });
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
      row.uc_wage_center_name=row.center_name
      console.log(row);
      row.data=JSON.stringify(row)
      apisave_userWages(row).then(res => {
        console.log(res);
      });
    },
    query() {
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
        this.total=res.count
        this.CostsList = res.data.map(item => {
          item.finance_wages_vacaCount=31-item.finance_wages_attCount-item.finance_wages_leaveCount;
          item.uc_wages_dedu=((item.uc_wage_base+item.uc_wage_post)/31*item.finance_wages_vacaCount).toFixed(2)
          item.uc_wages_baseTotal =(item.uc_wage_post + item.uc_wage_base + item.uc_wage_subsidy-item.uc_wages_dedu).toFixed(2)
          item.uc_wage_realhair =
            (item.uc_wages_baseTotal - item.uc_wage_tax - item.uc_wage_socSec).toFixed(2);
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
