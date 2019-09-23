<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item label="材料名称">
        <el-input v-model="materialName" clearable></el-input>
      </el-form-item>
      <el-form-item label="规格型号">
        <el-input v-model="modelType" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :setheight="0.5"
      :DataList="materialList"
      :header="header"
      @dblclick="dblclick"
    ></Ca-rule-table>
    <paging
      @setpage="getpage"
      @setlimit="getlimit"
      :total="total"
      :currentlimit="currentlimit"
      :currentpage="currentpage"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apiselMaterial } from "@/request/api.js";
export default {
  name: "selectProject",
  data() {
    return {
      materialName: "",
      modelType: "",
      materialList: [],
      currentpage: 1,
      currentlimit: 15,
      total: 130,
      header: [
        ["编号id", "construct_project_quantities_id", 90],
        ["材料名称", "construct_project_quantities_name", 140],
        ["规格型号", "construct_project_quantities_model", 100],
        ["单位", "construct_material_model_unit", 80],
        ["数量", "construct_project_quantities_num", 80],
        ["累计采购量", "sum", 120],
        ["单价", "construct_project_quantities_price", 100],
        ["描述", "construct_project_quantities_remarks", 100]
      ]
    };
  },
  props: {
    materialSerId: Number,
    projectId: Number
  },
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    this.getmaterialList();
  },
  methods: {
    query() {
      this.currentpage = 1;
      this.currentlimit = 15;
      this.getmaterialList();
    },
    dblclick(row) {
      this.$emit("setSelectName", row);
    },
    getpage(e) {
      this.currentpage = e;
      this.getmaterialList();
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getmaterialList();
    },
    //获取项目名称
    getmaterialList() {
      let data = {
        construct_project_quantities_name: this.materialName, //(选填)材料名称
        construct_project_quantities_model: this.modelType, //(选填)型号规格
        projectId: this.projectId, //(必填)项目id
        materialSerId: this.materialSerId, //(必填)材料系列id
        limit: this.currentpage,
        pageSize: this.currentlimit
      };
      console.log(data);
      apiselMaterial(data).then(res => {
        console.log(res);
        this.total = res.total;
        this.materialList = res.data;
      });
    }
  }
};
</script>

<style lang="scss"></style>
