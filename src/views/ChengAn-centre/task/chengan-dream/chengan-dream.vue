<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="年度">
        <el-input v-model="queryYear" clearable></el-input>
      </el-form-item>
      <el-form-item> <el-button type="primary">查询</el-button> </el-form-item>
    </el-form>
    <Ca-rule-table :DataList="dreamList" :header="header"></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      :total="0"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apichengan_dream } from "@/request/api.js";
export default {
  name: "chenganDream",
  data() {
    return {
      queryYear: "",
      dreamList: [],
      header: [
        ["编号", ""],
        ["姓名", ""],
        ["类型", ""],
        ["年度", ""],
        ["诚安梦", ""],
        ["创建时间", ""],
        ["完成时间", ""],
        ["是否完成", ""]
      ],
      currentpage: 1,
      currentlimit: 15
    };
  },
  components: {
    CaRuleTable,
    paging
  },

  mounted() {
    this.getDreamList();
  },
  methods: {
    getpage(val) {
      this.currentpage = val;
      this.getDreamList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getDreamList();
    },
    getDreamList() {
      apichengan_dream({
        rows: this.currentlimit,
        page: this.currentpage,
        goal_year: this.queryYear
      }).then(res => {
        console.log(res);
        this.dreamList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
