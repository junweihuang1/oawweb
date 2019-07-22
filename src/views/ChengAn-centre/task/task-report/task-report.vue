<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item label="姓名">
        <el-input v-model="userName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="selectCompany('建设公司')"
          >建设公司</el-button
        >
        <el-button type="primary" @click="selectCompany('科技公司')"
          >科技公司</el-button
        >
        <el-button type="primary" @click="selectCompany('教育公司')"
          >教育公司</el-button
        >
        <el-button type="primary" @click="selectCompany('传诚管理')"
          >传诚管理</el-button
        >
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="taskList"
      :header="header"
      id="table"
      style="overflow:auto;"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apiownWorkReport } from "@/request/api.js";
export default {
  name: "taskReport",
  data() {
    return {
      taskList: [],
      header: [
        ["主办", "sponsor", 80],
        ["工作分类", "own_workArrangHead_category", 100],
        ["工作内容", "own_workArranged_content"],
        ["指令", "arranger", 80],
        ["协办", "", 80],
        ["目前情况", "own_workArranged_current"],
        ["问题反馈", "", 100],
        ["协助备注", "", 100],
        ["创建时间", "own_workArranged_creatTime", 120],
        ["计划时间", "own_workArranged_planTime", 120],
        ["实际完成时间", "", 120],
        ["任务状态", "own_workArranged_status", 100],
        ["完成情况", "", 100],
        ["备注", "own_workArranged_remarks", 120]
      ],
      currentpage: 1,
      currentlimit: 15,
      total: 50,
      company_name: "",
      userName: ""
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    document.getElementById("table").style.height =
      document.body.scrollHeight * 0.77 + "px";
    this.getTaskList();
  },
  methods: {
    query() {
      this.userName = "";
      this.company_name = "";
      this.getTaskList();
    },
    selectCompany(e) {
      this.company_name = e;
      console.log(this.company_name);
      this.getTaskList();
    },
    getpage(e) {
      this.currentpage = e;
    },
    getlimit(e) {
      this.currentlimit = e;
    },
    getTaskList() {
      apiownWorkReport({
        rows: this.currentlimit,
        page: this.currentpage,
        company: this.company_name,
        userName: this.userName
      }).then(res => {
        this.taskList = res.data.map(item => {
          item.own_workArranged_status =
            item.own_workArranged_status == 1 ? "任务完成" : "延期";
          return item;
        });
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
