<template>
  <div>
    <el-tabs tab-position="top" v-model="currentActive" type="card">
      <el-tab-pane label="项目打卡" name="1">
        <check-card
          :departmentid="departmentid"
          @openTeamList="openTeamList"
        ></check-card>
      </el-tab-pane>
      <el-tab-pane
        label="施工项目打卡"
        v-if="this.$store.state.dialog_openTabs[0]"
        name="2"
        ><team-list
          :projectId="projectId"
          @opencardlist="opecardlist"
        ></team-list
      ></el-tab-pane>
      <el-tab-pane
        label="工人打卡"
        v-if="this.$store.state.dialog_openTabs[1]"
        name="3"
      >
        <worker-list
          :teamId="teamId"
          @opendetaillist="opendetaillist"
        ></worker-list>
      </el-tab-pane>
      <el-tab-pane
        label="个人详情"
        v-if="this.$store.state.dialog_openTabs[2]"
        name="4"
      >
        <detailed-list
          :workTeamId="workTeamId"
          :userId="userId"
        ></detailed-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import detailedList from "./components/detailed-list";
import workerList from "./components/worker-list";
import checkCard from "./components/check-card";
import teamList from "./components/team-list";
export default {
  name: "dialogTabs",
  data() {
    return {
      currentActive: "1",
      projectId: "",
      teamId: "",
      userId: "",
      workTeamId: ""
    };
  },
  components: {
    checkCard,
    teamList,
    workerList,
    detailedList
  },
  props: {
    departmentid: Number
  },
  watch: {
    departmentid() {
      this.currentActive = "1";
    }
  },
  methods: {
    //打卡详情回调
    opendetaillist(row) {
      this.$store.state.dialog_openTabs = [true, true, true, false];
      this.workTeamId = row.construct_project_workTeam_id;
      this.userId = row.userid;
      this.currentActive = "4";
    },
    //打卡列表回调的子组件方法
    opecardlist(row) {
      this.$store.state.dialog_openTabs = [true, true, false, false];
      this.teamId = row.hr_attend_workTeamId.toString();
      this.currentActive = "3";
    },
    //班组列表回调的子组件方法
    openTeamList(row) {
      this.$store.state.dialog_openTabs = [true, false, false, false];
      this.projectId = row.construct_project_id;
      this.currentActive = "2";
    }
  }
};
</script>

<style lang="scss"></style>
