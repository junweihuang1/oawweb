<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="材料名称">
        <el-input v-model="materialName" clearable></el-input>
      </el-form-item>
      <el-form-item label="规格型号">
        <el-input v-model="model" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getModifyList">查询</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table :DataList="ModifyList" :header="header"></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      :total="0"
      @setlimit="getlimit"
      @setpage="getpage"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apisupplier_price } from "@/request/api.js";
export default {
  name: "materialMod",
  data() {
    return {
      currentlimit: 10,
      currentpage: 1,
      materialName: "",
      model: "",
      ModifyList: [],
      header: [
        ["单价编号", ""],
        ["材料名称", ""],
        ["规格型号", ""],
        ["单位", ""],
        ["供应商", ""],
        ["供应商电话", ""],
        ["最新单价", ""],
        ["最低单价", ""],
        ["原价", ""],
        ["备注", ""]
      ]
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    this.getModifyList();
  },
  methods: {
    getpage(val) {
      this.currentpage = val;
      this.getModifyList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getModifyList();
    },
    getModifyList() {
      let data = {
        rows: this.currentlimit,
        page: this.currentpage,
        construct_material_name: this.materialName,
        construct_material_model: this.model
      };
      console.log(data);
      apisupplier_price(data).then(res => {
        this.ModifyList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
