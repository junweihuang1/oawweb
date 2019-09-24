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
    <el-dialog title="修改职位" :visible.sync="isNewRole" v-dialogDrag>
      <New-Role
        :openType="openType"
        v-if="isNewRole"
        :activeform="activeform"
        @close="tarnsferValue"
        :TreeList="TreeList"
        :checkList="checkList"
      ></New-Role>
    </el-dialog>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import NewRole from "./components/New-Role";
import {
  apiroleLists,
  apimenuTreeList,
  apideleRole,
  apieditRole
} from "@/request/api.js";
export default {
  name: "StaffInfo",
  data() {
    return {
      roleList: [],
      currentPage: 1,
      currentlimit: 15,
      total: 0,
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
      openType: "",
      activeform: {}
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
      this.isPerTree = false;
      this.isNewRole = false;
      this.getroleLists()
    },
    //编辑
    edit(e) {
      // apieditRole({ cid: e.role_id }).then(res => {
      //   console.log(res);
      // });
      console.log(e);
      this.activeform = {
        state: e.state,
        role_id: e.role_id,
        role_name: e.role_name
      };
      this.openType = "edit";

      this.getRoleTree(e.role_name);
    },
    //新增
    addNewRole() {
      this.activeform = {
        state: 1
      };
      this.openType = "add";
      this.getRoleTree("");
    },
    delRole(e) {
      console.log(e)
      this.$confirm(`确定删除${e.role_name}吗？`)
        .then(() => {
          apideleRole({ roleId: e.role_id }).then(res => {
            console.log(res);
            this.$message.success(res.msg)
            this.currentlimit=15
            this.currentPage=1
            this.getroleLists()
          });
        })
        .catch(() => {});
    },
    searchRole() {
      this.currentPage = 1;
      this.currentlimit = 15;
      this.getroleLists();
    },
    handleSizeChange(e) {
      this.currentlimit = e;
      this.getroleLists();
    },
    handleCurrentChange(e) {
      this.currentPage = e;
      this.getroleLists();
    },
    getroleLists() {
      apiroleLists({
        page: this.currentPage,
        limit: this.currentlimit,
        roleid: "",
        role_name: this.roleName
      }).then(res => {
        console.log(res);
        this.total = res.count;
        this.roleList = res.data.map(item => {
          item.state2 = item.state == 1 ? "启用" : "停用";
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
        console.log(res);
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
        this.isNewRole = true;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
