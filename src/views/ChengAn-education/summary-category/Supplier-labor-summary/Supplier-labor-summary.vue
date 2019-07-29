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
      :headle="headle"
    ></Ca-rule-table>
  </div>
</template>

<script>
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
      header: [
        ["项目部", "constuct_project_dep_name"],
        ["项目负责人", "constuct_project_dep_leader"],
        ["合同总金额", ""],
        ["单价（天/人）", ""],
        ["年度", ""],
        ["1月", ""],
        ["2月", ""],
        ["3月", ""],
        ["4月", ""],
        ["5月", ""],
        ["6月", ""],
        ["7月", ""],
        ["8月", ""],
        ["9月", ""],
        ["10月", ""],
        ["11月", ""],
        ["12月", ""],
        ["累计付款", ""]
      ],
      headle: ["查看打卡"]
    };
  },
  components: {
    CaRuleTable
  },
  mounted() {
    this.getSummaryList();
  },
  methods: {
    getSummaryList() {
      let data = {
        companyId: 11,
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

<style lang="scss" scoped></style>
