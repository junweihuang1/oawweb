<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-row
        ><el-col :span="12"
          ><el-form-item label="申请人">
            <el-input v-model="form.applicant" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职位">
            <el-input v-model="form.position" readonly />
          </el-form-item>
        </el-col>
        <div v-if="openType !== 'add'">
          <el-col :span="12">
            <el-form-item label="开始时间">
              <el-input v-model="form.start_time" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间">
              <el-input v-model="form.end_time" readonly></el-input>
            </el-form-item>
          </el-col>
        </div>
        <div v-else>
          <el-col :span="12">
            <el-form-item label="开始时间">
              <date-time
                v-if="isreload"
                :startstauts="true"
                @settime="getStartTime"
              >
              </date-time>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间">
              <date-time v-if="isreload" @settime="getEndTime"></date-time>
            </el-form-item>
          </el-col>
        </div>
        <el-col :span="12">
          <el-form-item label="请假类型">
            <el-select
              v-model="form.leave_category"
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="共计天数">
            <el-input
              :value="form.day_count != '' ? form.day_count : day_count"
              readonly
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="请假事由">
            <el-input
              v-model="form.reason"
              type="textarea"
              rows="3"
              minlength="300px"
            /> </el-form-item
        ></el-col>
        <el-col :span="24" v-if="openType == 'headle'">
          <el-form-item label="意见">
            <el-input type="textarea" :row="3" v-model="reasons"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="userTaskName != '结束' && openType != 'check'">
          <el-form-item label="审核人">
            <el-select
              v-model="userid"
              style="width:100%;"
              placeholder="没绑定审核人"
            >
              <el-option
                v-for="(item, index) in userList"
                :key="index"
                :value="item.userid"
                :label="item.username"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="openType == 'add'">
        <el-row> </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">申请</el-button>
          <el-button type="danger" @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </div>
      <div v-else-if="openType == 'headle'">
        <el-form-item>
          <template v-for="(item, index) in buttonList">
            <el-button
              v-if="item == 'submit'"
              :key="index"
              type="success"
              size="mini"
              @click="headleprocess(true)"
              >提交</el-button
            >
            <el-button
              v-if="item == 'Resubmit'"
              :key="index"
              type="success"
              size="mini"
              @click="headleprocess(true)"
              >重新提交</el-button
            >
            <el-button
              v-else-if="item == 'reject'"
              :key="index"
              type="warning"
              size="mini"
              @click="headleprocess(false)"
              >驳回</el-button
            >
            <el-button
              v-else-if="item == 'disagree'"
              :key="index"
              type="danger"
              size="mini"
              @click="headleprocess(false)"
              >不同意</el-button
            >
          </template>
        </el-form-item>
      </div>
    </el-form>
    <el-divider content-position="left">流程线</el-divider>
    <el-steps
      finish-status="success"
      :space="250"
      :active="current"
      style="margin-left:50px;"
      align-center
    >
      <el-step
        :title="item.name"
        v-for="(item, index) in activityList"
        :key="index"
        :description="item.username"
      ></el-step>
    </el-steps>
    <template v-if="openType != 'add'">
      <el-divider content-position="left">审批流程</el-divider>
      <el-table :data="DataList" border>
        <el-table-column
          v-for="(item, index) in ApprovalHeaderList"
          :key="index"
          :label="item[0]"
          :prop="item[1]"
          :type="index == 0 ? 'index' : ''"
          :width="item[2]"
          align="center"
        ></el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import DateTime from "@/components/Ca-date-time/Ca-date-time";
import {
  apisaveLeave,
  apipassLeave,
  apigetProcessList
} from "@/request/api.js";
export default {
  name: "leavetable",
  data() {
    return {
      userTaskName: "",
      ApprovalHeaderList: [
        ["序号", "index", 60],
        ["流程节点", "name_", 100],
        ["审核人", "username", 80],
        ["审核时间", "END_TIME_", 160],
        ["审核意见", "MESSAGE_"]
      ],
      reasons: "",
      options: [
        {
          value: 0,
          label: "事假"
        },
        {
          value: 1,
          label: "病假"
        },
        {
          value: 2,
          label: "婚假"
        },
        {
          value: 3,
          label: "产假"
        },
        {
          value: 4,
          label: "丧假"
        },
        {
          value: 5,
          label: "年假"
        },
        {
          value: 6,
          label: "其它"
        }
      ],
      isreload: true,
      Approvaltable: [],
      buttonList: [],
      userid: 0,
      userList: [],
      activityList: [],
      current: 1
    };
  },
  computed: {
    day_count() {
      let count = 0;
      let start = new Date(this.form.start_time);
      let end = new Date(this.form.end_time);
      let start_hour = start.getHours();
      let leave_time = (end - start) / 3600000;
      if (start_hour >= 12) {
        if (leave_time <= 12) {
          count = 0.5;
        } else if (leave_time > 12 && leave_time <= 24) {
          count = 1;
        } else if (leave_time > 24) {
          count =
            Math.floor(leave_time / 24) + (leave_time % 24 <= 12 ? 0.5 : 1);
        }
      } else {
        if (leave_time <= 4) {
          count = 0.5;
        } else if (leave_time > 4 && leave_time <= 10) {
          count = 1;
        } else if (leave_time > 10) {
          count =
            Math.floor(leave_time / 24) +
            ((leave_time % 24) + start_hour <= 14 ? 0.5 : 1);
        }
      }
      return count;
    }
  },
  components: {
    DateTime
  },
  props: {
    DataList: Array,
    form: {
      type: Object,
      default: () => {}
    },
    openType: String,
    active: Object
  },
  mounted() {
    this.getprossList();
  },
  methods: {
    //获取下一审核人
    getprossList() {
      let data = {};
      if (this.active) {
        data = {
          taskid: this.active.ID_, //(必填)流程任务id
          processInstanceId: this.active.PROC_INST_ID_
            ? this.active.PROC_INST_ID_
            : this.active.taskid, //(必填)流程实例id
          key: "Leave_flow", //(必填)流程定义key
          position: this.active.role_name, //(必填)申请人角色
          type: "" //(必填)新增new/运行中
        };
      } else {
        data = {
          taskid: "", //(必填)流程任务id
          processInstanceId: "", //(必填)流程实例id
          key: "Leave_flow", //(必填)流程定义key
          position: this.form.position, //(必填)申请人角色
          type: "new" //(必填)新增new/运行中
        };
      }
      apigetProcessList(data).then(res => {
        console.log(res);
        //当前流程节点
        if (this.DataList == "") {
          this.activityList = res.activityList;
        } else {
          let currentTask = this.DataList[this.DataList.length - 1];
          //流程线
          this.activityList = res.activityList.map((item, index) => {
            if (item.name == currentTask.name_) {
              this.current = currentTask.END_TIME_ == "" ? index : index + 1;
            }
            return item;
          });
        }
        this.userTaskName = res.userlist.userTaskName;
        this.buttonList = res.startForm.split(",");
        this.userid =
          this.userTaskName == "结束"
            ? 0
            : res.userlist.userList && res.userlist.userList != ""
            ? res.userlist.userList[0].userid
            : "";
        this.userList = res.userlist.userList
          ? res.userlist.userList != ""
            ? res.userlist.userList
            : []
          : [];
      });
    },
    //办理流程
    headleprocess(type) {
      if (this.reasons == "") {
        this.$message.error("请填写审核意见");
        return;
      }
      if (this.userid === "" && type) {
        this.$message.error("审核人为空不能提交！");
        return;
      }
      this.$confirm(
        `确定${type === true ? "办理" : type === false ? "驳回" : "不同意"}吗？`
      )
        .then(() => {
          let data = {
            taskid: this.active.ID_,
            userid: this.userid,
            reasons: this.reasons,
            sign: type
          };
          apipassLeave(data).then(res => {
            console.log(res);
            this.$message.success(res.msg);
            this.$emit("close");
          });
        })
        .catch(() => {});
    },
    //重置数据
    reload() {
      this.isreload = false;
      this.$nextTick(() => {
        this.isreload = true;
      });
      this.form = {
        applicant: sessionStorage.getItem("username"),
        position: sessionStorage.getItem("role_name"),
        start_time: "",
        end_time: "",
        leave_category: "",
        day_count: "",
        reason: "",
        userid: ""
      };
    },
    getApprover(e) {
      this.form.userid = e;
    },
    resetForm(formName) {
      this.reload();
      this.$refs[formName].resetFields();
    },
    //提交
    submitForm() {
      if (this.form.start_time >= this.form.end_time) {
        this.$message.error("开始时间须早于结束时间");
        return;
      }
      if (this.userid === "") {
        this.$message.warning("审核人为空不能提交");
        return;
      }
      if (!this.form.reason || this.form.reason == "") {
        this.$message.warning("请补充请假事由");
        return;
      }
      this.form.userid = this.userid;
      this.form.day_count = this.day_count;
      this.$confirm(`确定请假吗？`)
        .then(() => {
          apisaveLeave(this.form).then(res => {
            console.log(res);
            this.$message.success(res.msg);
            this.$emit("close");
          });
        })
        .catch(() => {});
    },
    //从组件获取结束时间
    getEndTime(time) {
      this.form.end_time = time;
    },
    //从组件获取开始时间
    getStartTime(time) {
      this.form.start_time = time;
    }
  }
};
</script>

<style lang="scss">
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
.el-table__body tr.current-row > td {
  background-color: rgb(252, 233, 199);
}

.el-table--striped .el-table__body tr.hover-row.el-table__row--striped > td,
.el-table__body tr.hover-row > td {
  background-color: #d9ecff !important;
}
</style>
