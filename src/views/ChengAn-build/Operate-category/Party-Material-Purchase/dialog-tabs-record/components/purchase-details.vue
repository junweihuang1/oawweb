<template>
  <div>
    <el-form
      inline
      size="mini"
      label-width="90px"
      label-position="left"
      class="elform"
    >
      <el-form-item label="项目名称">
        <el-input
          v-model="projectList.construct_project_name"
          clearable
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="收货地址">
        <el-input
          v-model="projectList.construct_project_addr"
          clearable
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input
          v-model="projectList.construct_project_leader"
          clearable
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input
          v-model="projectList.construct_project_leaderTel"
          clearable
          readonly
        ></el-input>
      </el-form-item>
    </el-form>
    <el-form
      inline
      size="mini"
      label-width="90px"
      label-position="left"
      class="elform"
    >
      <el-form-item label="订单号">
        <el-input
          v-model="projectList.construct_Aparty_purchase_orderNum"
          clearable
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="供货单位">
        <el-input
          v-model="projectList.construct_Aparty_purchase_supplier"
          clearable
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input
          v-model="projectList.construct_Aparty_purchase_contacts"
          clearable
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input
          v-model="projectList.construct_Aparty_purchase_tel"
          clearable
          readonly
        ></el-input>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="entriesList"
      :header="header"
      :setheight="0.5"
    ></Ca-rule-table>
  </div>
</template>

<script>
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apigetAPartyPur } from "@/request/api.js";
export default {
  name: "PurchaseDetails",
  data() {
    return {
      projectList: [],
      entriesList: [],
      header: [
        ["材料分类", "construct_Aparty_material_category", 100],
        ["材料名称", "construct_Aparty_material_name", 120],
        ["型号规格", "construct_Aparty_material_model"],
        ["单位", "construct_Aparty_material_unit", 70],
        ["合同工程量", "construct_Aparty_material_num", 120],
        ["累计审批量", "construct_aParty_byedNum", 120],
        ["计划采购量", "construct_Aparty_purEntry_num", 120],
        ["备注", "construct_Aparty_purEntry_remark", 120]
      ]
    };
  },
  components: {
    CaRuleTable
  },
  props: {
    PurchaseId: Number
  },
  watch: {
    PurchaseId() {
      this.getApartyPur();
    }
  },
  mounted() {
    this.getApartyPur();
  },
  methods: {
    getApartyPur() {
      apigetAPartyPur({ construct_Aparty_purchase_id: this.PurchaseId }).then(
        res => {
          console.log(res);
          this.projectList = res.data.aParty[0];
          this.entriesList = res.data.entries;
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.elform {
  margin-left: 20px;
}
.elform:first-child {
  margin-top: 30px;
}
</style>
