// 选择用户组件
<template>
  <div>
    <el-form inline size="mini">
      <el-form-item>
        <el-input
          v-model="roleName"
          placeholder="职位名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getroleList">搜索</el-button>
      </el-form-item>
      <el-form-item v-if="openType == 'process'">
        <el-button type="warning" @click="clearitem">清空</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :setheight="0.5"
      style="width:65%;"
      :header="header"
      :DataList="roleList"
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
import { apiroleLists } from "@/request/api.js";
export default {
  name: "selectUser",
  data() {
    return {
      currentPage: 1,
      currentlimit: 15,
      roleList: [],
      header: [
        ["职位编号", "role_id", 100],
        ["职位名称", "role_name"],
        ["状态", "state2", 80]
      ],
      roleName: ""
    };
  },
  props: {
    process: {
      type: String
    },
    openType: {
      type: String,
      default: ""
    }
  },
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    this.getroleList();
  },
  methods: {
    clearitem() {
      this.$emit("clear");
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getroleList();
    },
    getpage(e) {
      this.currentPage = e;
      this.getroleList();
    },
    //双击选择用户
    dblclick(row) {
      this.$emit("setrole", row);
    },
    getroleList() {
      apiroleLists({
        page: this.currentPage,
        limit: this.currentlimit,
        roleid: "",
        role_name: this.roleName
      }).then(res => {
        console.log(res);
        this.total = res.total;
        this.roleList = res.data.map(item => {
          item.state2 = item.state == 1 ? "启用" : "停用";
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
