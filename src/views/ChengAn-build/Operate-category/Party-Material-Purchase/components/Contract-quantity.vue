<template>
  <div>
    <h3>项目信息</h3>
    <el-form size="mini" inline>
      <el-form-item label="项目名称">
        <el-input
          v-model="projectList.construct_project_name"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="工程地址">
        <el-input
          v-model="projectList.construct_project_addr"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="项目经理">
        <el-input v-model="projectList.construct_project_leader" readonly>
        </el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input readonly value="甲供材"></el-input>
      </el-form-item>
    </el-form>
    <h3>材料单</h3>
    <el-button type="primary" size="mini" @click="additem">添加行</el-button>
    <Ca-rule-table
      :setheight="0.35"
      :DataList="DataList"
      :header="header"
      :headle="headle"
      @checkleave="selectQuantity"
    ></Ca-rule-table>
    <el-dialog :visible.sync="isopen" :append-to-body="true" top="8vh">
      <select-quantity
        :projectList="projectList"
        @setQuantity="getQuantity"
      ></select-quantity>
    </el-dialog>
  </div>
</template>

<script>
import selectQuantity from "./select-quantity";

import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
export default {
  name: "ContractQuantity",
  data() {
    return {
      DataList: [],
      header: [
        ["工程量编号", "construct_project_quantities_id", 120],
        ["材料类别", "construct_material_seriesName", 100],
        ["材料名称", "construct_material_name", 100],
        ["型号规格", "construct_material_model_name"],
        ["原材料名称和规格", "", 160],
        ["单位", "construct_material_model_unit", 80],
        ["主材数量", "", 100],
        ["已采购量", "construct_project_quantities_num", 100],
        ["合同单价", "", 100],
        ["新增主材数量", "", 130]
      ],
      headle: ["选择", "删除"],
      isopen: false,
      addid: 1,
      activeList: []
    };
  },
  components: {
    CaRuleTable,
    selectQuantity
  },
  props: {
    projectList: Object
  },
  methods: {
    //添加行
    additem() {
      this.DataList.push({
        id: this.addid,
        construct_project_quantities_id: "",
        construct_material_seriesName: "",
        construct_material_name: "",
        construct_material_model_name: "",
        construct_material_model_unit: "",
        construct_project_quantities_num: ""
      });
      this.addid++;
    },
    selectQuantity(row) {
      this.isopen = true;
      this.activeList = row;
      console.log(this.activeList);
    },
    getQuantity(row) {
      console.log(row);
      this.isopen = false;
      this.DataList = this.DataList.map(item => {
        if (item.id == this.activeList.id) {
          item = row;
        }
        return item;
      });
      console.log(this.DataList);
    }
  }
};
</script>

<style lang="scss" scoped></style>
