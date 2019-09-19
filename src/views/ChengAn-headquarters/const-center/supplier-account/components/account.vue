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
    <el-dialog :visible.sync="isopen" title="修改" :append-to-body="true" v-dialogDrag>
      <el-form inline size="mini" label-width="80px">
        <el-form-item label="材料名称">
          <el-input
            v-model="currentForm.construct_material_name"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="型号规格">
          <el-input
            v-model="currentForm.construct_material_model"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input
            v-model="currentForm.construct_material_unit"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="currentForm.construct_material_remarks"></el-input>
        </el-form-item>
        <el-form-item label="最新单价">
          <el-input v-model="currentForm.construct_material_price"></el-input>
        </el-form-item>
        <el-form-item label="原价">
          <el-input v-model="currentForm.construct_latest_price"></el-input>
        </el-form-item>
        <el-form-item label="最低单价">
          <el-input v-model="currentForm.construct_lowest_price"></el-input>
        </el-form-item>
      </el-form>
      <div style="width:100%;text-align:center;">
        <el-button size="mini" type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apimaterialPrices, apiaddmaterialprice } from "@/request/api.js";
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
      accountList: [],
      isopen: false,
      currentForm: {}
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
    save() {
      this.$confirm(`确定保存吗?`)
        .then(() => {
          this.currentForm.price = this.currentForm.construct_material_price;
          this.currentForm.material_remarks = this.currentForm.construct_material_remarks;
          apiaddmaterialprice(this.currentForm).then(res => {
            this.$message.success(res.msg);
            this.isopen = false;
            this.getAccountList();
          });
        })
        .catch(() => {});
    },
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
      this.currentForm = {
        construct_latest_price: row.construct_latest_price,
        construct_lowest_price: row.construct_lowest_price,
        construct_material_model: row.construct_material_model,
        construct_material_modelId: row.construct_material_modelId,
        construct_material_name: row.construct_material_name,
        construct_material_price: row.construct_material_price,
        construct_material_priceId: row.construct_material_priceId,
        construct_material_remarks: row.construct_material_remarks,
        construct_material_seriesName: row.construct_material_seriesName,
        construct_material_unit: row.construct_material_unit,
        construct_supplier_addr: row.construct_supplier_addr,
        construct_supplier_charger: row.construct_supplier_charger,
        construct_supplier_id: row.construct_supplier_id,
        construct_supplier_name: row.construct_supplier_name,
        construct_supplier_tel: row.construct_supplier_tel
      };
      this.isopen = true;
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
      apimaterialPrices(data).then(res => {
        this.accountList = res.data;
        console.log(this.accountList);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
