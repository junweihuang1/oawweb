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
        <el-col :span="12" v-if="userList !== ''">
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
        <template v-if="active">
          <el-col :span="24">
            <el-form-item label="意见">
              <el-input type="textarea" :row="3" v-model="reasons"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-button
                type="primary"
                size="mini"
                @click="downfile"
                v-if="form.own_seal_filePath"
                >下载附件</el-button
              >
              <div v-if="openType != 'check'">
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
              </div>
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="24" v-else>
          <el-form-item>
            <el-upload
              class="upload-demo"
              ref="upload"
              action="http://192.168.11.129:8081/casd2/admin/uploadSealFile"
              :on-preview="handlePreview"
              :limit="1"
              :on-change="handleChange"
              :headers="{ token: token }"
              :on-success="handleSuccess"
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
    <Ca-view-process :Approvaltable="Approvaltable"></Ca-view-process>
  </div>
</template>

<script>
import CaViewProcess from "@/components/Ca-view-process/Ca-view-process";
import selectCompany from "@/components/Ca-select/select-company";
import { apisaveSeal, apiSealProcessList, apipassSeal } from "@/request/api.js";
export default {
  name: "SealApply",
  data() {
    return {
      token: localStorage.getItem("token"),
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
      activityLists: [],
      current: 1, //当前流程节点
      userTaskName: "",
      reasons: ""
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
    },
    //根据盖章类别显示流程线
    getProcessline(row) {
      if (row[0] == "1") {
        this.changeProcessline("process0");
      } else if (row[0] == "5") {
        this.changeProcessline("process2");
      } else if (row[0] == "2" || row[0] == "3" || row[0] == "4") {
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
      console.log("res");
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
        this.userid = res.userlist.userList
          ? res.userlist.userList[0].userid
          : "";
        this.userList = res.userlist.userList ? res.userlist.userList : "";
        this.activityLists = res.activityList;
        this.userTaskName = res.userlist.userTaskName;
        this.getProcessline(this.form.own_seal_chapCategory);
      });
    },
    //改变章类型后获取流程线类型
    changeProcessline(i) {
      this.activityList = this.activityLists[i].map((item, index) => {
        if (item.name == this.userTaskName && this.active) {
          this.current = index;
        } else if (this.userTaskName == "结束") {
          this.current = this.activityLists[i].length;
        }

        return item;
      });
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
    successUpload(res, file, fileList) {
      console.log(res);
      console.log(file);
      console.log(fileList);
    },
    getCompanyName(val) {
      this.form.own_seal_company = val;
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
        .catch();
    },
    submit() {
      this.form.own_seal_chapCategory = this.form.own_seal_chapCategory.join(
        ","
      );
      this.form.userid = this.userid;
      console.log(this.form);
      apisaveSeal(this.form).then(res => {
        this.$message.success(res.msg);
        this.$emit("close");
      });
    },
    handlePreview(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss" scoped></style>
