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
        <el-button type="primary" @click="getLaborList">
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
import { apilaborCostMon } from "@/request/api.js";
export default {
  name: "costsSummary",
  data() {
    return {
      queryYear: "",
      projectName: "",
      currentlimit: 15,
      currentpage: 1,
      SummaryList: [],
      isopen: false,
      header: [
        ["项目", "construct_project_name", 90],
        ["施工项目", "construct_project_workTeam_category", 100],
        ["施工项目id", "construct_project_workTeam_id", 120],
        ["班组", "username", 75],
        ["合同金额", "construct_project_workTeam_amount", 100],
        ["单价（天/人）", "construct_project_workTeam_price", 130],
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
  created() {
    this.getLaborList();
  },
  methods: {
    closedialog() {
      this.isopen = false;
      this.$store.state.dialog_openTabs = [false, false, false];
    },
    checkcard(row) {
      console.log(row);
      this.departmentid = JSON.stringify(row.construct_project_workTeam_id);
      this.isopen = true;
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getLaborList();
    },
    getpage(val) {
      this.currentpage = val;
      this.getLaborList();
    },
    getLaborList() {
      let data = {
        companyId: this.companyId,
        hr_attend_date: this.queryYear,
        construct_project_name: this.projectName,
        limit: this.currentpage,
        pageSize: this.currentlimit
      };
      apilaborCostMon(data).then(res => {
        console.log(res);
        this.SummaryList = res.data.map(item => {
          switch (item.construct_project_workTeam_category) {
            case 1:
              item.construct_project_workTeam_category = "预埋";
              break;
            case 2:
              item.construct_project_workTeam_category = "消防水";
              break;
            case 3:
              item.construct_project_workTeam_category = "消防电";
              break;
            case 4:
              item.construct_project_workTeam_category = "防排烟";
              break;
            case 5:
              item.construct_project_workTeam_category = "消防水电";
              break;
          }
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss"></style>
