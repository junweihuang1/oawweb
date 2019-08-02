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
      @edit="modifymarterial"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      :total="75"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>

    <add-material-dialog
      :isadd="isadd"
      :setmaterialCategory="materialCategory"
      :supplierList="supplierList"
      :seriesID="seriesID"
      :setremark="remark"
      @closewin="finishSubmit"
    ></add-material-dialog>

    <el-dialog :visible.sync="showlist" top="8vh">
      <dialog-tabs :seriesID="materialID"></dialog-tabs>
    </el-dialog>
  </div>
</template>

<script>
import dialogTabs from "./dialog-tabs";
import addMaterialDialog from "./components/add-material-dialog";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apimaterialSeries, apiselectData } from "@/request/api.js";
export default {
  name: "materialManage",
  data() {
    return {
      materialCategory: "",
      remark: "",
      seriesName: "",
      currentpage: 1,
      currentlimit: 15,
      materialList: [],
      header: [
        ["系列编号", "construct_material_num", 120],
        ["材料系列", "construct_material_seriesName"],
        ["描述", "remarks"]
      ],
      headle: ["材料列表", "", "修改"],
      isadd: false,
      supplierList: [],
      seriesID: null,
      showlist: false,
      materialID: ""
    };
  },
  mounted() {
    this.getmaterialList();
  },
  components: {
    CaRuleTable,
    paging,
    addMaterialDialog,
    dialogTabs
  },
  methods: {
    //修改材料系列
    modifymarterial(row) {
      apiselectData({ cid: row.construct_material_seriesID }).then(res => {
        this.seriesID = row.construct_material_seriesID;
        this.materialCategory = row.construct_material_seriesName;
        this.remark = row.remarks;
        this.isadd = true;
        this.supplierList = res.data.map((item, index) => {
          return {
            id: index + 1,
            supplierId: item.construct_supplier_id,
            SupplierName: item.construct_supplier_name
          };
        });
      });
    },
    //完成提交后，关闭弹窗，刷新列表
    finishSubmit() {
      this.materialCategory = "";
      this.remark = "";
      this.seriesID = null;
      this.supplierList = [];
      this.isadd = false;
      this.getmaterialList();
    },
    //打开新增材料系列的窗口
    addmaterial() {
      this.isadd = true;
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getmaterialList();
    },
    getpage(val) {
      this.currentpage = val;
      this.getmaterialList();
    },
    getlist(row) {
      this.materialID = row.construct_material_seriesID;
      this.showlist = true;
    },
    //获取所有材料系列信息
    getmaterialList() {
      let data = {
        rows: this.currentlimit,
        page: this.currentpage,
        construct_material_seriesName: this.seriesName
      };
      apimaterialSeries(data).then(res => {
        this.materialList = res.rows;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
