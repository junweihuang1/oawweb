<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="公司部门">
        <el-input v-model="companyName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getCostList">搜索</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="costList"
      :header="header"
      :headle="headle"
      @checkleave="details"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="20"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog :visible.sync="isopen" title="费用申请单">
      <cost-details v-if="isopen"></cost-details>
    </el-dialog>
  </div>
</template>

<script>
import costDetails from "./components/cost-details";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apigetCostappList, apigetCostappById } from "@/request/api.js";
export default {
  name: "costApplication",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      companyName: "",
      costList: [],
      header: [
        ["ID", "costapp_id", 70],
        ["公司部门", "costapp_company", 180],
        ["申请事项", "costapp_appitem"],
        ["申请类型", "costapp_application", 100],
        ["建单时间", "costapp_time", 100],
        ["费用金额", "costapp_amount", 100],
        ["状态", "costapp_status", 100]
      ],
      headle: ["查看"],
      isopen: false
    };
  },
  components: {
    CaRuleTable,
    paging,
    costDetails
  },
  mounted() {
    this.getCostList();
  },
  methods: {
    //查看
    details(row) {
      this.isopen = true;
      console.log(row);
      apigetCostappById({
        costapp_id: row.costapp_id
      }).then(res => {
        console.log(res);
      });
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getCostList();
    },
    getpage(val) {
      this.currentpage = val;
      this.getCostList();
    },
    getCostList() {
      apigetCostappList({
        own_seal_company: this.companyName,
        pageSize: this.currentlimit,
        limit: this.currentpage
      }).then(res => {
        console.log(res);
        this.costList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
