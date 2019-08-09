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
              <select-company @setCompanyName="getCompanyName"></select-company>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主送单位">
              <el-input v-model="form.own_seal_sender"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="用章类别">
              <el-checkbox-group v-model="form.own_seal_chapCategory">
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
import selectCompany from "@/components/Ca-select/select-company";
import PickerC from "@/components/Ca-picker-c/Ca-picker-c.vue";
import { apisaveSeal } from "@/request/api.js";
export default {
  name: "SealApply",
  data() {
    return {
      myopen: this.isopen,
      form: {
        own_seal_fileName: "", //文件名称
        own_seal_settle: "", //预结算金额
        own_seal_company: "", //用章公司
        own_seal_sender: "", //主送单位
        own_seal_chapCategory: [], //用章类别
        own_seal_remark: "", //盖章用途
        userid: "",
        own_seal_filePath: ""
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
    PickerC,
    selectCompany
  },
  watch: {
    isopen(value) {
      this.myopen = value;
    }
  },
  methods: {
    getCompanyName(val) {
      this.form.own_seal_company = val;
    },
    changefile(file) {
      console.log(file);
    },
    submitUpload() {
      // this.form.own_seal_chapCategory = JSON.stringify(
      //   this.form.own_seal_chapCategory
      // );
      console.log(this.form);
      apisaveSeal(this.form).then(res => {
        console.log(res);
      });
      //this.$refs.upload.submit();
    },
    handlePreview(e) {
      console.log(e);
    },
    closeChange() {
      this.$emit("closewidow");
    },
    getApprover(e) {
      this.form.userid = e;
    }
  }
};
</script>

<style lang="scss" scoped></style>
