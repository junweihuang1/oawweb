<template>
  <div>
    <el-button @click="ApplyLeave" type="success">发起请假</el-button>
    <!-- <rule-table
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
    ></paging> -->
    <print-table
      v-if="isreload"
      :setdata="setdata"
      :url="url"
      :header="header2"
      pageName="limit"
      limitName="pageSize"
      totalName="totalCount"
      @checkleave="opanLeaveList"
    ></print-table>
    <el-dialog
      title="请假详情"
      :visible.sync="isApply"
      width="35%"
      v-dialogDrag
    >
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
import http from "@/request/http.js";
import printTable from "@/components/Ca-table/print-table.vue";
// import paging from "@/components/paging/paging";
// import ruleTable from "@/components/Ca-table/Ca-rule-table.vue";
import ApplyLeave from "@/components/Ca-to-do/Apply-leave";
// import LeaveTable from "./components/leave-table";
import { changetime } from "@/components/global-fn/global-fn.js";
import { apiLeaveList, apiLeaveListById } from "@/request/api.js";
export default {
  name: "leavelist",
  data() {
    return {
      url: http.base_url + "getLeaveList",
      isreload: true,
      DataList: [],
      setdata: {},
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
      leaveType: ["事假", "病假", "婚假", "产假", "丧假", "年假", "其他"],
      header2: [
        [
          //表头
          { field: "applicant", title: "用户名", width: 90, sort: true },
          { field: "position", title: "职位", width: 160 },
          {
            field: "leave_category",
            title: "请假类别",
            width: 100,
            templet: d => {
              return this.leaveType[d.leave_category];
            }
          },
          {
            field: "start_time",
            title: "开始时间",
            width: 160,
            templet: d => {
              return changetime(d.start_time);
            }
          },
          {
            field: "end_time",
            title: "结束时间",
            width: 160,
            templet: d => {
              return changetime(d.end_time);
            }
          },
          {
            field: "status2",
            title: "状态",
            width: 90,
            templet: d => {
              console.log(d);
              switch (d.status) {
                case 0:
                  d.status2 = `<span style="color:#E6A23C;">审批中</span>`;
                  break;
                case 1:
                  d.status2 = `<span style="color:#F56C6C;">不通过</span>`;
                  break;
                case 2:
                  d.status2 = "初始录入";
                  break;
                case 3:
                  d.status2 = `<span style="color:#67C23A;">审批通过</span>`;
                  break;
              }
              return d.status2;
            }
          },
          { field: "reason", title: "原因", width: 160 },
          {
            fixed: "right",
            title: "操作",
            width: 100,
            align: "center",
            templet: d => {
              return `<button
          class="layui-btn layui-btn-sm"
          lay-event="add"
        >
          查看
        </button>`;
            }
          }
        ]
      ]
    };
  },
  components: {
    ApplyLeave,
    // ruleTable,
    // paging,
    printTable
  },
  mounted() {
    // this.getleaveList();
  },
  methods: {
    // getlimit(e) {
    //   this.currentlimit = e;
    //   this.getleaveList();
    // },
    // getpage(e) {
    //   this.currentpage = e;
    //   this.getleaveList();
    // },
    //获取请假列表
    // getleaveList() {
    //   apiLeaveList({
    //     pageSize: this.currentlimit,
    //     limit: this.currentpage,
    //     token: sessionStorage.getItem("token")
    //   }).then(res => {
    //     this.total = res.totalCount;
    //     this.DataList = res.data.map(item => {
    //       switch (item.status) {
    //         case 0:
    //           item.status2 = "审批中";
    //           break;
    //         case 1:
    //           item.status2 = "不通过";
    //           break;
    //         // case 2:
    //         // item.status2 = "初始录入";
    //         // break;
    //         case 3:
    //           item.status2 = "审批通过";
    //           break;
    //       }
    //       item.leave_category = this.leaveType[item.leave_category];
    //       item.start_time = changetime(item.start_time);
    //       item.end_time = changetime(item.end_time);
    //       return item;
    //     });
    //     console.log(res);
    //   });
    // },
    getclose() {
      this.isApply = false;
      this.isreload = false;
      this.$nextTick(() => {
        this.isreload = true;
      });
      // this.getleaveList();
    },
    opanLeaveList(row) {
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
        applicant: sessionStorage.getItem("username"),
        position: sessionStorage.getItem("role_name"),
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
