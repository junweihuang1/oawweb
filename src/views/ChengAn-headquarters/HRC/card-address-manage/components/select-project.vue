<template>
  <div>
    <el-dialog
      :visible="myopenSelect"
      title="选择项目名称"
      @close="closewin"
      top="8vh"
      width="60%"
      class="abow_dialog"
    >
      <el-form label-width="80px" size="mini" inline>
        <el-form-item label="项目名称">
          <el-input v-model="projectName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="queryProject">查询</el-button>
        </el-form-item>
      </el-form>
      <Ca-rule-table
        class="table"
        :DataList="projectList"
        :header="header"
        @dblclick="dblclick"
      ></Ca-rule-table>
      <paging
        @setpage="getpage"
        @setlimit="getlimit"
        :total="total"
        :currentlimit="currentlimit2"
        :currentpage="currentpage2"
      ></paging>
    </el-dialog>
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
      myopenSelect: this.isopenSelect,
      projectName: "",
      projectList: [],
      currentpage2: 1,
      currentlimit2: 15,
      total: 130,
      header: [
        ["项目编号", "construct_project_id", 70],
        ["项目名称", "construct_project_name", 250],
        ["施工项目", "construct_project_workTeam_category"],
        ["施工项目编号", "construct_project_workTeam_id"],
        ["班组", "username"],
        ["甲方", ""],
        ["工程地址", "construct_project_addr"],
        ["项目经理", "construct_project_leader"],
        ["项目经理联系方式", "construct_project_leaderTel"],
        ["合同项目开始日期 ", "construct_project_startDate"],
        ["合同项目结束日期 ", ""]
      ]
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  props: {
    isopenSelect: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isopenSelect(val) {
      this.myopenSelect = val;
      if (val && this.projectList == "") {
        this.getprojectList();
      }
    }
  },
  methods: {
    dblclick(row) {
      this.$emit("setSelectName", row);
    },
    getpage(e) {
      this.currentpage2 = e;
      this.getprojectList();
    },
    getlimit(e) {
      this.currentlimit2 = e;
      this.getprojectList();
    },
    queryProject() {
      this.getprojectList();
    },
    closewin() {
      this.$emit("closewin");
    },
    //获取项目名称
    getprojectList() {
      apiconstructCheck({
        construct_project_name: this.projectName,
        rows: this.currentlimit2,
        page: this.currentpage2
      }).then(res => {
        this.projectList = res.data.map(item => {
          item.construct_project_workTeam_category =
            item.construct_project_workTeam_category == 1
              ? "预埋"
              : item.construct_project_workTeam_category == 2
              ? "消防水"
              : item.construct_project_workTeam_category == 3
              ? "消防电"
              : "防排烟";
          return item;
        });
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss">
.abow_dialog {
  display: block;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
  .el-dialog {
    margin: 0 auto !important;
    height: 90%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
    }
  }
  .table {
    height: 85%;
    width: 100%;
    overflow: auto;
  }
}
</style>
