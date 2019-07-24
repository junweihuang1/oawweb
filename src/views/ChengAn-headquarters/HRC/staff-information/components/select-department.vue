<template>
  <div>
    <el-dialog
      :visible="myopenSelect"
      title="部门信息"
      @close="closewin"
      width="40%"
      top="6vh"
      class="abow_dialog"
    >
      <el-form label-width="80px" size="mini" inline>
        <el-form-item label="部门名称">
          <el-input v-model="departmentName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="queryCenter">查询</el-button>
        </el-form-item>
      </el-form>
      <Ca-rule-table
        :DataList="departmentList"
        :header="header"
        @dblclick="dblclick"
      ></Ca-rule-table>
      <paging
        @setpage="getpage"
        @setlimit="getlimit"
        :total="total"
        :currentlimit="currentlimit"
        :currentpage="currentpage"
      ></paging>
    </el-dialog>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apidepartmentList } from "@/request/api.js";
export default {
  name: "selectCenter",
  data() {
    return {
      myopenSelect: this.isopenSelect,
      companyName: "",
      centerName: "",
      departmentName: "",
      departmentList: [],
      currentpage: 1,
      currentlimit: 15,
      total: 40,
      header: [
        ["部门编号", "department_id"],
        ["部门名称", "department_name"],
        ["所属中心", "center_name"],
        ["所属公司", "company_name"]
      ]
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  props: {
    isopenSelect: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isopenSelect(val) {
      this.myopenSelect = val;
      if (val && this.departmentList == "") {
        this.getdepartmentList();
      }
    }
  },
  methods: {
    dblclick(row) {
      this.$emit("setSelectName", row);
    },
    getpage(e) {
      this.currentpage = e;
      this.getdepartmentList();
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getdepartmentList();
    },
    queryCenter() {
      this.getdepartmentList();
    },
    closewin() {
      this.$emit("closewin");
    },
    //获取项目名称
    getdepartmentList() {
      apidepartmentList({
        rows: this.currentlimit,
        page: this.currentpage,
        department_name: this.departmentName,
        center_name: this.centerName,
        company_name: this.companyName
      })
        .then(res => {
          console.log(res);
          this.departmentList = res.rows;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
.abow_dialog {
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
  .el-dialog {
    margin: 0 auto !important;
    height: 90%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
    }
  }
  .table {
    height: 85%;
    overflow: auto;
  }
}
</style>
