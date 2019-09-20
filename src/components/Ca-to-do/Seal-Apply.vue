<template>
  <div>
    <el-form ref="form" :model="form" label-width="90px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="文件名称">
            <el-input v-model="form.own_seal_fileName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预结算金额">
            <el-input v-model="form.own_seal_settle"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用章公司">
            <select-company
              @setCompanyName="getCompanyName"
              :companyId="form.own_seal_company"
            ></select-company>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主送单位">
            <el-input v-model="form.own_seal_sender"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="用章类别">
            <el-checkbox-group
              v-model="form.own_seal_chapCategory"
              @change="getProcessline"
              :disabled="openType == 'add' ? false : true"
            >
              <el-checkbox
                v-for="Seal in Seals"
                :label="Seal[0]"
                :key="Seal[0]"
                >{{ Seal[1] }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="盖章用途">
            <el-input
              v-model="form.own_seal_remark"
              type="textarea"
              :rows="3"
            ></el-input>
          </el-form-item>
        </el-col>
        <template v-if="openType != 'check'">
          <template v-if="userTaskName != '结束'">
            <el-col :span="12">
              <el-form-item label="下一节点">
                <el-input readonly v-model="userTaskName"></el-input>
              </el-form-item>
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
          </template>
          <el-col :span="24" v-if="openType == 'headle'">
            <el-form-item label="意见">
              <el-input type="textarea" :row="3" v-model="reasons"></el-input>
            </el-form-item>
          </el-col>
        </template>
        <template v-if="openType == 'check' || openType == 'headle'">
          <el-col :span="24">
            <el-form-item>
              <el-button
                type="primary"
                size="mini"
                @click="downfile"
                v-if="form.own_seal_filePath"
                >下载附件</el-button
              >
              <template v-if="openType == 'headle'">
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
              </template>
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="24" v-else>
          <el-form-item>
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
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload"
                >提交</el-button
              >
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
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
      <el-divider content-position="left">审核记录</el-divider>
      <Ca-view-process :Approvaltable="Approvaltable"></Ca-view-process>
    </template>
  </div>
</template>

<script>
//"http://192.168.3.27:8081/casd2/admin/uploadSealFile"
import http from "@/request/http.js";
import CaViewProcess from "@/components/Ca-view-process/Ca-view-process";
import selectCompany from "@/components/Ca-select/select-company";
import { apisaveSeal, apiSealProcessList, apipassSeal } from "@/request/api.js";
export default {
  name: "SealApply",
  data() {
    return {
      upload_url: http.base_url + "uploadSealFile",
      token: sessionStorage.getItem("token"),
      Seals: [
        ["1", "公章"],
        ["2", "业务章"],
        ["3", "出图章"],
        ["4", "竣工章"],
        ["5", "项目章"]
      ],
      upload_add: "",
      fileList: [],
      buttonList: [],
      userid: 0,
      username: "",
      userList: [],
      activityList: [],
      userLists: [],
      activityLists: [],
      current: 1, //当前流程节点
      reasons: "",
      userTaskName: ""
    };
  },
  props: {
    form: Object,
    openType: String,
    Approvaltable: Array,
    active: Object
  },
  components: {
    selectCompany,
    CaViewProcess
  },
  mounted() {
    this.getprossList();
  },
  methods: {
    headleprocess(type) {
      if (this.reasons == "") {
        this.$message.error("请填写审核意见");
        return;
      }
      if (this.userid == "" && type) {
        this.$message.error("审核人为空不能提交！");
        return;
      }
      this.$confirm(
        `确定${type === true ? "办理" : type === false ? "驳回" : "不同意"}吗？`
      )
        .then(() => {
          let data = {
            taskid: this.active.ID_, //(必填)流程实例id
            userid: this.userid, //(必填)下一审核人id
            reasons: this.reasons, //(必填)审批意见
            type: type, //(必填)是否批准(true/false)
            own_seal_chapCategory: this.form.own_seal_chapCategory.join(",") //(必填)盖章类型
          };
          console.log(data);
          apipassSeal(data).then(res => {
            console.log(res);
            this.$message.success(res.msg);
            this.$emit("close");
          });
        })
        .catch(() => {});
    },
    //根据盖章类别显示流程线
    // this.userList =
    //       res.userlist.userList != "" && res.userlist.userList
    //         ? res.userlist.userList
    //         : [];
    getProcessline(row) {
      if (row[0] == "1") {
        this.changeProcessline("process0");
        if (this.userLists.chiefLeader) {
          this.userTaskName = this.userLists.chiefLeader
            ? this.userLists.chiefLeader.userTaskName
            : this.userLists.userTaskName;
          this.userid = this.userLists.chiefLeader.userList
            ? this.userLists.chiefLeader.userList[0].userid
            : "";
          this.userList =
            this.userLists.chiefLeader.userList &&
            this.userLists.chiefLeader.userList != ""
              ? this.userLists.chiefLeader.userList
              : [];
        } else {
          this.userTaskName = this.userLists
            ? this.userLists.userTaskName
            : this.userLists.userTaskName;
          this.userid = this.userLists.userList
            ? this.userLists.userList[0].userid
            : "";
          this.userList =
            this.userLists.userList && this.userLists.userList != ""
              ? this.userLists.userList
              : [];
        }
      } else if (row[0] == "5") {
        this.changeProcessline("process2");
        if (this.userLists.leader) {
          this.userTaskName = this.userLists.leader.userTaskName;
          this.userid = this.userLists.leader.userList
            ? this.userLists.leader.userList[0].userid
            : "";
          this.userList =
            this.userLists.leader.userList &&
            this.userLists.leader.userList != ""
              ? this.userLists.leader.userList
              : [];
        } else {
          this.userTaskName = this.userLists.userTaskName;
          this.userid = this.userLists.userList
            ? this.userLists.userList[0].userid
            : "";
          this.userList =
            this.userLists.userList && this.userLists.userList != ""
              ? this.userLists.userList
              : [];
        }
      } else if (row[0] == "2" || row[0] == "3" || row[0] == "4") {
        if (this.userLists.chiefLeader) {
          this.userTaskName = this.userLists.chiefLeader
            ? this.userLists.chiefLeader.userTaskName
            : this.userLists.userTaskName;
          this.userid = this.userLists.chiefLeader.userList
            ? this.userLists.chiefLeader.userList[0].userid
            : "";
          this.userList =
            this.userLists.chiefLeader.userList &&
            this.userLists.chiefLeader.userList != ""
              ? this.userLists.chiefLeader.userList
              : [];
        } else {
          this.userTaskName = this.userLists
            ? this.userLists.userTaskName
            : this.userLists.userTaskName;
          this.userid = this.userLists.userList
            ? this.userLists.userList[0].userid
            : "";
          this.userList =
            this.userLists.userList && this.userLists.userList != ""
              ? this.userLists.userList
              : [];
        }
        this.changeProcessline("process1");
      }
      if (
        this.form.own_seal_chapCategory.length > 1 &&
        (this.form.own_seal_chapCategory.includes("1") ||
          this.form.own_seal_chapCategory.includes("5"))
      ) {
        this.$message.error("选择章类型不符，公章、项目章只能单独申请");
      }
    },
    getprossList() {
      let data = {};

      if (this.active) {
        data = {
          taskid: this.active.ID_, //(必填)流程任务id
          processInstanceId: this.active.PROC_INST_ID_
            ? this.active.PROC_INST_ID_
            : this.active.taskid, //(必填)流程实例id
          type: "" //(必填)新增new/运行中
        };
      } else {
        data = {
          taskid: "", //(必填)流程任务id
          processInstanceId: "", //(必填)流程实例id
          type: "new" //(必填)新增new/运行中
        };
      }
      apiSealProcessList(data).then(res => {
        console.log(res);
        this.buttonList = res.startForm.split(",");
        this.userLists = res.userlist;
        this.activityLists = res.activityList;
        this.getProcessline(this.form.own_seal_chapCategory);
      });
    },
    //改变章类型后获取流程线类型
    changeProcessline(i) {
      if (this.Approvaltable != "") {
        let currentTask = this.Approvaltable[this.Approvaltable.length - 1];
        this.activityList = this.activityLists[i].map((item, index) => {
          if (item.name == currentTask.name_) {
            this.current = currentTask.END_TIME_ == "" ? index : index + 1;
          }
          return item;
        });
      } else {
        this.activityList = this.activityLists[i];
      }
    },
    //下载文件
    downfile() {
      // console.log(
      //   "http://file.casdapi.com/sealFile/" + this.form.own_seal_filePath
      // );
      window.open(
        "http://file.casdapi.com/sealFile/" + this.form.own_seal_filePath
      );
    },
    getCompanyName(val) {
      this.form.own_seal_company = val;
    },
    handleChange(file, fileList) {
      this.fileList = fileList.map(item => {
        return item.name;
      });
    },
    handleSuccess(res, file, fileList) {
      console.log(res);
      this.form.own_seal_filePath = res.path;
      this.submit();
    },
    headleError(err, file, fileList) {
      console.log(err);
    },
    submitUpload() {
      if (
        this.form.own_seal_chapCategory.length > 1 &&
        (this.form.own_seal_chapCategory.includes("1") ||
          this.form.own_seal_chapCategory.includes("5"))
      ) {
        this.$message.error("选择章类型不符，公章、项目章只能单独申请");
        return;
      }
      this.$confirm(`确定提交吗？`)
        .then(() => {
          this.$refs.upload.submit();
          //当没有附件时单独提交
          if (this.fileList == "") {
            this.submit();
          }
        })
        .catch(() => {});
    },
    submit() {
      this.form.own_seal_chapCategory = this.form.own_seal_chapCategory.join(
        ","
      );
      this.form.userid = this.userid;
      apisaveSeal(this.form).then(res => {
        this.$message.success(res.msg);
        this.$emit("close");
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
