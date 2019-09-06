<template>
  <div>
    <el-form ref="form" label-width="90px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="headform.username" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职位">
            <el-input v-model="headform.role_name" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="试用期">
            <el-input v-model="headform.incorporation_date"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="至">
            <el-input v-model="headform.close_time"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门">
            <el-input v-model="headform.department"></el-input
          ></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="试用期待遇">
            <el-input v-model="headform.on_trial" readonly></el-input
          ></el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="自我评价">
            <el-input
              type="textarea"
              :row="3"
              v-model="headform.bc_personal"
            ></el-input
          ></el-form-item>
        </el-col>
        <el-col :span="12" v-if="userList != ''">
          <el-form-item label="审核人">
            <el-select v-model="userid" style="width:100%;">
              <el-option
                v-for="(item, index) in userList"
                :key="index"
                :value="item.userid"
                :label="item.username"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label=" " v-if="openType == 'new'">
            <el-button type="primary" @click="submit">提交</el-button>
          </el-form-item>
          <div v-else-if="openType == 'headle'">
            <el-form-item label="意见">
              <el-input type="textarea" v-model="reasons" :rows="3"></el-input>
            </el-form-item>
            <el-form-item>
              <template v-for="(item, index) in buttonList">
                <el-button
                  v-if="item == 'submit'"
                  :key="index"
                  type="success"
                  size="mini"
                  @click="headle(true)"
                  >提交</el-button
                >
                <el-button
                  v-if="item == 'Resubmit'"
                  :key="index"
                  type="success"
                  size="mini"
                  @click="headle(true)"
                  >重新提交</el-button
                >
                <el-button
                  v-else-if="item == 'reject'"
                  :key="index"
                  type="warning"
                  size="mini"
                  @click="headle(false)"
                  >驳回</el-button
                >

                <el-button
                  v-else-if="item == 'disagree'"
                  :key="index"
                  type="danger"
                  size="mini"
                  @click="headle('finish')"
                  >不同意</el-button
                >
              </template>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="left">流程线</el-divider>
    <el-steps :active="current" align-center finish-status="success">
      <el-step
        v-for="(item, index) in processLine"
        :title="item.name"
        :key="index"
      ></el-step>
    </el-steps>
    <el-divider content-position="left">审核记录</el-divider>
    <el-table :data="Approvaltable" border>
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
  </div>
</template>

<script>
import {
  apigetProcessList,
  apiBecome_for,
  apibecome_pass
} from "@/request/api.js";
import { changetime } from "@/components/global-fn/global-fn";
export default {
  name: "ApplyCorrented",
  data() {
    return {
      headform: {},
      applyType: ["费用审批", "借支申请", "报销申请"],
      ApprovalHeaderList: [
        ["序号", "index", 60],
        ["流程节点", "name_", 100],
        ["审核人", "username", 80],
        ["审核时间", "END_TIME_", 160],
        ["审核意见", "MESSAGE_"]
      ],
      processLine: [],
      current: 1,
      userid: 0, //下一审核人id,
      buttonList: [],
      userList: [],
      Approvaltable: [],
      reasons: ""
    };
  },
  props: {
    openType: String,
    active: Object
  },
  mounted() {
    this.getprossList();
    this.getCorrentDetail();
  },
  methods: {
    //
    getCorrentDetail() {
      let id = this.active.BUSINESS_KEY_
        ? this.active.BUSINESS_KEY_.split(".")[1]
        : this.active.businessId;
      let data = {
        processInstanceId: this.active.PROC_INST_ID_
          ? this.active.PROC_INST_ID_
          : this.active.taskid, //(必填)：流程实例id;
        taskid: this.active.ID_, //(必填)：任务id;
        bcId: id //(必填)：转正申请id;
      };
      console.log(data);
      apiBecome_for(data).then(res => {
        console.log(res);
        this.headform = res.mpaList;
      });
    },
    //获取审核流程信息
    getprossList() {
      let data = {};
      if (this.active) {
        data = {
          taskid: this.active.ID_, //(必填)流程任务id
          processInstanceId: this.active.PROC_INST_ID_
            ? this.active.PROC_INST_ID_
            : this.active.taskid, //(必填)流程实例id
          key: "Become_for", //(必填)流程定义key
          position: this.active.role_name
            ? this.active.role_name
            : localStorage.getItem("role_name"), //(必填)申请人角色
          type: "" //(必填)新增new/运行中
        };
      } else {
        data = {
          taskid: "", //(必填)流程任务id
          processInstanceId: "", //(必填)流程实例id
          key: "Become_for", //(必填)流程定义key
          position: localStorage.getItem("role_name"), //(必填)申请人角色
          type: "new" //(必填)新增new/运行中
        };
      }
      console.log(data);
      apigetProcessList(data).then(res => {
        console.log(res);
        this.Approvaltable = res.historyList
          ? res.historyList.map(item => {
              item.END_TIME_ = item.END_TIME_ ? changetime(item.END_TIME_) : "";
              return item;
            })
          : [];
        if (this.Approvaltable != "") {
          let currentTask = this.Approvaltable[this.Approvaltable.length - 1];
          this.processLine = res.activityList.map((item, index) => {
            if (item.name == currentTask.name_) {
              this.current = currentTask.END_TIME_ == "" ? index : index + 1;
            }
            return item;
          });
        } else {
          this.processLine = res.activityList;
        }
        this.buttonList = res.startForm.split(",");
        this.userid = res.userlist.userList
          ? res.userlist.userList[0].userid
          : "";
        this.userList = res.userlist.userList ? res.userlist.userList : [];
      });
    },
    submit() {
      this.$confirm(`确定提交吗？`)
        .then(() => {})
        .catch(() => {});
    },
    headle(type) {
      if (this.reasons == "") {
        this.$message.error("请填写审核意见");
        return;
      }
      if (this.userid === 0) {
        this.$message.error("审核人为空不能提交！");
        return;
      }
      let data = {
        taskid: this.active.ID_, //(必填)流程实例id
        userid: this.userid, //(必填)下一审核人id
        reasons: this.reasons, //(必填)审批意见
        sign: type, //(必填)是否批准(true/false)
        role_name: this.headform.role_name,
        personal: this.headform.bc_personal,
        bc_id: this.headform.bc_id
      };
      console.log(data);
      this.$confirm(
        `确定${type === true ? "办理" : type === false ? "驳回" : "不同意"}吗？`
      )
        .then(() => {
          apibecome_pass(data).then(res => {
            console.log(res);
            this.$message.success(res.msg);
            this.$emit("close");
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped></style>
