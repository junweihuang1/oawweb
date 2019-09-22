<template>
  <div>
    <el-form label-width="80px" size="mini" inline>
      <el-form-item label="项目名称">
        <el-input v-model="projectName"></el-input>
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
import { apiconstructCheck } from "@/request/api.js";
export default {
  name: "selectProject",
  data() {
    return {
      projectName: "",
      projectList: [],
      currentpage: 1,
      currentlimit: 15,
      total: 130,
      header: [
        ["项目编号", "construct_project_id", 70],
        ["项目名称", "construct_project_name", 250],
        ["施工项目", "construct_project_workTeam_category", 100],
        ["施工项目编号", "construct_project_workTeam_id", 120],
        ["班组", "username", 100],
        ["甲方", "", 80],
        ["工程地址", "construct_project_addr", 100],
        ["项目经理", "construct_project_leader", 100],
        ["项目经理联系方式", "construct_project_leaderTel", 150],
        ["合同项目开始日期 ", "construct_project_startDate", 150],
        ["合同项目结束日期 ", "", 150]
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
      let data = {
        construct_project_name: this.projectName,
        rows: this.currentlimit,
        page: this.currentpage
      };
      console.log(data);
      apiconstructCheck(data).then(res => {
        this.total = res.total;
        this.projectList = res.data.map(item => {
          item.construct_project_workTeam_category =
            item.construct_project_workTeam_category == 1
              ? "预埋"
              : item.construct_project_workTeam_category == 2
              ? "消防水"
              : item.construct_project_workTeam_category == 3
              ? "消防电"
              : item.construct_project_workTeam_category == 4?"防排烟":"消防水电";
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss"></style>
