<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item label="材料系列">
        <el-input v-model="construct_material_seriesName" clearable></el-input>
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
      :headle="['选择']"
      @checkleave="dblclick"
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
import { apiselMaterialSeries } from "@/request/api.js";
export default {
  name: "selectProject",
  data() {
    return {
      construct_material_seriesName: "",
      materialList: [],
      currentpage: 1,
      currentlimit: 15,
      total: 0,
      header: [
        ["系列编号", "construct_material_num", 120],
        ["材料系列", "construct_material_seriesName", 120],
        ["描述", "remarks", 120]
      ]
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  created() {
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
        construct_material_seriesName: this.construct_material_seriesName,
        limit: this.currentpage,
        pageSize: this.currentlimit
      };
      apiselMaterialSeries(data).then(res => {
        console.log(res);
        this.total = res.total;
        this.materialList = res.data;
      });
    }
  }
};
</script>

<style lang="scss"></style>
