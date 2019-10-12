<template>
  <div>
    <el-dialog
      v-dialogDrag
      :visible.sync="myopen"
      top="8vh"
      width="85%"
      :append-to-body="true"
      @close="closewin"
    >
      <el-tabs
        tab-position="top"
        v-model="currentActive"
        type="card"
        style="border:1px solid #E4E7ED;"
      >
        <el-tab-pane label="项目打卡" name="1">
          <check-card
            style="padding:10px;"
            :companyId="companyId"
            :departmentid="departmentid"
            @openTeamList="openTeamList"
          ></check-card>
        </el-tab-pane>
        <el-tab-pane
          label="施工项目打卡"
          v-if="this.$store.state.dialog_openTabs[0]"
          name="2"
          ><team-list
            style="padding:10px;"
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
          :print_title="print_title"
            style="padding:10px;"
            :teamId="teamId"
            :table_id="table_id"
            @opendetaillist="opendetaillist"
          ></worker-list>
        </el-tab-pane>
        <el-tab-pane
          label="个人详情"
          v-if="this.$store.state.dialog_openTabs[2]"
          name="4"
        >
          <detailed-list
            style="padding:10px;"
            :workTeamId="workTeamId"
            :userId="userId"
          ></detailed-list>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
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
      workTeamId: "",
      myopen: this.isopen,
      print_title:"",
      table_id:""
    };
  },
  components: {
    checkCard,
    teamList,
    workerList,
    detailedList
  },
  props: {
    companyId: Number,
    departmentid: String,
    isopen: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    const now=new Date()
    const month=now.getMonth()+1
    //根据公司ID判断抬头
    this.print_title=this.companyId==1?`建设公司劳动力分供方承包费用汇总表-${month}月份`:this.companyId==2?`科技公司劳动力分供方承包费用汇总表-${month}月份`:''
    //根据公司ID分配layui的表格ID，防止无法加载
    this.table_id= this.companyId==1?`build_table`:this.companyId==2?`science`:'demo'
  },
  watch: {
    isopen(val) {
      this.myopen = val;
      this.currentActive = "1";
    }
  },
  methods: {
    closewin() {
      this.$emit("closewin");
    },
    //打卡详情回调
    opendetaillist(row) {
      this.$store.state.dialog_openTabs = [true, true, false];
      this.$nextTick(() => {
        this.$store.state.dialog_openTabs = [true, true, true];
      });
      this.workTeamId = row.construct_project_workTeam_id.toString();
      this.userId = row.userid.toString();
      this.currentActive = "4";
    },
    //打卡列表回调的子组件方法
    opecardlist(row) {
      this.$store.state.dialog_openTabs = [true, false, false];
      this.$nextTick(() => {
        this.$store.state.dialog_openTabs = [true, true, false];
      });
      this.teamId = row.hr_attend_workTeamId.toString();
      this.currentActive = "3";
    },
    //班组列表回调的子组件方法
    openTeamList(row) {
      this.$store.state.dialog_openTabs = [false, false, false];
      this.$nextTick(() => {
        this.$store.state.dialog_openTabs = [true, false, false];
      });
      this.projectId = row.construct_project_id.toString();
      this.currentActive = "2";
    }
  }
};
</script>

<style lang="scss"></style>
