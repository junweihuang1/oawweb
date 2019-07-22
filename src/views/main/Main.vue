<template>
  <div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('process')">
          <div class="card-panel-icon-wrapper icon-people">
            <i class="icon el-icon-tickets" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              待办任务
            </div>
            <span class="panel-num">{{ processList.length }}</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('message')">
          <div class="card-panel-icon-wrapper icon-message">
            <i class="icon el-icon-bell" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              消息通知
            </div>
            <span class="panel-num">{{ messageList.length }}</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-money">
            <i class="icon el-icon-upload" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">补卡审批</div>
            <span class="panel-num">{{ noApprovalList.length }}</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('attendance')">
          <div class="card-panel-icon-wrapper icon-shopping">
            <i class="icon el-icon-date" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              本月出勤
            </div>
            <span class="panel-num">0</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <home-main></home-main>
    <el-dialog title="待办任务" :visible.sync="processTable">
      <to-do-table :processList="processList"></to-do-table>
    </el-dialog>
    <el-dialog title="新消息" :visible.sync="messageTable"> </el-dialog>
    <el-dialog title="补卡审批" :visible.sync="newVisitisTable">
      <card-Approval-table :processList="noApprovalList"></card-Approval-table>
    </el-dialog>
    <el-dialog title="我的出勤" :visible.sync="attendanceTable"> </el-dialog>
  </div>
</template>

<script>
import homeMain from "./components/home-main.vue";
import CardApprovalTable from "./components/card-Approval-table.vue";
import ToDoTable from "./components/to-do-table.vue";
import { apiFindTaskList, apiNotAuditedCard } from "@/request/api";
export default {
  name: "Main",
  components: { ToDoTable, homeMain, CardApprovalTable },
  data() {
    return {
      processList: [],
      processTable: false,
      messageTable: false,
      newVisitisTable: false,
      attendanceTable: false,
      messageList: [],
      noApprovalList: []
    };
  },
  mounted() {
    this.handleApiFindTaskList();
    this.handleApiNotAuditedCard();
  },
  methods: {
    handleSetLineChartData(e) {
      switch (e) {
        case "process":
          this.processTable = true;
          break;
        case "message":
          this.messageTable = true;
          break;
        case "attendance":
          this.attendanceTable = true;
          break;
        case "newVisitis":
          this.newVisitisTable = true;
          break;
        default:
          this.$message({
            message: "此功能暂未开放！",
            type: "warning"
          });
      }
    },
    handleApiFindTaskList() {
      apiFindTaskList({
        userId: ""
      })
        .then(res => {
          this.processList = res;
        })
        .catch(err => {
          this.$message({
            message: err.msg,
            type: "warning"
          });
        });
    },
    handleApiNotAuditedCard() {
      apiNotAuditedCard().then(res => {
        this.noApprovalList = res.data.map(item => {
          item.hr_attend_status = item.hr_attend_status == 1 ? "未审核" : "";
          item.ID_ = item.hr_attend_apply_id;
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
    cursor: pointer;
  }
  .card-panel {
    height: 108px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: $common-routine-font-color;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(110, 110, 110, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      box-shadow: 3px 3px 30px rgba(39, 39, 39, 0.2);
      transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
      transform: translate(0, -4px);
    }
    .icon-people {
      color: $common-blue-color;
    }
    .icon-message {
      color: $common-success-color;
    }
    .icon-money {
      color: $common-danger-color;
    }
    .icon-shopping {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
.icon {
  font-size: 48px;
}
.panel-num {
  font-size: 20px;
}
.mark1 {
  background: #409eff;
  width: 30px;
  height: 30px;
}
</style>
