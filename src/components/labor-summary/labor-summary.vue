<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item label="年份">
        <el-date-picker
          type="year"
          value-format="yyyy"
          placeholder="请选择"
          v-model="queryYear"
          clearable
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="项目">
        <el-input
          placeholder="请输入"
          v-model="projectName"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getSummaryList">
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="SummaryList"
      :header="header"
      :setsummary="true"
      :headle="headle"
      @checkleave="checkcard"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="70"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>

    <dialog-tabs
      :companyId="companyId"
      :departmentid="departmentid"
      :isopen="isopen"
      @closewin="closedialog"
    ></dialog-tabs>
  </div>
</template>

<script>
import dialogTabs from "./dialog-tabs";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apifirmLaborCost } from "@/request/api.js";
export default {
  name: "SupplierLaborSummary",
  data() {
    return {
      queryYear: "",
      projectName: "",
      currentlimit: 15,
      currentpage: 1,
      SummaryList: [],
      isopen: false,
      header: [
        ["项目部", "constuct_project_dep_name", 90],
        ["项目负责人", "constuct_project_dep_leader"],
        ["合同总金额", "conAmount", 120],
        ["单价（天/人）", "construct_project_workTeam_price", 130],
        ["年度", "firmYear", 75],
        ["1月", "january", 75],
        ["2月", "february", 75],
        ["3月", "march", 75],
        ["4月", "april", 75],
        ["5月", "may", 75],
        ["6月", "June", 75],
        ["7月", "July", 75],
        ["8月", "August", 75],
        ["9月", "September", 75],
        ["10月", "October", 75],
        ["11月", "November", 75],
        ["12月", "december", 75],
        ["累计付款", "totalLaborCost", 100]
      ],
      headle: ["查看打卡"],
      departmentid: ""
    };
  },
  props: {
    companyId: Number
  },
  components: {
    CaRuleTable,
    paging,
    dialogTabs
  },
  mounted() {
    this.getSummaryList();
  },
  methods: {
    closedialog() {
      this.isopen = false;
      this.$store.state.dialog_openTabs = [false, false, false];
    },
    checkcard(row) {
      this.departmentid = row.constuct_project_dep_id.toString();
      this.isopen = true;
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getSummaryList();
    },
    getpage(val) {
      this.currentpage = val;
      this.getSummaryList();
    },
    getSummaryList() {
      let data = {
        companyId: this.companyId,
        firmYear: this.queryYear,
        constuct_project_dep_name: this.projectName,
        pageSize: this.currentlimit,
        limit: this.currentpage
      };
      apifirmLaborCost(data).then(res => {
        console.log(res);
        this.SummaryList = res.data;
      });
    }
  }
};
</script>

<style lang="scss"></style>
