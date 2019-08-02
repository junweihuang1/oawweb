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
      <el-form-item>
        <el-button-group>
          <el-button type="success" @click="isadd = true">新增</el-button>
          <el-button type="danger" @click="deleteitem">删除</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.6)"
      :DataList="materialList"
      :header="header"
      :setheight="0.6"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="950"
      @setlimit="getlimit"
      @setpage="getpage"
    ></paging>
    <el-dialog title="新增合同工程量" :visible.sync="isadd"> </el-dialog>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apiaPartyMaterialList } from "@/request/api.js";
export default {
  name: "PartyMaterialList",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      material_category: "",
      material_name: "",
      material_model_name: "",
      materialList: [],
      header: [
        ["材料类别", "construct_Aparty_material_category", 100],
        ["材料名称", "construct_Aparty_material_name", 100],
        ["规格型号", "construct_Aparty_material_model"],
        ["单位", "construct_Aparty_material_unit", 80],
        [
          "合同工程量",
          "",
          "",
          "",
          [["合同工程量", "", 120], ["新增工程量", "", 120]]
        ],
        ["已采购数量", "", 120],
        ["可采购数量", "", 120],
        ["备注", "construct_Aparty_material_remark", 90]
      ],
      headle: [],
      loading: true,
      isadd: false
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  props: {
    projectId: Number
  },
  watch: {
    projectId() {
      this.loading = true;
      this.materialList = [];
      this.getMaterialList();
    }
  },
  mounted() {
    this.getMaterialList();
  },
  methods: {
    //删除多行
    deleteitem() {},
    query() {
      this.loading = true;
      this.getMaterialList();
    },
    getpage(val) {
      this.loading = true;
      this.currentpage = val;
      this.getMaterialList();
    },
    getlimit(val) {
      this.loading = true;
      this.currentlimit = val;
      this.getMaterialList();
    },
    getMaterialList() {
      apiaPartyMaterialList({
        construct_project_id: this.projectId,
        material_category: this.material_category,
        material_name: this.material_name,
        material_model_name: this.material_model_name,
        pageSize: this.currentlimit,
        limit: this.currentpage
      }).then(res => {
        console.log(res);
        this.loading = false;
        this.materialList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
