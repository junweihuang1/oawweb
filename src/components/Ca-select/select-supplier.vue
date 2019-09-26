// 选择供应商组件
<template>
  <div>
    <el-form inline size="mini">
      <el-form-item>
        <el-input
          v-model="supplierName"
          placeholder="供应商名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getSupplierList">搜索</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :setheight="0.5"
      :header="header"
      :DataList="supplierList"
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
import { apisupplierList } from "@/request/api.js";
export default {
  name: "selectSupplier",
  data() {
    return {
      currentPage: 1,
      currentlimit: 15,
      total: 0,
      supplierList: [],
      header: [
        ["供应商编号", "construct_supplier_id", 110],
        ["供应商名称", "construct_supplier_name"],
        ["供应商地址", "construct_supplier_addr", 110],
        ["供应商电话", "construct_supplier_tel", 110]
      ],
      supplierName: ""
    };
  },
  watch: {},
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    this.getSupplierList();
  },
  methods: {
    getlimit(e) {
      this.currentlimit = e;
      this.getSupplierList();
    },
    getpage(e) {
      this.currentPage = e;
      this.getSupplierList();
    },
    //双击选择用户
    dblclick(row) {
      this.$emit("setSupplier", row);
    },
    getSupplierList() {
      apisupplierList({
        rows: this.currentlimit,
        page: this.currentPage,
        construct_suppliername: this.supplierName
      }).then(res => {
        this.total = res.total;
        this.supplierList = res.rows;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
