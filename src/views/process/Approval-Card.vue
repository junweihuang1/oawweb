<template>
  <div>
    补卡审批
    <el-table :data="tableData5" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="流程 ID">
              <span>{{ props.row.ID_ }}</span>
            </el-form-item>
            <el-form-item label="流程名称">
              <span>{{ props.row.pdname }}</span>
            </el-form-item>
            <el-form-item label="审批部门">
              <span>{{ props.row.NAME_ }}</span>
            </el-form-item>
            <el-form-item label="描述">
              <span>{{ props.row.illustrate }}</span>
            </el-form-item>
            <el-form-item label="申请人">
              <span>{{ props.row.applicant }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="流程 ID" prop="ID_"> </el-table-column>
      <el-table-column label="流程名称" prop="pdname"> </el-table-column>
      <el-table-column label="审批部门" prop="NAME_"> </el-table-column>
      <el-table-column label="申请人" prop="applicant"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { apiNotAuditedCard } from "@/request/api.js";
export default {
  data() {
    return {
      tableData5: []
    };
  },
  mounted() {
    this.getNotAudited();
  },
  methods: {
    getNotAudited() {
      // apiNotAuditedCard().then(res => {
      //   console.log(res);
      // });
    }
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
