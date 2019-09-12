<template>
  <div>
    <el-divider content-position="left">
      变更信息
    </el-divider>
    <el-form size="mini" label-width="100px">
      <el-row
        ><el-col :span="12">
          <el-form-item label="姓名">
            <el-input
              v-model="findwoMap.username"
              style="width:100%;"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在项目">
            <el-input
              v-model="findwoMap.construct_project_name"
              style="width:100%;"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请调动项目">
            <el-input
              v-model="findmork.newProjectName"
              style="width:100%;"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请原因">
            <el-input
              v-model="findwoMap.suppliermod_worker_apply_reason"
              style="width:100%;"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="审核意见">
            <el-input
              v-model="reasons"
              style="width:100%;"
              type="textarea"
              :rows="3"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="">
            <el-button type="success" @click="headle(true)">同意</el-button>
            <el-button type="warning" @click="headle(false)">不同意</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="left">审核记录</el-divider>
    <el-table :data="history" border>
      <el-table-column
        align="center"
        v-for="(item, index) in header"
        :key="index"
        :label="item[0]"
        :prop="item[1]"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { apiworkerApplyView, apiworkerApplyPass } from "@/request/api";
export default {
  name: "ApplyMove",
  data() {
    return {
      findwoMap: {},
      findmork: {},
      reasons: "",
      history: [],
      header: [
        ["审核人", "username"],
        ["审核意见", ""],
        ["中心", "center_name"]
      ]
    };
  },
  props: {
    active: Object
  },
  mounted() {
    this.getRemoveList();
  },
  methods: {
    headle(type) {
      if (this.reasons == "") {
        this.$message.error("请填写意见后在提交");
        return;
      }
      let data = {
        taskid: this.active.ID_, //(必填)任务id
        reasons: this.reasons, //(必填)意见
        sign: type //(必填)是否同意 true/false
      };
      console.log(data);
      this.$confirm(`确定${type ? "同意" : "不同意"}吗？`)
        .then(() => {
          apiworkerApplyPass(data).then(res => {
            console.log(res);
            this.$message.success(res.Msg);
            this.$emit("close");
          });
        })
        .catch(() => {});
    },
    getRemoveList() {
      let id = this.active.BUSINESS_KEY_
        ? this.active.BUSINESS_KEY_.split(".")[1]
        : this.active.businessId;
      apiworkerApplyView({ workerApplyId: id }).then(res => {
        console.log(res);
        this.findwoMap = res.findwoMap;
        this.findmork = res.findmork;
        this.history = res.history;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
