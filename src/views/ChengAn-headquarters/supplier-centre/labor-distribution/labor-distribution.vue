<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="项目名称">
        <el-input v-model="projectName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getloborList">查询</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="laborList"
      :header="header"
      :headle="headle"
      @checkleave="checkTeam"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      :total="120"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog :visible.sync="isopen">
      <dialog-tabs :Inforlist="Inforlist" v-if="isopen"></dialog-tabs>
    </el-dialog>
  </div>
</template>

<script>
import dialogTabs from "./dialog-tabs";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apiworkerConList } from "@/request/api";
export default {
  name: "laborDis",
  data() {
    return {
      projectName: "",
      laborList: [],
      currentpage: 1,
      currentlimit: 15,
      header: [
        ["项目名称", "construct_project_name"],
        ["工程地址", "construct_project_addr"],
        ["项目经理", "construct_project_leader"],
        ["项目经理联系方式", "construct_project_leaderTel"],
        ["施工项目", "construct_project_workTeam_category"],
        ["班组", "username"]
      ],
      headle: ["查看班组"],
      isopen: false,
      Inforlist: {}
    };
  },
  components: {
    dialogTabs,
    paging,
    CaRuleTable
  },
  mounted() {
    this.getloborList();
  },
  methods: {
    checkTeam(row) {
      this.isopen = true;
      this.Inforlist = row;
      console.log(row);
    },
    getpage(val) {
      this.currentpage = val;
      this.getloborList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getloborList();
    },
    getloborList() {
      apiworkerConList({
        rows: this.currentlimit,
        page: this.currentpage,
        construct_project_name: this.projectName
      }).then(res => {
        this.laborList = res.rows.map(item => {
          item.construct_project_workTeam_category =
            item.construct_project_workTeam_category == 1
              ? "预埋"
              : item.construct_project_workTeam_category == 2
              ? "消防水"
              : "";
          return item;
        });
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
