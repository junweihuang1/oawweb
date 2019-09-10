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
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog title="请假详情" :visible.sync="isApply" width="35%">
      <Apply-leave
        v-if="isApply"
        :form="headform"
        @close="getclose"
        :openType="openType"
        :DataList="entryList"
      ></Apply-leave>
    </el-dialog>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import ruleTable from "@/components/Ca-table/Ca-rule-table.vue";
import ApplyLeave from "@/components/Ca-to-do/Apply-leave";
// import LeaveTable from "./components/leave-table";
import { changetime } from "@/components/global-fn/global-fn.js";
import { apiLeaveList, apiLeaveListById } from "@/request/api.js";
export default {
  name: "leavelist",
  data() {
    return {
      DataList: [],
      currentlimit: 15,
      currentpage: 1,
      isApply: false,
      headerList: [
        ["用户名", "applicant", 100],
        ["职位", "position", 180],
        ["请假类别", "leave_category", 100],
        ["开始时间", "start_time", 180],
        ["结束时间", "end_time", 180],
        ["状态", "status2", 100],
        ["原因", "reason"]
      ],
      headle: ["查看"],
      headform: {},
      openType: "",
      entryList: [],
      total: 0,
      leaveType: ["事假", "病假", "婚假", "产假", "丧假", "年假", "其他"]
    };
  },
  components: {
    ApplyLeave,
    ruleTable,
    paging
  },
  mounted() {
    this.getleaveList();
  },
  methods: {
    getlimit(e) {
      this.currentlimit = e;
      this.getleaveList();
    },
    getpage(e) {
      this.currentpage = e;
      this.getleaveList();
    },
    //获取请假列表
    getleaveList() {
      apiLeaveList({
        pageSize: this.currentlimit,
        limit: this.currentpage,
        token: localStorage.getItem("token")
      }).then(res => {
        this.total = res.totalCount;
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
          item.leave_category = this.leaveType[item.leave_category];
          item.start_time = changetime(item.start_time);
          item.end_time = changetime(item.end_time);
          return item;
        });
        console.log(res);
      });
    },
    getclose() {
      this.isApply = false;
      this.getleaveList();
    },
    opanLeaveList(row) {
      console.log(row);
      apiLeaveListById({ id: row.id }).then(res => {
        console.log(res);
        this.entryList = res.hisComment.map(item => {
          item.END_TIME_ = item.END_TIME_ ? changetime(item.END_TIME_) : "";
          return item;
        });
        this.headform = res.data[0];
        this.headform.start_time = changetime(this.headform.start_time);
        this.headform.end_time = changetime(this.headform.end_time);
        this.openType = "check";
        this.isApply = true;
      });
    },
    tableRowClassName(row) {
      if (row.status === 1) {
        return "color:#F56C6C;";
      }
      return "";
    },
    ApplyLeave() {
      this.entryList = [];
      this.openType = "add";
      this.isApply = true;
      this.headform = {
        applicant: localStorage.getItem("username"),
        position: localStorage.getItem("role_name"),
        start_time: "",
        end_time: "",
        leave_category: "",
        day_count: "",
        reason: "",
        userid: ""
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
