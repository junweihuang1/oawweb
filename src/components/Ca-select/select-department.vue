<template>
  <div>
    <el-form label-width="80px" size="mini" inline>
      <el-form-item label="部门名称">
        <el-input v-model="departmentName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :setheight="0.6"
      :DataList="departmentList"
      :header="header"
      @dblclick="dblclick"
      :headle="['选择']"
      @checkleave="dblclick"
    ></Ca-rule-table>
    <paging
      @setpage="getpage"
      @setlimit="getlimit"
      :total="total"
      :currentlimit="currentlimit"
      :currentpage="currentpage"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apiorgChecks } from "@/request/api.js";
export default {
  name: "selectCenter",
  data() {
    return {
      companyName: "",
      centerName: "",
      departmentName: "",
      departmentList: [],
      currentpage: 1,
      currentlimit: 15,
      total: 40,
      header: [
        ["公司", "company_name"],
        ["中心", "center_name"],
        ["部门", "department_name"]
      ]
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  created() {
    this.getdepartmentList();
  },
  methods: {
    query() {
      this.currentpage = 1;
      this.currentlimit = 15;
      this.getdepartmentList();
    },
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
    //获取项目名称
    getdepartmentList() {
      apiorgChecks({
        department_name: this.departmentName,
        limit: this.currentlimit,
        page: this.currentpage
      })
        .then(res => {
          console.log(res);
          this.total = res.count;
          this.departmentList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss"></style>
