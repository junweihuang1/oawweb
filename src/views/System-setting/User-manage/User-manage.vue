<template>
  <!--  用户管理页 -->
  <div>
    <el-form size="mini" inline>
      <el-form-item
        ><el-button type="danger" @click="deleteuser">删除用户</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      style="width:80%;"
      :setselect="true"
      :DataList="StaffData"
      :header="header"
      :headle="headle"
      @checkleave="changePassW"
    ></Ca-rule-table>
    <paging
      @setlimit="handleSizeChange"
      @setpage="handleCurrentChange"
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
      total: 100,
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
    newChange() {
      this.isChange = false;
    },
    changePassW(e) {
      this.userid = e.userid;
      this.username = e.username;
      this.isChange = true;
    },
    DeleteId(e) {
      this.Idarr = e;
    },
    deleteuser() {
      this.$message.warning("此功能还没启用");
      // apideleteUser({
      //   cid: this.Idarr
      // }).then(res => {
      //   console.log(res);
      // });
    },
    getUserList() {
      apiuserLists({
        Limit: this.currentPage,
        pageSize: this.currentlimit
      }).then(res => {
        console.log(res);
        this.StaffData = res.data.map(item => {
          item.sex = item.sex == 1 ? "男" : "女";
          item.status = item.status == 1 ? "在职" : "离职";
          return item;
        });
      });
    },
    handleSizeChange(e) {
      this.currentlimit = e;
      this.getUserList();
    },
    handleCurrentChange(e) {
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
