<template>
  <div style="border:1px solid #E4E7ED;">
    <el-tabs v-model="currentActive" type="card">
      <el-tab-pane label="项目列表" name="1">
        <project-list
          :activeForm="activeForm"
          style="padding:10px;"
          @openProject="openProject"
        ></project-list>
      </el-tab-pane>
      <el-tab-pane label="项目信息" name="2" v-if="isopenProjectInfor">
        <project-infor
          style="padding:10px;"
          :openType="openType"
          :entryList="entryList"
          :headform="headform"
        ></project-infor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProjectInfor from "./components/project-infor";
import ProjectList from "./components/project-list";
import { apigetTeamByProject } from "@/request/api.js";
export default {
  name: "dialogTabs",
  data() {
    return {
      currentActive: "1",
      isopenProjectInfor: false,
      entryList: [],
      headform: Object,
      openType: ""
    };
  },
  props: {
    activeForm: Object
  },
  components: {
    ProjectList,
    ProjectInfor
  },
  methods: {
    openProject([type, val]) {
      switch (type) {
        //查看项目
        case "check":
          apigetTeamByProject({
            construct_project_id: val.construct_project_id
          }).then(res => {
            console.log(res);
            this.isopenProjectInfor = false;
            this.$nextTick(() => {
              this.isopenProjectInfor = true;
            });
            this.openType = "check";
            this.currentActive = "2";
            this.entryList = res.entry.map(item => {
              switch (item.construct_project_workTeam_category) {
                case 1:
                  item.construct_project_workTeam_category = "预埋";
                  break;
                case 2:
                  item.construct_project_workTeam_category = "消防水";
                  break;
                case 3:
                  item.construct_project_workTeam_category = "消防电";
                  break;
                case 4:
                  item.construct_project_workTeam_category = "防排烟";
                  break;
                case 5:
                  item.construct_project_workTeam_category = "消防水电";
                  break;
              }
              return item;
            });
            this.headform = res.head[0];
          });
          break;
        //查看项目
        case "add":
          this.openType = "add";
          this.isopenProjectInfor = false;
          this.$nextTick(() => {
            this.isopenProjectInfor = true;
          });
          this.currentActive = "2";
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
