<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item label="材料系列">
        <el-input v-model="seriesName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getmaterialList">
          查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addmaterial">
          新增材料系列
        </el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      style="width:40%;"
      :DataList="materialList"
      :header="header"
      :headle="headle"
      @checkleave="getlist"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      :total="90"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apimaterialSeries } from "@/request/api.js";
export default {
  name: "materialManage",
  data() {
    return {
      seriesName: "",
      currentpage: 1,
      currentlimit: 15,
      materialList: [],
      header: [
        ["系列编号", "construct_material_num", 120],
        ["材料系列", "construct_material_seriesName"],
        ["描述", "remarks"]
      ],
      headle: ["材料列表"]
    };
  },
  mounted() {
    this.getmaterialList();
  },
  components: {
    CaRuleTable,
    paging
  },
  methods: {
    addmaterial() {},
    getlimit(val) {
      this.currentlimit = val;
      this.getmaterialList();
    },
    getpage(val) {
      this.currentpage = val;
      this.getmaterialList();
    },
    getlist(row) {
      console.log(row);
    },
    //获取所有材料系列信息
    getmaterialList() {
      let data = {
        rows: this.currentlimit,
        page: this.currentpage,
        construct_material_seriesName: this.seriesName
      };
      apimaterialSeries(data).then(res => {
        console.log(res);
        this.materialList = res.rows;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
