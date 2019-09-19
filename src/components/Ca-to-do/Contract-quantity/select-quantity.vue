// 选择供应商组件
<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="材料类别">
        <el-input v-model="material_category" clearable></el-input>
      </el-form-item>
      <el-form-item label="材料名称">
        <el-input v-model="material_name" clearable></el-input>
      </el-form-item>
      <el-form-item label="材料规格">
        <el-input v-model="material_model_name" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.6)"
      :setheight="0.5"
      :header="header"
      :DataList="QuantityList"
      @dblclick="dblclick"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
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
import { apiConMaterialList } from "@/request/api.js";
export default {
  name: "selectSupplier",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      total: 0,
      QuantityList: [],
      header: [
        ["工程量编号", "construct_project_quantities_id", 115],
        ["材料类别", "construct_material_seriesName", 100],
        ["材料名称", "construct_material_name", 100],
        ["材料规格", "construct_material_model_name"],
        ["原材料名称和规格", "", 160],
        ["主材数量", "construct_project_quantities_num", 100],
        ["已采购量", "purNum", 100]
      ],
      material_category: "",
      material_name: "",
      material_model_name: "",
      loading: true
    };
  },
  props: {
    projectList: Object
  },
  watch: {
    projectList() {
      this.loading = false;
    }
  },
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    this.getQuantityList();
  },
  methods: {
    query() {
      this.currentlimit = 15;
      this.currentpage = 1;
      this.getQuantityList();
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getQuantityList();
    },
    getpage(e) {
      this.currentpage = e;
      this.getQuantityList();
    },
    //双击选择用户
    dblclick(row) {
      this.$emit("setQuantity", row);
    },
    getQuantityList() {
      apiConMaterialList({
        type: "BSupply",
        project_id: this.projectList.construct_project_id,
        construct_material_seriesName: this.material_category,
        construct_material_name: this.material_name,
        construct_material_model_name: this.material_model_name,
        pageSize: this.currentlimit,
        limit: this.currentpage
      }).then(res => {
        console.log(res);
        this.total = res.total;
        this.QuantityList = res.data;
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
