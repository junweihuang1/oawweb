<template>
  <div>
    <el-divider content-position="left">基本信息</el-divider>
    <el-form size="mini" label-width="100px">
      <el-row style="width:70%">
        <el-col :span="8">
          <el-form-item label="申请日期">
            <el-date-picker
              type="date"
              v-model="headForm.hr_resign_applyDate"
              style="width:100%;"
              value-format="yyyy-MM-dd"
              readonly
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预定离职日期">
            <el-date-picker
              type="date"
              style="width:100%;"
              v-model="headForm.hr_resign_schLeave"
              value-format="yyyy-MM-dd"
              readonly
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际离职日期">
            <el-date-picker
              type="date"
              style="width:100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="离职类别">
            <el-select
              v-model="headForm.hr_resign_category"
              style="width:100%;"
              disabled
            >
              <el-option :value="1" label="离职"></el-option>
              <el-option :value="2" label="辞退"></el-option>
              <el-option :value="3" label="合同终止"></el-option>
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="离职人">
            <el-input
              v-model="headForm.username"
              readonly
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="24">
          <el-form-item label="离职原因">
            <el-input
              type="textarea"
              v-model="headForm.hr_resign_reason"
              :rows="3"
              style="width:100%;"
            ></el-input> </el-form-item></el-col
      ></el-row>
    </el-form>
    <el-tabs type="border-card" style="height: 700px;border:1px solid #ccc;">
      <el-tab-pane label="审核意见">
        <el-table :data="examineList" border>
          <el-table-column
            v-for="(item, index) in examineHeader"
            :prop="item[1]"
            :label="item[0]"
            :key="index"
            align="center"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="交接记录">
        <el-divider content-position="left">部门手续</el-divider>
        <el-form inline size="mini" label-width="100px">
          <el-form-item label="工作交接">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="资料交接">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="文具交接">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="其它事项">
            <el-input></el-input>
          </el-form-item>
          <el-divider content-position="left">资源中心手续</el-divider>
          <el-form-item label="意见">
            <el-input></el-input>
          </el-form-item>
          <el-divider content-position="left">财务部手续</el-divider>
          <el-form-item label="工资计发">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="其它事项">
            <el-input></el-input>
          </el-form-item>
          <el-divider content-position="left">董事长意见</el-divider>
          <el-form-item label="意见">
            <el-input></el-input>
          </el-form-item>
          <el-divider content-position="left">申请人确认</el-divider>
          <el-form-item label="确认时间">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="申请人签字">
            <el-button
              type="primary"
              size="mini"
              class="el-icon-edit"
              @click="openSign"
              >签字板</el-button
            >
          </el-form-item>
          <el-divider content-position="left">技术部手续</el-divider>
          <el-form-item label="系统账号管理">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-divider content-position="left">
      流程审批
    </el-divider>
    <el-form size="mini" label-width="100px">
      <el-row style="width:70%">
        <el-col :span="24">
          <el-form-item label="意见">
            <el-input
              type="textarea"
              :row="3"
              v-model="headForm.reasons"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="userList != ''">
          <el-form-item label="审核人">
            <el-select v-model="userid">
              <el-option
                v-for="(item, index) in userList"
                :key="index"
                :value="item.userid"
                :label="item.username"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
    <el-dialog
      :visible.sync="isopen"
      title="签字版"
      :append-to-body="true"
      width="50%"
      top="8vh"
    >
      <sign v-if="isopen" @close="close"></sign>
    </el-dialog>
  </div>
</template>

<script>
import sign from "@/components/Ca-sign/sign";
import { apiresignView, apigetProcessList, apiresignPass } from "@/request/api";
import { changetime } from "@/components/global-fn/global-fn";
export default {
  name: "ApplyQuit",
  data() {
    return {
      headForm: {},
      examineList: [],
      examineHeader: [
        ["审核人", "username"],
        ["步骤名称", "name_"],
        ["审核意见", ""],
        ["审核时间", "START_TIME_"],
        ["中心", "center_name"],
        ["部门", ""]
      ],
      processLine: [],
      current: 1,
      userid: 0, //下一审核人id,
      buttonList: [],
      userList: [],
      Approvaltable: [],
      isopen: false
    };
  },
  components: {
    sign
  },
  props: {
    active: Object,
    openType: String
  },
  mounted() {
    this.getQuitdetail();
    this.getprossList();
  },
  methods: {
    //办理离职
    close(url) {
      this.isopen = false;
      this.form.hr_resign_autoPath = url;
    },
    openSign() {
      this.isopen = true;
    },
    headle(type) {
      if (!this.headForm.reasons) {
        this.$message.error("请填写意见");
        return;
      }
      if (this.userid === 0) {
        this.$message.error("审核人为空不能提交！");
        return;
      }
      this.$confirm(
        `确定${type === true ? "办理" : type === false ? "驳回" : "不同意"}吗？`
      )
        .then(() => {
          this.headForm.taskid = this.active.ID_;
          this.headForm.role_name = this.active.role_name;
          this.headForm.userid = this.userid;
          this.headForm.sign = type;
          console.log(this.headForm);
          apiresignPass(this.headForm).then(res => {
            console.log(res);
            this.$message.success(res.msg);
            this.$emit("close");
          });
        })
        .catch(() => {});
    },
    //获取流程线和下一审核人
    getprossList() {
      let data = {};
      if (this.active) {
        data = {
          taskid: this.active.ID_, //(必填)流程任务id
          processInstanceId: this.active.PROC_INST_ID_
            ? this.active.PROC_INST_ID_
            : this.active.taskid, //(必填)流程实例id
          key: "resignView", //(必填)流程定义key
          position: this.active.role_name, //(必填)申请人角色
          type: "" //(必填)新增new/运行中
        };
      } else {
        data = {
          taskid: "", //(必填)流程任务id
          processInstanceId: "", //(必填)流程实例id
          key: "resignView", //(必填)流程定义key
          position: this.active.role_name, //(必填)申请人角色
          type: "new" //(必填)新增new/运行中
        };
      }
      console.log(data);
      apigetProcessList(data).then(res => {
        console.log(res);
        //获取审核记录

        this.examineList = res.historyList
          ? res.historyList.map(item => {
              item.START_TIME_ = item.START_TIME_
                ? changetime(item.START_TIME_)
                : "";
              return item;
            })
          : [];
        //获取流程线
        if (this.examineList != "") {
          let currentTask = this.examineList[this.examineList.length - 1];
          let lastTask = {};
          //若审核记录不止一条，则再获取上一记录
          if (this.examineList.length > 1) {
            lastTask = this.examineList[this.examineList.length - 2];
          }
          this.processLine = res.activityList.map((item, index) => {
            if (item.name == currentTask.name_) {
              //没有上一记录，或者上一审核步骤等于上一审核记录步骤的时候，获取当前流程点
              if (
                !lastTask ||
                (lastTask &&
                  lastTask.name_ == res.activityList[index - 1].name_)
              ) {
                this.current = currentTask.END_TIME_ == "" ? index : index + 1;
              }
            }
            return item;
          });
        } else {
          this.processLine = res.activityList;
        }
        this.buttonList = res.startForm.split(",");
        this.userid =
          res.userlist.userList != "" ? res.userlist.userList[0].userid : "";
        this.userList =
          res.userlist.userList != "" ? res.userlist.userList : [];
      });
    },
    getQuitdetail() {
      let id = this.active.BUSINESS_KEY_
        ? this.active.BUSINESS_KEY_.split(".")[1]
        : this.active.businessId;
      let data = {
        hr_resign_id: id,
        taskid: this.active.ID_,
        processInstanceId: this.active.PROC_INST_ID_
          ? this.active.PROC_INST_ID_
          : this.active.taskid
      };
      console.log(data);
      apiresignView(data).then(res => {
        this.headForm = res.resignDeatail;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
