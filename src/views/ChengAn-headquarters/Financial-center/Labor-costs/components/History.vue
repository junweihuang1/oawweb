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
    <Ca-rule-table
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
    ></paging>
    <el-dialog
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
import IncomingWages from "./Incoming-wages";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import { apiuserWagesLibs, apidele_userWages } from "@/request/api.js";
export default {
  name: "History",
  data() {
    return {
      currentpage: 1,
      currentlimit: 15,
      total: 50,
      userName: "",
      companyList: [
        { company_id: 12, company_name: "诚安时代" },
        { company_id: 13, company_name: "传诚管理" },
        { company_id: 14, company_name: "诚安科技" },
        { company_id: 15, company_name: "传诚教育" },
        { company_id: 16, company_name: "诚安建设" }
      ],
      isadd: false,
      company_id: "",
      query_month: "",
      header: [
        ["中心名", "uc_wage_center_name", 110],
        ["用户名", "username"],
        ["出勤天数", "finance_wages_attCount"],
        ["休假天数", "finance_wages_vacaCount"],
        ["请假天数", "finance_wages_leaveCount"],
        ["实际出勤", "uc_wage_actualDay"],
        ["基本工资", "uc_wage_base"],
        ["岗位工资", "uc_wage_post"],
        ["绩效工资", "uc_wage_achieve"],
        ["津贴补助", "uc_wage_subsidy"],
        ["考勤扣除", "uc_wage_dedu"],
        ["应发小计", "uc_wage_baseTotal"],
        ["代扣社保", "uc_wage_socSec"],
        ["公积金", ""],
        ["扣除小计", ""],
        ["代扣个税", "uc_wage_tax"],
        ["实发工资", "uc_wage_realhair"]
      ],
      CostsList: [],
      headle: ["", "删除"]
    };
  },
  components: {
    CaRuleTable,
    paging,
    IncomingWages
  },
  mounted() {
    this.getCostsList();
  },
  methods: {
    closewin() {
      this.isadd = false;
    },
    add() {
      this.isadd = true;
    },
    deleteitem(e) {
      this.$confirm("确认删除" + e.username + "的工资信息？").then(res => {
        // this.$message.warning("此功能暂未启用");
        apidele_userWages({ finance_wages_id: e.finance_wages_id }).then(
          res => {
            console.log(res);
            this.$message.success(res.msg);
            this.getCostsList();
          }
        );
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
    query() {
      this.currentlimit = 15;
      this.currentpage = 1;
      this.getCostsList();
    },
    getCostsList() {
      let data = {
        limit: this.currentlimit,
        page: this.currentpage,
        uc_wage_yearMon: this.query_month,
        username: this.userName,
        uc_company_name: this.company_id
      };
      apiuserWagesLibs(data).then(res => {
        console.log(res);
        this.total = res.count;
        this.CostsList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
