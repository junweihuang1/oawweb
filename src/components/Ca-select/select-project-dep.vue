<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item label="项目部名称">
        <el-input v-model="projectDepName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="getprojectList">查询</el-button>
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
import { apigetProjectDep } from "@/request/api.js";
export default {
  name: "selectProject",
  data() {
    return {
      projectDepName: "",
      projectList: [],
      currentpage: 1,
      currentlimit: 15,
      total: 130,
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
      let data = {
        projectDepName: this.projectDepName,
        limit: this.currentpage,
        pageSize: this.currentlimit
      };
      console.log(data);
      apigetProjectDep(data).then(res => {
        console.log(res);
        this.projectList = res.data;
      });
    }
  }
};
</script>

<style lang="scss"></style>
