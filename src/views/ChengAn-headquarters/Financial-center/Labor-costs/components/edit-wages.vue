<template>
  <div>
    <el-form size="mini" label-width="100px" style="width:80%;">
      <el-form-item label="实际出勤">
        <el-input
          v-model="wagesForm.uc_wage_actualDay"
          clearable
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="基本工资">
        <el-input
          v-model="wagesForm.uc_wage_base"
          clearable
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="岗位工资">
        <el-input
          v-model="wagesForm.uc_wage_post"
          clearable
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="绩效工资">
        <el-input
          v-model="wagesForm.uc_wage_achieve"
          clearable
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="津贴补助">
        <el-input
          v-model="wagesForm.uc_wage_subsidy"
          clearable
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="代扣社保">
        <el-input
          v-model="wagesForm.uc_wage_socSec"
          clearable
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="代扣公积金">
        <el-input
          v-model="wagesForm.uc_wage_accFund"
          clearable
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="代扣个税">
        <el-input
          v-model="wagesForm.uc_wage_tax"
          clearable
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="save">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { apisubmitWages } from "@/request/api";
export default {
  name: "editWages",
  props: {
    wagesForm: Object
  },
  methods: {
    save() {
      console.log(this.wagesForm);
      this.$confirm(`确定提交吗？`)
        .then(() => {
          apisubmitWages(this.wagesForm).then(res => {
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
