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
        <el-button type="primary" @click="query">
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :setheight="0.6"
      :DataList="cardList"
      :header="header"
      :setsummary="true"
      :headle="headle"
      @checkleave="openlist"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apifirmLaborCostPro } from "@/request/api.js";
export default {
  name: "CheckCard",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      queryYear: "",
      total: 0,
      projectName: "",
      cardList: [],
      header: [
        ["项目", "construct_project_name", 90],
        ["负责人", "construct_project_leader", 90],
        ["合同总金额", "conAmount", 110],
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
      headle: ["班组列表"],
      projectId: ""
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  props: {
    companyId: Number,
    departmentid: String
  },
  watch: {
    departmentid() {
      this.getCardList();
    }
  },
  mounted() {
    this.getCardList();
  },
  methods: {
    query() {
      this.currentpage = 1;
      this.currentlimit = 15;
      this.getCardList();
    },
    openlist(row) {
      this.$emit("openTeamList", row);
    },
    getpage(val) {
      this.currentpage = val;
      this.getCardList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getCardList();
    },
    getCardList() {
      let data = {
        companyId: this.companyId,
        firmYear: this.queryYear,
        constuct_project_name: this.projectName,
        projectDep: this.departmentid,
        pageSize: this.currentlimit,
        limit: this.currentpage
      };
      console.log(data);
      apifirmLaborCostPro(data).then(res => {
        console.log(res);
        this.total = res.total;
        this.cardList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
