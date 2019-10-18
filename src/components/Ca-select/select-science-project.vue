// 选择供应商组件
<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="项目名称">
        <el-input v-model="projectName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getProjectList">搜索</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :setheight="0.5"
      :header="header"
      :DataList="projectList"
      @dblclick="dblclick"
      :headle="['选择']"
      @checkleave="dblclick"
    ></Ca-rule-table>
    <paging
      :currentpage="currentPage"
      :currentlimit="currentlimit"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import { apideveConCheck } from "@/request/api.js";
export default {
  name: "selectProject",
  data() {
    return {
      currentPage: 1,
      currentlimit: 15,
      total: 0,
      projectList: [],
      header: [
        ["项目编号", "construct_project_id", 110],
        ["项目名称", "construct_project_name", 120],
        ["甲方", "construct_supplier_addr", 90],
        ["工程地址", "construct_project_addr"],
        ["项目经理", "construct_project_leader", 110],
        ["项目经理联系方式", "construct_project_leaderTel", 160]
      ],
      projectName: ""
    };
  },
  watch: {},
  components: {
    CaRuleTable,
    paging
  },
  created() {
    this.getProjectList();
  },
  methods: {
    getlimit(e) {
      this.currentlimit = e;
      this.getProjectList();
    },
    getpage(e) {
      this.currentPage = e;
      this.getProjectList();
    },
    //双击选择项目
    dblclick(row) {
      this.$emit("setProject", row);
    },
    getProjectList() {
      apideveConCheck({
        pageSize: this.currentlimit,
        limit: this.currentPage,
        construct_project_name: this.projectName
      }).then(res => {
        console.log(res);
        this.total = res.total;
        this.projectList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
