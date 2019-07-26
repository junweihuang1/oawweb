<template>
  <div>
    <el-button @click="ApplyLeave" type="success" style="margin-bottom:20px;"
      >发起请假</el-button
    >
    <rule-table
      style="width:85%"
      :header="headerList"
      :DataList="DataList"
      @RowClassName="tableRowClassName"
      @checkleave="opanLeaveList"
      :headle="headle"
      :truestatus="3"
      :falsestatus="1"
      field="status"
      :columnIndex="5"
    ></rule-table>
    <leave-table
      :isopen="isopen"
      @setclose="getclose"
      :setform="form"
    ></leave-table>
    <Apply-leave :isApply="isApply" @setclose="getclose"></Apply-leave>
  </div>
</template>

<script>
import ruleTable from "@/components/Ca-table/Ca-rule-table.vue";
import ApplyLeave from "./components/Apply-leave";
import LeaveTable from "./components/leave-table";
import { changetime } from "@/components/global-fn/global-fn.js";
import { apiLeaveList } from "@/request/api.js";
export default {
  name: "leavelist",
  data() {
    return {
      DataList: [],
      isopen: false,
      isApply: false,
      form: {},
      headerList: [
        ["用户名", "applicant", 100],
        ["职位", "position", 180],
        ["请假类别", "leave_category", 100],
        ["开始时间", "start_time", 180],
        ["结束时间", "end_time", 180],
        ["状态", "status2", 100],
        ["原因", "reason"]
      ],

      headle: ["查看"]
    };
  },
  components: {
    LeaveTable,
    ApplyLeave,
    ruleTable
  },
  mounted() {
    apiLeaveList({
      pageSize: "10",
      limit: "1"
    })
      .then(res => {
        this.DataList = res.data.map(item => {
          switch (item.status) {
            case 0:
              item.status2 = "待审批";
              break;
            case 1:
              item.status2 = "不通过";
              break;
            case 3:
              item.status2 = "审批通过";
              break;
          }
          item.leave_category =
            item.leave_category == 0
              ? "事假"
              : item.leave_category == 1
              ? "病假"
              : "其它";
          item.start_time = changetime(item.start_time);
          item.end_time = changetime(item.end_time);
          return item;
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    getclose() {
      this.isopen = false;
      this.isApply = false;
    },
    opanLeaveList(item) {
      this.isopen = true;
      this.form = item;
    },
    tableRowClassName(row) {
      if (row.status === 1) {
        return "color:#F56C6C;";
      }
      return "";
    },
    ApplyLeave() {
      this.isApply = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
