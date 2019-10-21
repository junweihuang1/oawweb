<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="材料类别">
        <el-input
          placeholder="材料类别"
          v-model="seriesName"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="材料名称">
        <el-input
          placeholder="材料名称"
          v-model="materialName"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="型号规格">
        <el-input
          placeholder="型号规格"
          v-model="modelName"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getQuantityRecord">搜索</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :setheight="0.5"
      :DataList="RecordList"
      :header="header"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apiQuantityRecord } from "@/request/api.js";
export default {
  name: "ContractRecord",
  data() {
    return {
      total: 0,
      currentlimit: 15,
      currentpage: 1,
      seriesName: "", //材料累呗
      materialName: "", //材料名称
      modelName: "", //型号规格
      RecordList: [],
      header: [
        ["材料类别", "construct_material_seriesName", 100],
        ["材料名称", "construct_material_name", 100],
        ["型号规格", "construct_material_model_name", 100],
        ["主材数量", "construct_project_quantities_num", 100],
        ["已采购数量", "purNum", 120],
        ["新增数量", "afterAddingNum", 100],
        ["步骤名称", "NAME_", 100],
        ["状态", "status", 80],
        ["修改时间", "change_time", 100]
      ]
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  props: {
    type: String,
    projectid: Number
  },
  created() {
    this.getQuantityRecord();
  },
  methods: {
    getlimit(val) {
      this.currentlimit = val;
      this.getQuantityRecord();
    },
    getpage(val) {
      this.currentpage = val;
      this.getQuantityRecord();
    },
    getQuantityRecord() {
      let data = {
        project_id: this.projectid,
        type: this.type,
        construct_material_seriesName: "",
        construct_material_name: "",
        construct_material_model_name: "",
        pageSize: this.currentlimit,
        limit: this.currentpage
      };
      console.log(data);
      apiQuantityRecord(data).then(res => {
        console.log(res);
        this.total = res.total;
        this.RecordList = res.data.map(item => {
          item.status =
            item.status == 2
              ? "审核通过"
              : item.status == 1
              ? "审核中"
              : item.status == 3
              ? "驳回"
              : "不同意";
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
