<template>
  <div>
    <el-row>
      <Ca-tree centerName="加盟分供方" @nodeClick="nodeClick"></Ca-tree>
      <el-col :span="21" style="padding-left:20px;">
        <el-form inline size="mini">
          <el-form-item label="姓名">
            <el-input v-model="username" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" @click="getWorkerList">查询</el-button>
              <el-button type="primary" @click="isopenwin">新增</el-button>
            </el-button-group>
          </el-form-item>
        </el-form>
        <Ca-rule-table
          :DataList="WorkerList"
          :header="header"
          :headle="headle"
          @checkleave="editItem"
        ></Ca-rule-table>
        <paging
          :currentpage="currentpage"
          :currentlimit="currentlimit"
          :total="50"
          @setpage="getpage"
          @setlimit="getlimit"
        ></paging>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="isopen" width="70%">
      <modify-window
        :roleList="roleList"
        :userList="userList"
        :submitType="submitType"
      ></modify-window>
    </el-dialog>
  </div>
</template>

<script>
import CaTree from "@/components/Ca-tree/Ca-tree";
import ModifyWindow from "./components/modify-window";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apiworkerUserList, apiworkerUserNew } from "@/request/api";
export default {
  name: "materialDepaInfor",
  data() {
    return {
      currentpage: 1,
      currentlimit: 15,
      winheight: document.documentElement.scrollHeight - 126 + "px",
      defaultProps: {
        label: "name",
        children: "children"
      },
      username: "",
      WorkerList: [],
      header: [
        ["工号", "user_num"],
        ["姓名", "username"],
        ["电话号码", "phone_number"],
        ["性别", "sex2"],
        ["公司", "company_name"],
        ["中心", "center_name"],
        ["中心id", "center_id"],
        ["部门", "department"],
        ["身份证号码", "user_card"],
        ["身份证地址", "card_address"]
      ],
      headle: ["编辑"],
      isopen: false,
      userList: [],
      submitType: "",
      roleList: []
    };
  },
  components: {
    CaRuleTable,
    paging,
    ModifyWindow,
    CaTree
  },
  mounted() {
    this.getWorkerList();
  },
  methods: {
    nodeClick(data) {
      if (data.name != "分供方") {
        this.currentpage = 1;
        this.currentlimit = 15;
        this.getWorkerList();
      }
    },
    //获取工人职位信息
    getWorkerpost() {
      apiworkerUserNew().then(res => {
        res.roles.forEach(item => {
          this.roleList.push([item.role_id, item.role_name]);
        });
      });
    },
    editItem(row) {
      console.log(row);
      this.userList = [row];
      if (this.roleList == "") {
        this.getWorkerpost();
      }
      this.isopen = true;
      this.submitType = "";
    },
    isopenwin() {
      if (this.roleList == "") {
        this.getWorkerpost();
      }
      this.userList = [
        {
          company_id: 17,
          center_id: 38,
          center_name: "加盟分供方",
          company_name: "分供方"
        }
      ];
      this.isopen = false;
      this.$nextTick(() => {
        this.isopen = true;
      });
      this.submitType = "new";
    },
    getpage(val) {
      this.currentpage = val;
      this.getWorkerList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getWorkerList();
    },
    //所有材料部信息
    getWorkerList() {
      let data = {
        rows: this.currentlimit,
        page: this.currentpage,
        username: this.username,
        center_name: "加盟分供方"
      };
      apiworkerUserList(data).then(res => {
        console.log(res);
        this.WorkerList = res.rows.map(item => {
          item.sex2 = item.sex == 1 ? "男" : "女";
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss"></style>
