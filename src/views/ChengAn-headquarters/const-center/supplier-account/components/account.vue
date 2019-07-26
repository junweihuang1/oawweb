<template>
  <div>
    <el-form size="mini" inline label-width="80px">
      <el-form-item label="材料名称">
        <el-input v-model="materialName"></el-input>
      </el-form-item>
      <el-form-item label="型号规格">
        <el-input v-model="modelSize"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { apimaterialPrices } from "@/request/api.js";
export default {
  name: "Account",
  data() {
    return {
      materialName: "",
      modelSize: "",
      header: [
        ["单价编号", ""],
        ["材料系列", ""],
        ["材料名称", ""],
        ["型号规格", ""],
        ["单位", ""],
        ["供应商", ""],
        ["供应商电话", ""],
        ["最新单价", ""],
        ["最低单价", ""],
        ["原价", ""],
        ["备注", ""]
      ],
      currentlimit: 15,
      currentpage: 1
    };
  },
  props: {
    accountid: {
      type: Number
    }
  },
  mounted() {
    this.getAccountList();
  },
  methods: {
    getAccountList() {
      let data = {
        construct_supplier_id: this.accountid,
        construct_material_name: this.materialName,
        construct_material_model: this.modelSize,
        rows: this.currentlimit,
        page: this.currentpage
      };
      console.log(data);
      apimaterialPrices(data).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
