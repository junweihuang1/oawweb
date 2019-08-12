<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item label="职位名">
        <el-input placeholder="请输入" v-model="roleName" clearable />
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="searchRole">搜索</el-button>
          <el-button type="success" @click="addNewRole">新增职位</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      style="width:40%;"
      :header="headerList"
      :DataList="roleList"
      :headle="headle"
      @checkleave="edit"
      @delete="delRole"
    ></Ca-rule-table>
    <paging
      @setlimit="handleSizeChange"
      @setpage="handleCurrentChange"
      :total="total"
      :currentpage="currentPage"
      :currentlimit="currentlimit"
    ></paging>
    <!-- <Permission-Tree
      :isPerTree="isPerTree"
      :TreeList="TreeList"
      :checkList="checkList"
      @closePerRole="tarnsferValue"
    ></Permission-Tree> -->
    <New-Role
      :isNewRole="isNewRole"
      :rule_name="rule_name"
      :state="state"
      @myNewRole="tarnsferValue"
      :TreeList="TreeList"
      :checkList="checkList"
    ></New-Role>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import NewRole from "./components/New-Role";
// import PermissionTree from "./components/Permission-Tree";
import { apiroleLists, apimenuTreeList, apideleRole } from "@/request/api.js";
export default {
  name: "StaffInfo",
  data() {
    return {
      roleList: [],
      currentPage: 1,
      currentlimit: 15,
      total: 100,
      roleName: "",
      TreeList: [],
      checkList: [],
      isNewRole: false,
      isPerTree: false,
      headerList: [
        ["职位编号", "role_id", 100],
        ["职位名称", "role_name"],
        ["状态", "state2", 80]
      ],
      headle: ["编辑", "删除"],
      state: "",
      rule_name: ""
    };
  },
  components: {
    paging,
    NewRole,
    CaRuleTable
  },
  mounted() {
    this.getroleLists();
  },
  methods: {
    tarnsferValue(e) {
      this.isPerTree = e;
      this.isNewRole = e;
    },
    //编辑
    edit(e) {
      this.rule_name = e.role_name;
      this.state = e.state.toString();
      this.isNewRole = true;
      this.getRoleTree(e.role_name);
    },
    //新增
    addNewRole() {
      this.rule_name = "";
      this.state = "1";
      this.isNewRole = true;
      this.getRoleTree("");
    },
    delRole(e) {
      this.$confirm(`确定删除${e.role_name}？`)
        .then(() => {
          apideleRole({ roleId: e }).then(res => {
            console.log(res);
          });
        })
        .catch(() => {});
    },
    searchRole() {
      this.getroleLists(this.roleName);
    },
    handleSizeChange(e) {
      this.currentlimit = e;
      this.getroleLists();
    },
    handleCurrentChange(e) {
      this.currentPage = e;
      this.getroleLists();
    },
    getroleLists(roleName = "") {
      apiroleLists({
        page: this.currentPage,
        limit: this.currentlimit,
        roleid: "",
        role_name: roleName
      }).then(res => {
        console.log("res");
        console.log(res);
        this.roleList = res.data.map(item => {
          item.state2 = item.state == 1 ? "启动" : "停用";
          return item;
        });
      });
    },

    getRoleTree(roleName) {
      this.TreeList = [];
      this.checkList = [];
      apimenuTreeList({
        roleName: roleName
      }).then(res => {
        this.TreeList = res.data;
        res.data.forEach(item => {
          if (item.children) {
            item.children.forEach(item2 => {
              if (item2.children) {
                item2.children.forEach(item3 => {
                  if (item3.checked) {
                    this.checkList.push(item3.id);
                  }
                });
              }
            });
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
