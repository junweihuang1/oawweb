<template>
  <div>
    <el-form inline size="mini">
      <el-form-item>
        <el-input v-model="username" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUserList">搜索</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :setheight="0.5"
      :header="header"
      :DataList="userList"
      @dblclick="dblclick"
    ></Ca-rule-table>
    <paging
      :currentpage="currentPage"
      :currentlimit="currentlimit"
      :total="200"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import { apiuserLists } from "@/request/api.js";
export default {
  name: "selectUser",
  data() {
    return {
      currentPage: 1,
      currentlimit: 15,
      userList: [],
      header: [
        ["员工编号", "userid"],
        ["员工名称", "username"],
        ["联系方式", "phone_number"],
        ["员工职位", "major"],
        ["部门", "department"],
        ["中心", "center_id"],
        ["公司", ""],
        ["部门id", "department"]
      ],
      username: ""
    };
  },
  props: {},
  watch: {},
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    getlimit(e) {
      this.currentlimit = e;
      this.getUserList();
    },
    getpage(e) {
      this.currentPage = e;
      this.getUserList();
    },
    //双击选择用户
    dblclick(row) {
      this.$emit("setuser", row);
    },
    getUserList() {
      apiuserLists({
        Limit: this.currentPage,
        pageSize: this.currentlimit,
        inputName: this.username
      }).then(res => {
        this.userList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
