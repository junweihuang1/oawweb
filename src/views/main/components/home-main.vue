<template>
  <div>
    <el-row :gutter="40" class="panel-group" :style="{ height: cardHeight }">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div :style="{ height: cardHeight }">
          <!-- class="card-panel" -->
          <div class="commonUse">
            常用功能
          </div>
          <div style="text-align:left;">
            <el-button
              type="primary"
              size="mini"
              plain
              v-for="(item, index) in commonUse"
              :key="index"
              style="margin:5px;"
              @click="openRoute(item)"
            >
              {{ item.title }}</el-button
            >
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col"></el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col"></el-col>
      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="card-panel-col card-panel-col-right"
      >
        <div style="font-size:16px;">
          <div class="panel-group-line panel-group-line-center">
            个人考勤表
            <el-tooltip
              class="item"
              effect="dark"
              content="申请补卡流程"
              placement="top-end"
            >
              <i
                class="el-icon-circle-plus panel-group-line-right "
                @click="ApplyCard"
              ></i>
            </el-tooltip>
          </div>
          <div class="panel-group-line">
            <span>当月出勤天数</span>
            <span class="panel-group-line-right"
              >{{ Attendance.totalDayNum }}天</span
            >
          </div>
          <div class="panel-group-line">
            <span>当月迟到天数</span>
            <span class="panel-group-line-right"
              >{{ Attendance.comeLateDayNum }}天</span
            >
          </div>
          <div class="panel-group-line">
            <span>当月早退天数</span>
            <span class="panel-group-line-right"
              >{{ Attendance.LeaveEarlyDayNum }}天</span
            >
          </div>
          <Calendar
            :sundayStart="true"
            :markDate="markarr"
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
            :textTop="topTitle"
          ></Calendar>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="补卡申请"
      :visible.sync="isApply"
      width="30%"
      v-dialogDrag
    >
      <div class="Apply-line">
        <span>补卡类型：</span>
        <el-radio v-model="ApplyForm.ApplyType" label="上班" border
          >上班</el-radio
        >
        <el-radio v-model="ApplyForm.ApplyType" label="下班" border
          >下班</el-radio
        >
        <el-radio v-model="ApplyForm.ApplyType" label="全天" border
          >全天</el-radio
        >
      </div>
      <div class="Apply-line">
        <span>补卡日期：</span>
        <el-date-picker
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          v-model="ApplyForm.date"
          style="width: 40%;"
        ></el-date-picker>
      </div>
      <div class="Apply-line">
        <span>请输入补卡内容：</span>
        <el-input type="textarea" v-model="ApplyForm.desc" rows="4"></el-input>
      </div>
      <div class="Apply-line">
        <el-button type="primary" plain @click="SubmitApplyCard"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Calendar from "vue-calendar-component";
import {
  apiDatePunchInfo,
  apiPunchInfo,
  apiAttendance,
  apiapplyFillCard
} from "@/request/api";
export default {
  name: "home-main",
  data() {
    return {
      appointArr: [],
      punchYear: new Date().getFullYear(),
      punchMonth: new Date().getMonth() + 1,
      topTitle: ["日", "一", "二", "三", "四", "五", "六"],
      markarr: [],
      isDatePunchInfo: false,
      Attendance: [],
      isApply: false,
      ApplyForm: {
        ApplyType: "上班",
        date: "",
        desc: ""
      },
      cardHeight: 0,
      screenHeight: null,
      instance: "",
      commonUse: this.$store.state.commonUse
    };
  },
  components: {
    Calendar
  },
  watch: {
    commonUse(val) {
      this.commonUse = val;
    },
    screenHeight(val) {
      if (val && document.getElementsByClassName("panel-group").length != 0) {
        this.cardHeight = val - 290 + "px";
      }
    }
  },
  mounted() {
    var _this = this;
    _this.screenHeight = document.documentElement.clientHeight;
    window.onresize = function() {
      // 定义窗口大小变更通知事件
      _this.screenHeight = document.documentElement.clientHeight; //窗口高度
    };
    if (document.getElementsByClassName("panel-group").length != 0) {
      this.cardHeight = document.documentElement.clientHeight - 290 + "px";
    }

    _this.getAttendance();
  },
  created() {
    this.getPunchInfo();
  },
  methods: {
    openRoute(active) {
      if (
        !this.$store.state.openTabs.some(item => item.title == active.title)
      ) {
        this.$store.commit("addTabs", active);
      }
      this.$store.commit("changeActiveIndex", active.id);
      this.$router.push({
        path: active.route
      });
      console.log(active);
    },
    SubmitApplyCard() {
      if (this.ApplyForm.date == "") {
        this.$message.warning("请选择时间");
        return;
      }
      if (this.ApplyForm.desc == "") {
        this.$message.warning("请填写原因");
        return;
      }

      this.$confirm(`确定提交补卡申请吗？`)
        .then(() => {
          apiapplyFillCard({
            hr_attend_apply_data: this.ApplyForm.date,
            hr_attend_apply_reason: this.ApplyForm.desc,
            hr_attend_typeCard: this.ApplyForm.ApplyType
          }).then(res => {
            if (res.msg) {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.ApplyForm = {
                ApplyType: "上班",
                date: "",
                desc: ""
              };
              setTimeout(() => {
                this.isApply = false;
              }, 500);
            }
          });
        })
        .catch(() => {});
    },
    ApplyCard() {
      this.isApply = true;
    },
    getAttendance() {
      apiAttendance({
        hr_attend_startWork: this.punchYear,
        hr_attend_knockOff: this.punchMonth
      }).then(res => {
        this.Attendance = res.data;
      });
    },
    clickDay(data) {
      //选中某天
      apiDatePunchInfo({
        hr_attend_date: data
      }).then(res => {
        if (res.data) {
          if (res.data.hr_attend_knockOff == null) {
            res.data.hr_attend_knockOff = "无打卡记录";
          }
          if (res.data.hr_attend_startWork == null) {
            res.data.hr_attend_startWork = "无打卡记录";
          }
          this.appointArr = {
            date: data,
            knockOff: res.data.hr_attend_knockOff,
            startWork: res.data.hr_attend_startWork
          };

          this.$notify({
            type: "success",
            title: data,
            message:
              "上班：" +
              res.data.hr_attend_startWork +
              " 下班：" +
              res.data.hr_attend_knockOff,
            position: "top-right"
          });
        } else {
          this.$notify({
            type: "success",
            title: data,
            message: "无打卡记录",
            position: "top-right"
          });
        }
      });
    },
    changeDate(data) {
      //左右点击切换月份
      this.punchYear = data.split("/")[0];
      this.punchMonth = data.split("/")[1];
      this.getPunchInfo();
      this.getAttendance();
    },
    clickToday(data) {
      console.log(data); //跳到了本月
    },
    getPunchInfo() {
      this.markarr = [];
      apiPunchInfo({
        hr_attend_startWork: this.punchYear,
        hr_attend_knockOff: this.punchMonth
      }).then(res => {
        console.log(res);
        res.data.forEach(element => {
          this.markarr.push(element.date);
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.commonUse {
  padding: 10px;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
}
.card-box {
  text-align: center;
  width: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 4px 4px 40px rgba(110, 110, 110, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
}
.Apply-line {
  padding: 10px;
}
.panel-group {
  display: flex;
  display: -webkit-flex;
  align-items: flex-end;
  color: $common-routine-font-color;
  &-line {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px dotted $common-one-border-color;
    &-center {
      text-align: center;
    }
    &-right {
      float: right;
    }
  }
  .el-icon-circle-plus {
    font-size: 40px;
    border-radius: 40px;
    color: $common-success-color;
    &:hover {
      box-shadow: 4px 4px 40px rgba(54, 54, 54, 0.2);
    }
  }
}
</style>
