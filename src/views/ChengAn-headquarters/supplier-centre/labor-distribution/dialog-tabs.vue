<template>
  <div style="border:1px solid #E4E7ED;">
    <el-tabs tab-position="top" v-model="currentActive" type="card">
      <el-tab-pane label="班组人员" name="1">
        <team-infor
          v-if="isreload"
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
  </div>
</template>

<script>
import selectProject from "@/components/Ca-select/select-project";
import selectWorker from "@/components/Ca-select/select-worker";
import teamInfor from "./components/team-infor";
import { apisave_Worker, apimultiplayerApply } from "@/request/api.js";
export default {
  name: "dialogTabs",
  data() {
    return {
      currentActive: "1",
      isopenadd: false,
      isopenmove: false,
      isreload: true,
      idarr: [],
      namearr: []
    };
  },
  components: {
    teamInfor,
    selectWorker,
    selectProject
  },
  props: {
    Inforlist: Object
  },
  watch: {
    Inforlist() {
      this.currentActive = "1";
      this.isopenadd = false;
      this.isopenmove = false;
    }
  },
  methods: {
    //打开添加窗口
    openadd() {
      this.currentActive = "2";
      this.isopenmove = false;
      this.isopenadd = true;
    },
    getWorker(row) {
      console.log("dbclick");
      let data = {
        construct_project_id: this.Inforlist.construct_project_id,
        construct_project_workTeam_id: this.Inforlist
          .construct_project_workTeam_id,
        supplierMod_worker_userId: row.userid
      };
      // this.$confirm(
      //   `确定要添加<span style="color:red;">${
      //     row.username
      //   }</span>到<span style="color:red;">${
      //     this.Inforlist.construct_project_name
      //   }</span>吗？`,
      //   {
      //     dangerouslyUseHTMLString: true
      //   }
      // )
      //   .then(() => {
      apisave_Worker(data).then(res => {
        this.$message.success(res.msg);
        this.isopenadd = false;
        this.isopenmove = false;
        this.currentActive = "1";
      });
      // })
      // .catch(() => {});
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
    }
  }
};
</script>

<style lang="scss"></style>
