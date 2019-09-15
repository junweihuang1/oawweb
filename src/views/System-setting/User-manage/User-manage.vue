<template>
  <!--  用户管理页 -->
  <div>
    <el-form size="mini" inline>
      <el-form-item label="用户名">
        <el-input v-model="inputName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="getUserList">查询</el-button>
          <el-button type="danger" @click="deleteuser">删除用户</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      style="width:80%;"
      :setselect="true"
      :DataList="StaffData"
      :header="header"
      :headle="headle"
      @setselect="setselect"
      @checkleave="changePassW"
    ></Ca-rule-table>
    <paging
      @setlimit="getlimit"
      @setpage="getpage"
      :total="total"
      :currentpage="currentPage"
      :currentlimit="currentlimit"
    ></paging>
    <change-pass
      :isChange="isChange"
      @mychange="newChange"
      :userid="userid"
      :username="username"
    ></change-pass>
  </div>
</template>

<script>
import ChangePass from "./components/change-pass.vue";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import paging from "@/components/paging/paging";
//import DataTable from "./components/data-table";
import { apiuserLists, apideleteUser } from "@/request/api.js";
export default {
  name: "StaffInfo",
  data() {
    return {
      Idarr: [],
      StaffData: [],
      currentPage: 1,
      currentlimit: 15,
      inputName: "",
      total: 0,
      userid: "",
      username: "",
      header: [
        ["编号", "userid", 70],
        ["用户名", "username", 190],
        ["电话号码", "phone_number", 130],
        ["性别", "sex", 70],
        ["邮箱", "email", 160],
        ["身份证号码", "user_card", 180],
        ["身份证地址", "card_address"]
      ],
      headle: ["改密码"],
      isChange: false
    };
  },
  components: {
    CaRuleTable,
    paging,
    ChangePass
  },
  methods: {
    setselect(e) {
      this.Idarr = e.map(item => item.userid);
    },
    newChange() {
      this.isChange = false;
    },
    changePassW(e) {
      this.userid = e.userid;
      this.username = e.username;
      this.isChange = true;
    },
    deleteuser() {
      //this.$message.warning("此功能还没启用");
      this.$confirm(`确定删除用户吗？`)
        .then(() => {
          apideleteUser({
            cid: `[${this.Idarr.toString()}]`
          }).then(() => {
            this.$message.success("删除成功");
            this.getUserList();
          });
        })
        .catch(() => {});
    },
    getUserList() {
      let data = {
        Limit: this.currentPage,
        pageSize: this.currentlimit,
        inputName: this.inputName
      };
      console.log(data);
      apiuserLists(data).then(res => {
        console.log(res);
        this.total=res.totalCount
        this.StaffData = res.data.map(item => {
          item.sex = item.sex == 1 ? "男" : "女";
          item.status = item.status == 1 ? "在职" : "离职";
          return item;
        });
      });
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getUserList();
    },
    getpage(e) {
      this.currentPage = e;
      this.getUserList();
    }
  },
  mounted() {
    this.getUserList();
  }
};
</script>

<style lang="scss" scoped></style>
