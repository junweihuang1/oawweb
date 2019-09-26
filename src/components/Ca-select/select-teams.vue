<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item label="员工姓名">
        <el-input v-model="userName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :setheight="0.5"
      :DataList="teamList"
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
import { apigetProjectManager } from "@/request/api.js";
export default {
  name: "selectProject",
  data() {
    return {
      userName: "",
      teamList: [],
      currentpage: 1,
      currentlimit: 15,
      total: 0,
      header: [
        ["员工编号", "userid", 100],
        ["员工姓名", "username", 100],
        ["联系方式", "phone_number", 100],
        ["员工职位", "role_name", 120],
        ["部门", "department_name", 100],
        ["中心", "center_name", 80],
        ["公司", "company_name", 100]
      ]
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    this.getprojectList();
  },
  methods: {
    query() {
      this.currentpage = 1;
      this.currentlimit = 15;
      this.getprojectList();
    },
    dblclick(row) {
      this.$emit("setSelectName", row);
    },
    getpage(e) {
      this.currentpage = e;
      this.getprojectList();
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getprojectList();
    },
    //获取项目名称
    getprojectList() {
      let data = {
        userName: this.userName,
        limit: this.currentpage,
        pageSize: this.currentlimit
      };
      apigetProjectManager(data).then(res => {
        this.total = res.total;
        this.teamList = res.data;
      });
    }
  }
};
</script>

<style lang="scss"></style>
