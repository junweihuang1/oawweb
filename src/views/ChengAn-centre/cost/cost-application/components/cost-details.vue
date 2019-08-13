<template>
  <div>
    <el-form ref="form" :model="form" label-width="90px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请人">
            <el-input v-model="applicant"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请时间">
            <el-input v-model="nowtime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司部门">
            <el-input
              v-model="form.costapp_company"
              @focus="openselect"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="isopenselect"
      title="选择部门"
      :append-to-body="true"
      top="8vh"
    >
      <select-department @setSelectName="getSelectName"></select-department>
    </el-dialog>
  </div>
</template>

<script>
import selectDepartment from "@/components/Ca-select/select-department";
import { getDates } from "@/components/global-fn/global-fn";
export default {
  name: "costDetails",
  data() {
    return {
      form: this.setform,
      applicant: "",
      nowtime: getDates(new Date()),
      isopenselect: false
    };
  },
  components: {
    selectDepartment
  },
  props: {
    setform: {
      type: Object,
      default: () => {
        return {
          costapp_company: "",
          costapp_appitem: "",
          costapp_amount: "",
          costapp_application: ""
        };
      }
    }
  },
  methods: {
    getSelectName(row) {
      console.log(row);
      this.isopenselect = false;
      this.form.costapp_company =
        row.company_name + row.center_name + row.department_name;
    },
    openselect() {
      this.isopenselect = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
