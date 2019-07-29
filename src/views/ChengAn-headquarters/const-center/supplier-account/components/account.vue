<template>
  <div>
    <el-form size="mini" inline label-width="80px">
      <el-form-item label="材料名称">
        <el-input v-model="materialName" clearable></el-input>
      </el-form-item>
      <el-form-item label="型号规格">
        <el-input v-model="modelSize" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getAccountList">搜索</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="accountList"
      :header="header"
      :headle="headle"
      :setheight="0.5"
      @checkleave="edititem"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      :total="200"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apimaterialPrices } from "@/request/api.js";
export default {
  name: "Account",
  data() {
    return {
      materialName: "",
      modelSize: "",
      header: [
        ["单价编号", "construct_material_priceId", 95],
        ["材料系列", "construct_material_seriesName", 95],
        ["材料名称", "construct_material_name", 95],
        ["型号规格", "construct_material_model", 95],
        ["单位", "construct_material_unit", 70],
        ["供应商", "construct_supplier_name"],
        ["供应商电话", "construct_supplier_tel", 110],
        ["最新单价", "construct_material_price", 95],
        ["最低单价", "construct_lowest_price", 95],
        ["原价", "construct_latest_price", 70],
        ["备注", "construct_material_remarks", 95]
      ],
      headle: ["编辑"],
      currentlimit: 15,
      currentpage: 1,
      accountList: []
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  props: {
    accountid: {
      type: Number
    }
  },
  watch: {
    accountid() {
      this.getAccountList();
    }
  },
  mounted() {
    this.getAccountList();
  },
  methods: {
    //更新当前页
    getpage(val) {
      this.currentpage = val;
      this.getAccountList();
    },
    //更新每页数量
    getlimit(val) {
      this.currentlimit = val;
      this.getAccountList();
    },
    //编辑
    edititem(row) {
      console.log(row);
    },
    //获取台账数据
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
        this.accountList = res.data;
        console.log(this.accountList);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
