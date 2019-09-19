<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item label="合同编号">
        <el-input v-model="addform.manage_contract_num"></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="addform.manage_contract_num"></el-input>
      </el-form-item>
      <el-form-item label="发包方">
        <el-input v-model="addform.manage_contract_num"></el-input>
      </el-form-item>
      <el-form-item label="年份">
        <el-input v-model="addform.manage_contract_num"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :setheight="0.5"
      :DataList="projectList"
      :header="header"
      @dblclick="dblclick"
    ></Ca-rule-table>
    <paging
      @setpage="getpage"
      @setlimit="getlimit"
      :total="total"
      :currentlimit="currentlimit"
      :currentpage="currentpage"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apigetContractItem } from "@/request/api.js";
export default {
  name: "selectProject",
  data() {
    return {
      addform: {
        manage_contract_num: "",
        manage_contract_name: "",
        manage_contract_firstParty: "",
        manage_contract_startTime: "",
        manage_contract_company: "",
        limit: this.currentpage,
        pageSize: this.currentlimit
      },
      projectDepName: "",
      projectList: [],
      currentpage: 1,
      currentlimit: 15,
      total: 0,
      header: [
        ["项目名称", "constuct_project_dep_name", 100],
        ["项目部负责人", "constuct_project_dep_leader", 160]
      ]
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    this.getprojectList();
  },
  methods: {
    query() {
      this.currentpage = 1;
      this.currentlimit = 15;
      this.getprojectList();
    },
    dblclick(row) {
      this.$emit("setSelectName", row);
    },
    getpage(e) {
      this.currentpage = e;
      this.getprojectList();
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getprojectList();
    },
    //获取项目名称
    getprojectList() {
      apigetContractItem(this.addform).then(res => {
        console.log(res);
        this.total = res.total;
        this.projectList = res.data;
      });
    }
  }
};
</script>

<style lang="scss"></style>
