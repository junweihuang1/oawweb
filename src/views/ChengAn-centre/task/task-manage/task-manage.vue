<template>
  <div>
    <el-form inline size="mini">
      <el-form-item>
        <el-date-picker
          v-model="start_Date"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="开始时间"
          clearable
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="end_Date"
          type="date"
          placeholder="结束时间"
          clearable
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table :DataList="WorkList" :header="header"></Ca-rule-table>
    <paging
      :total="60"
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import paging from "@/components/paging/paging";
import { apiownWorkList } from "@/request/api.js";
export default {
  name: "taskManage",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      WorkList: [],
      start_Date: "",
      end_Date: "",
      header: [
        ["工作分类", "own_workArrangHead_category"],
        ["工作内容", "own_workArranged_content"],
        ["指令", "arranger"],
        ["主办", "sponsor"],
        ["协办", "coordinator"],
        ["目前情况", "own_workArranged_current"],
        ["问题反馈", ""],
        ["协助备注", ""],
        ["创建时间", "own_workArranged_creatTime"],
        ["计划时间", "own_workArranged_planTime"],
        ["实际时间", "own_workArranged_finishTime"],
        ["完成情况", ""],
        ["备注", "own_workArranged_remarks"]
      ]
    };
  },
  mounted() {
    this.getWorkList();
  },
  components: {
    CaRuleTable,
    paging
  },
  methods: {
    getpage(val) {
      this.currentpage = val;
      this.getWorkList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getWorkList();
    },
    getWorkList() {
      let data = {
        limit: this.currentlimit,
        page: this.currentpage,
        user_finish: "",
        user_creat: "",
        user_own: "",
        date1: this.start_Date,
        date2: this.end_Date
      };
      apiownWorkList(data).then(res => {
        console.log(res);
        this.WorkList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
