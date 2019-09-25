<template>
  <div style="border:1px solid #E4E7ED;">
    <el-tabs tab-position="top" v-model="currentActive" type="card">
      <el-tab-pane label="劳动力分配" name="0" style="padding:10px;">
        <el-form inline size="mini">
          <el-form-item label="项目名称">
            <el-input v-model="projectName" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
        </el-form>
        <Ca-rule-table
          style="width:100%;"
          :DataList="laborList"
          :header="header"
          :headle="headle"
          @checkleave="checkTeam"
        ></Ca-rule-table>
        <paging
          :currentpage="currentpage"
          :currentlimit="currentlimit"
          :total="total"
          @setpage="getpage"
          @setlimit="getlimit"
        ></paging>
      </el-tab-pane>
      <el-tab-pane label="班组人员" name="1" v-if="isopen">
        <team-infor
          v-if="isopen"
          :Inforlist="Inforlist"
          style="padding:10px;"
          @openadd="openadd"
          @openmove="openmove"
        ></team-infor>
      </el-tab-pane>
      <el-tab-pane
        label="添加人员"
        name="2"
        v-if="isopenadd"
        style="padding:10px;"
      >
        <select-worker
          @setWorker="getWorker"
          :Inforlist="Inforlist"
        ></select-worker>
      </el-tab-pane>
      <el-tab-pane label="调动" name="3" v-if="isopenmove">
        <select-project
          @setSelectName="getSelectName"
          style="padding:10px;"
        ></select-project>
      </el-tab-pane>
    </el-tabs>
    <!-- <el-dialog :visible.sync="isopen" v-dialogDrag>
      <dialog-tabs :Inforlist="Inforlist" v-if="isopen"></dialog-tabs>
    </el-dialog> -->
  </div>
</template>

<script>
import selectProject from "@/components/Ca-select/select-project";
import selectWorker from "@/components/Ca-select/select-worker";
import teamInfor from "./components/team-infor";
// import dialogTabs from "./dialog-tabs";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import {
  apiworkerConList,
  apimultiplayerApply,
  apisave_Worker
} from "@/request/api";
export default {
  name: "laborDis",
  data() {
    return {
      projectName: "",
      laborList: [],
      total: 0,
      isfull: false,
      currentpage: 1,
      currentlimit: 15,
      header: [
        ["项目名称", "construct_project_name", 170],
        ["工程地址", "construct_project_addr", 170],
        ["项目经理", "construct_project_leader", 100],
        ["项目经理联系方式", "construct_project_leaderTel", 150],
        ["施工项目", "construct_project_workTeam_category", 100],
        ["班组", "username", 100]
      ],
      headle: ["查看班组"],
      isopen: false,
      Inforlist: {},
      currentActive: "0",
      isopenadd: false,
      isopenmove: false,
      isreload: true
    };
  },
  components: {
    // dialogTabs,
    paging,
    CaRuleTable,
    teamInfor,
    selectWorker,
    selectProject
  },
  mounted() {
    this.getloborList();
  },
  methods: {
    //打开添加窗口
    openadd() {
      this.currentActive = "2";
      this.isopenmove = false;
      this.isopenadd = true;
    },
    getWorker(row) {
      let data = {
        construct_project_id: this.Inforlist.construct_project_id,
        construct_project_workTeam_id: this.Inforlist
          .construct_project_workTeam_id,
        supplierMod_worker_userId: row.userid
      };
      this.$confirm(
        `确定要添加<span style="color:red;">${
          row.username
        }</span>到<span style="color:red;">${
          this.Inforlist.construct_project_name
        }</span>吗？`,
        {
          dangerouslyUseHTMLString: true
        }
      )
        .then(() => {
          apisave_Worker(data).then(res => {
            this.$message.success(res.msg);
            this.isopenadd = false;
            this.isopenmove = false;
            this.currentActive = "1";
          });
        })
        .catch(() => {});
    },
    openmove([idarr, namearr]) {
      this.idarr = idarr;
      this.namearr = namearr;
      this.isopenadd = false;
      this.currentActive = "3";
      this.isopenmove = true;
    },
    //进行批量调动
    getSelectName(row) {
      let data = {
        suppliermod_worker_apply_proId: row.construct_project_id,
        suppliermod_worker_apply_teamId: row.construct_project_workTeam_id,
        cid: this.idarr.join(","),
        suppliermod_worker_apply_oldProId: this.Inforlist.construct_project_id
      };
      console.log(data);
      this.$confirm(
        `确定要把${this.namearr}等${this.namearr.length}人调到${
          row.construct_project_name
        }吗？`
      )
        .then(() => {
          apimultiplayerApply(data).then(res => {
            this.$message.success(res.msg);
            this.currentActive = "1";
            this.isopenadd = false;
            this.isopenmove = false;
            this.isreload = false;
            this.$nextTick(() => {
              this.isreload = true;
            });
          });
        })
        .catch(() => {});
    },
    /////
    ///////////////////////////////////////
    query() {
      this.currentpage = 1;
      this.currentlimit = 15;
      this.getloborList();
    },
    checkTeam(row) {
      this.currentActive = "1";
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
        console.log(res);
        this.total = res.total;
        this.laborList = res.rows.map(item => {
          item.construct_project_workTeam_category =
            item.construct_project_workTeam_category == 1
              ? "预埋"
              : item.construct_project_workTeam_category == 2
              ? "消防水"
              : item.construct_project_workTeam_category == 3
              ? "消防电"
              : item.construct_project_workTeam_category == 4
              ? "防排烟"
              : "消防水电";
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss">
.dialog-title {
  position: absolute;
  right: 30px;
}
</style>
