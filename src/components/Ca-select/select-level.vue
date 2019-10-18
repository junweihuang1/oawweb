// 选择用户组件
<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="节点名字">
        <el-input
          v-model="framework_name"
          placeholder="用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="公司">
        <el-input
          v-model="company_name"
          placeholder="用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getDataList">搜索</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :setheight="0.5"
      :header="header"
      :DataList="tableData"
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
import { apiframeWorkList } from "@/request/api.js";
export default {
  name: "selectUser",
  data() {
    return {
      currentPage: 1,
      currentlimit: 15,
      total: 0,
      tableData: [],
      header: [
        ["公司", "company_name", 120],
        ["名字", "uc_framework_name", 120],
        ["上一级", "lastLev", 120],
        ["描述", "uc_framework_describe"]
      ],
      framework_name: "",
      company_name: ""
    };
  },
  props: {
    openType: String
  },
  watch: {},
  components: {
    CaRuleTable,
    paging
  },
  created() {
    this.getDataList();
  },
  methods: {
    getselect(row) {
      console.log(row);
      this.selectForm = row;
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getDataList();
    },
    getpage(e) {
      this.currentPage = e;
      this.getDataList();
    },
    //双击选择用户
    dblclick(row) {
      this.$emit("setLevel", row);
    },
    getDataList() {
      let data = {
        rows: this.currentlimit,
        page: this.currentPage,
        framework_name: this.framework_name,
        company: this.company_name
      };
      console.log(data);
      apiframeWorkList(data).then(res => {
        this.total = res.total;
        this.tableData = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
