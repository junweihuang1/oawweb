<template>
  <div>
    <el-dialog
      title="盖章申请"
      :visible.sync="myopen"
      width="35%"
      @close="closeChange"
    >
      <el-form ref="form" :model="form" label-width="90px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="文件名称">
              <el-input v-model="form.seal_fileName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预结算金额">
              <el-input v-model="form.seal_settle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用章公司">
              <el-input v-model="form.seal_company"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主送单位">
              <el-input v-model="form.seal_sender"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="用章类别">
              <el-checkbox-group v-model="form.seal_chapCategory">
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
                v-model="form.seal_remark"
                type="textarea"
                :rows="3"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核人">
              <picker-c
                @setApprover="getApprover"
                :selected="myopen"
              ></picker-c>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-upload
                class="upload-demo"
                ref="upload"
                action="string"
                :on-change="changefile"
                :on-preview="handlePreview"
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
    </el-dialog>
  </div>
</template>

<script>
import PickerC from "@/components/Ca-picker-c/Ca-picker-c.vue";
import { apisaveSeal } from "@/request/api.js";
export default {
  name: "SealApply",
  data() {
    return {
      myopen: this.isopen,
      form: {
        seal_fileName: "", //文件名称
        seal_settle: "", //预结算金额
        seal_company: "", //用章公司
        seal_sender: "", //主送单位
        seal_chapCategory: [], //用章类别
        seal_remark: "", //盖章用途
        seal_approver: "",
        seal_seal_filePath: ""
      },
      Seals: [
        [1, "公章"],
        [2, "业务章"],
        [3, "出图章"],
        [4, "竣工章"],
        [5, "项目章"]
      ]
    };
  },
  props: {
    isopen: Boolean
  },
  components: {
    PickerC
  },
  watch: {
    isopen(value) {
      this.myopen = value;
    }
  },
  methods: {
    changefile(file) {
      console.log(file);
    },
    submitUpload() {
      // let data = {
      //   own_seal_fileName: this.form.seal_fileName,
      //   own_seal_settle: this.form.seal_settle,
      //   own_seal_company: this.form.seal_company,
      //   own_seal_sender: this.form.seal_sender,
      //   own_seal_chapCategory: this.form.seal_chapCategory,
      //   own_seal_filePath: this.form.seal_seal_filePath,
      //   own_seal_remark: this.form.seal_remark,
      //   userid: this.form.seal_approver
      // };
      // apisaveSeal().then(res => {});
      console.log(this.fileUploadPath);
      //this.$refs.upload.submit();
    },
    handlePreview(e) {
      console.log(e);
    },
    closeChange() {
      this.$emit("closewidow");
    },
    getApprover(e) {
      this.form.seal_approver = e;
    }
  }
};
</script>

<style lang="scss" scoped></style>
