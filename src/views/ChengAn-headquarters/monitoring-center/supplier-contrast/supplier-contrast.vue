<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="公司">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="月份">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="success">新增</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      style="width:45%;"
      :DataList="evaluateList"
      :header="header"
      :headle="headle"
      @checkleave="checkitem"
      :setselect="true"
      @setselect="getselect"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apisupplierformList, apisupplierformView } from "@/request/api.js";
import { getDate_cn } from "@/components/global-fn/global-fn.js";
export default {
  name: "supplierContrast",
  data() {
    return {
      query_month: "",
      currentpage: 1,
      currentlimit: 15,
      evaluateList: [],
      total: 15,
      header: [
        ["上传中心", "supplierform_loadcenter", 100],
        ["上传时间", "supplierform_date", 150],
        ["上传路径", "supplierform_fileway"]
      ],
      headle: ["查看"]
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    this.getevaluateList();
  },
  methods: {
    getpage(e) {
      this.currentpage = e;
      this.getevaluateList();
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getevaluateList();
    },
    //查看
    checkitem(row) {
      apisupplierformView({
        supplierform_id: row.supplierform_id
      }).then(res => {
        console.log(res);
      });
    },
    getevaluateList() {
      apisupplierformList({
        rows: this.currentlimit,
        page: this.currentpage,
        supplierform_date: this.query_month
      }).then(res => {
        console.log(res);
        this.evaluateList = res.data;
      });
    },
    getselect(val) {
      this.selectList = val.map(item => item.supplierform_id);
      console.log(this.selectList);
    }
  }
};
</script>

<style lang="scss" scoped></style>
