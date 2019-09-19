<template>
  <div>
    <el-form
      size="mini"
      :model="contractapprove"
      label-width="110px"
      label-position="left"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input
              :readonly="openType == 'add' ? false : true"
              clearable
              v-model="contractapprove.manage_contractapprove_name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属公司">
            <el-select v-model="contractapprove.manage_contractapprove_company">
              <el-option
                v-for="(item, index) in companyList"
                :key="index"
                :value="item[0]"
                :label="item[1]"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目地址">
            <el-input
              :readonly="openType == 'add' ? false : true"
              clearable
              v-model="contractapprove.manage_contractapprove_address"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="发包方（甲方）">
            <el-input
              :readonly="openType == 'add' ? false : true"
              clearable
              v-model="contractapprove.manage_contractapprove_firstParty"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同金额">
            <el-input
              :readonly="openType == 'add' ? false : true"
              clearable
              type="number"
              v-model="contractapprove.manage_contractapprove_amount"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="乙方">
            <el-input
              :readonly="openType == 'add' ? false : true"
              clearable
              v-model="contractapprove.manage_contractapprove_secondParty"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="contractapprove.manage_contractapprove_startTime"
              type="date"
              :readonly="openType == 'add' ? false : true"
              value-format="yyyy-MM-dd"
              placeholder="请选择时间"
              style="width:100%;"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结束时间">
            <el-date-picker
              :readonly="openType == 'add' ? false : true"
              v-model="contractapprove.manage_contractapprove_endTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择时间"
              style="width:100%;"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="付款比例">
            <el-input
              :readonly="openType == 'add' ? false : true"
              clearable
              v-model="contractapprove.manage_contractapprove_payment"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item>
          <el-col :span="12">
            <el-radio-group
              v-model="contractapprove.manage_contractapprove_taxIncluded"
              size="mini"
              :disabled="openType == 'add' ? false : true"
            >
              <el-radio :label="1" border>含税</el-radio>
              <el-radio :label="2" border>不含税</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="12">
            <el-radio-group
              v-model="contractapprove.category"
              size="mini"
              @change="getProcessline"
              :disabled="openType == 'add' ? false : true"
            >
              <el-radio :label="1" border>施工合同</el-radio>
              <el-radio :label="2" border>供应商合同</el-radio>
              <el-radio :label="3" border>合作合同</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
      </el-row>
      <el-form-item label="备注">
        <el-input
          :readonly="openType == 'add' ? false : true"
          clearable
          type="textarea"
          :rows="4"
          v-model="contractapprove.manage_contractapprove_remark"
        ></el-input>
      </el-form-item>
      <el-form-item label="意见" v-if="openType === 'headle'">
        <el-input
          clearable
          type="textarea"
          :rows="3"
          v-model="reasons"
        ></el-input>
      </el-form-item>
      <el-row>
        <template v-if="userTaskName != '结束' && openType != 'check'">
          <el-col :span="10">
            <el-form-item label="下一节点">
              <el-input readonly v-model="userTaskName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
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
        </template>
        <el-col :span="12">
          <template v-if="openType == 'add'">
            <el-form-item label=" ">
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="upload_url"
                :limit="1"
                :on-change="handleChange"
                :headers="{ token: token }"
                :on-success="handleSuccess"
                :on-error="headleError"
                :auto-upload="false"
              >
                <el-button slot="trigger" type="primary" size="mini"
                  >选取文件</el-button
                >
                <el-button
                  style="margin-left: 10px;"
                  size="mini"
                  type="success"
                  @click="submitUpload"
                  >提交</el-button
                >
              </el-upload>
            </el-form-item>
          </template>
          <template v-else-if="openType == 'headle'">
            <el-form-item label=" ">
              <el-button
                type="primary"
                size="mini"
                @click="openfile"
                v-if="
                  contractapprove.manage_contractapprove_attachAddress != ''
                "
              >
                下载附件
              </el-button>
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
                  @click="headleprocess('finish')"
                  >不同意</el-button
                >
              </template>
            </el-form-item>
          </template>
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="left">流程线</el-divider>
    <el-steps :active="current" finish-status="success" align-center>
      <el-step
        :title="item.name"
        v-for="(item, index) in activityList"
        :key="index"
      ></el-step>
    </el-steps>
    <template v-if="openType !== 'add'">
      <el-divider content-position="left">审批流程</el-divider>
      <el-table :data="history" border="">
        <el-table-column
          v-for="(item, index) in HeaderList"
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
import http from "@/request/http.js";
import {
  apisave_conApprove,
  apiContractapprovePro,
  apicontractapprovePass
} from "@/request/api.js";
export default {
  name: "dialogWindow",
  data() {
    return {
      upload_url: http.base_url + "uploadContractFile",
      token: localStorage.getItem("token"),
      HeaderList: [
        ["序号", ""],
        ["步骤名称", "name_"],
        ["相关人员", "username"],
        ["开始时间", "START_TIME_"],
        ["结束时间", "END_TIME_"],
        ["审核意见", "MESSAGE_"],
        ["内容", ""]
      ],
      companyList: [
        [1, "建设公司"],
        [2, "科技公司"],
        [3, "加盟合作"],
        [4, "诚安教育"],
        [5, "传诚管理"]
      ],
      buttonList: [],
      userid: 0,
      current: 0,
      userLists: [],
      userList: [],
      activityList: [],
      activityLists: [],
      reasons: "",
      fileList: [],
      userTaskName: ""
    };
  },
  props: {
    contractapprove: Object,
    active: Object,
    history: Array,
    openType: String
  },
  mounted() {
    this.getprossList();
  },
  methods: {
    //打开附件
    openfile() {
      window.open(this.contractapprove.manage_contractapprove_attachAddress);
    },
    //办理
    headleprocess(type) {
      console.log(type);
      if (this.reasons == "") {
        this.$message.error("请填写审核意见");
        return;
      }
      if (this.userid === "") {
        this.$message.error("审核人为空不能提交！");
        return;
      }

      this.contractapprove.taskid = this.active.ID_;
      this.contractapprove.userid = this.userid;
      this.contractapprove.reason = this.reasons;
      this.contractapprove.type = type;
      console.log(this.contractapprove);
      apicontractapprovePass(this.contractapprove).then(res => {
        console.log(res);
        this.$message.success(res.Msg);
        this.$emit("close");
      });
    },
    getProcessline(val) {
      let processName =
        val == 1 ? "process0" : val == 2 ? "process1" : "process2";
      //当审批记录存在时，遍历更改时间格式
      if (this.history != "") {
        let currentTask = this.history[this.history.length - 1];
        this.activityList = this.activityLists[processName].map(
          (item, index) => {
            if (item.name == currentTask.name_) {
              this.current = currentTask.END_TIME_ == "" ? index : index + 1;
            }
            return item;
          }
        );
      } else {
        this.activityList = this.activityLists[processName];
      }
      //判断下一审核节点若是专业公司总经理，用chief_leader的列表
      console.log(this.activityLists[processName]);
      if (
        this.activityLists[processName][this.current + 1] &&
        this.activityLists[processName][this.current + 1].name ==
          "专业公司总经理"
      ) {
        this.userid = this.userLists.chief_leader
          ? this.userLists.chief_leader[0].userid
          : this.userLists.userList[0].userid;
        this.userList = this.userLists.chief_leader
          ? this.userLists.chief_leader
          : this.userLists.userList;
      } else {
        this.userid =
          this.userTaskName == "结束"
            ? 0
            : this.userLists.userList && this.userLists.userList != ""
            ? this.userLists.userList[0].userid
            : "";
        this.userList = this.userLists.userList ? this.userLists.userList : [];
      }
      console.log(this.userid);
    },
    //获取流程线
    getprossList() {
      let data = {};
      if (this.active) {
        data = {
          key: "contractapproveView", //流程定义KEY
          taskid: this.active.ID_, //(必填)流程任务id
          processInstanceId: this.active.PROC_INST_ID_
            ? this.active.PROC_INST_ID_
            : this.active.taskid, //(必填)流程实例id
          type: "" //(必填)新增new/运行中
        };
      } else {
        data = {
          key: "contractapproveView", //流程定义KEY
          taskid: "", //(必填)流程任务id
          processInstanceId: "", //(必填)流程实例id
          type: "new" //(必填)新增new/运行中
        };
      }
      console.log(data);
      apiContractapprovePro(data).then(res => {
        console.log(res);
        this.activityLists = res.activityList;
        this.userLists = res.userlist;
        this.userTaskName = res.userlist.userTaskName;
        this.getProcessline(this.contractapprove.category);
        this.buttonList = res.startForm.split(",");
      });
    },
    //文件上传前的钩子
    handleChange(file, fileList) {
      this.fileList = fileList.map(item => {
        return item.name;
      });
    },
    handleSuccess(res, file, fileList) {
      console.log(res);
      this.contractapprove.manage_contractapprove_attachAddress = res.data;
      this.submit();
    },
    headleError(err, file, fileList) {
      console.log(err);
    },
    submitUpload() {
      this.contractapprove.userid = this.userid;
      console.log(this.contractapprove);
      this.$confirm(`确定提交吗？`)
        .then(() => {
          //当没有附件时单独提交
          console.log(this.fileList);
          if (this.fileList == "") {
            this.submit();
          } else {
            this.$refs.upload.submit();
          }
        })
        .catch(() => {});
    },
    submit() {
      apisave_conApprove(this.contractapprove).then(res => {
        this.$message.success(res.msg);
        this.$emit("closewin");
      });
    },
    //从子组件中获取下一审核人ID
    getSpprover(userid) {
      this.contractapprove.userid = userid;
    }
  }
};
</script>

<style lang="scss" scoped></style>
