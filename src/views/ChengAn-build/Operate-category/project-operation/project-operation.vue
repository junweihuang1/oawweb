<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="项目部名称">
        <el-input v-model="projectName"></el-input>
      </el-form-item>
      <el-form-item label="年度">
        <el-select v-model="years">
          <el-option
            v-for="(item, index) in yearList"
            :key="index"
            :value="item"
            :label="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      style="width:60%"
      :DataList="projectList"
      :headle="headle"
      :header="header"
      @checkleave="checklist"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="15"
      @setlimit="getlimit"
      @setpage="getpage"
    ></paging>
    <el-dialog :visible.sync="isopenlist" top="8vh" width="65%">
      <dialog-tabs v-if="isopenlist" :activeForm="activeForm"></dialog-tabs>
    </el-dialog>
  </div>
</template>

<script>
import dialogTabs from "./dialog-tabs";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apiprojectDepList } from "@/request/api.js";
export default {
  name: "projectOperation",
  data() {
    return {
      projectName: "",
      currentpage: 1,
      currentlimit: 15,
      years: "",
      yearList: [],
      projectList: [],
      header: [
        ["项目部名称", "constuct_project_dep_name", 110],
        ["项目负责人", "constuct_project_dep_leader"],
        ["合同总金额", "total", 110],
        ["采购成本", "purchaseCost", 110],
        ["人工成本", "laborCost", 110]
      ],
      headle: ["项目列表"],
      isopenlist: false,
      activeForm: {}
    };
  },
  components: {
    CaRuleTable,
    paging,
    dialogTabs
  },
  mounted() {
    this.getProjectList();
    let now = new Date();
    let nowYear = now.getFullYear();
    for (nowYear; nowYear >= 2016; nowYear--) {
      this.yearList.push(nowYear);
    }
  },
  methods: {
    getpage(val) {
      this.currentpage = val;
      this.getProjectList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getProjectList();
    },
    checklist(row) {
      console.log(row);
      this.activeForm = row;
      this.isopenlist = true;
    },
    getProjectList() {
      apiprojectDepList({
        dep_name: this.projectName,
        pageSize: this.currentlimit,
        limit: this.currentpage
      }).then(res => {
        console.log(res);
        this.projectList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
