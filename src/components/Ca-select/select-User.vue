// 选择用户组件
<template>
  <div>
    <el-form inline size="mini">
      <el-form-item>
        <el-input v-model="username" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">搜索</el-button>
      </el-form-item>
      <el-form-item v-if="openType == 'checkbox'">
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :setheight="0.5"
      :setselect="true"
      @setselect="getselect"
      :header="header"
      :DataList="userList"
      @dblclick="dblclick"
      :headle="['选择']"
      @checkleave="dblclick"
    ></Ca-rule-table>
    <paging
      :currentpage="currentPage"
      :currentlimit="currentlimit"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import { apiuserListChecks } from "@/request/api.js";
export default {
  name: "selectUser",
  data() {
    return {
      currentPage: 1,
      currentlimit: 15,
      total: 0,
      userList: [],
      header: [
        ["员工编号", "userid"],
        ["员工名称", "username"],
        ["联系方式", "phone_number"],
        ["员工职位", "role_name"],
        ["部门", "department_name"],
        ["中心", "center_name"],
        ["公司", "company_name"]
      ],
      username: "",
      selectForm: {}
    };
  },
  props: {
    openType: String
  },
  components: {
    CaRuleTable,
    paging
  },
  created() {
    this.getUserList();
  },
  methods: {
    query() {
      this.currentlimit = 15;
      this.currentPage = 1;
      this.getUserList();
    },
    save() {
      let name = this.selectForm.map(item => {
        return item.username;
      });
      let id = this.selectForm.map(item => {
        return item.userid;
      });
      this.$emit("setsup", [name, id]);
    },
    getselect(row) {
      this.selectForm = row;
    },
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
      apiuserListChecks({
        limit: this.currentlimit,
        page: this.currentPage,
        username: this.username
      }).then(res => {
        this.total = res.count;
        this.userList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
