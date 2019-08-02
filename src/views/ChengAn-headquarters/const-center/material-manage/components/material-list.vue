<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item label="材料名称">
        <el-input v-model="materialName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="getmaterialList">查询</el-button>
          <el-button type="success" @click="addmaterial">新增材料</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      style="width:70%;"
      :setheight="0.6"
      :DataList="materialList"
      :header="header"
      :headle="headle"
      @checkleave="getModel"
      @edit="modify"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      :total="15"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog :visible.sync="isadd" width="15%" :append-to-body="true">
      <el-form size="mini">
        <el-form-item label="材料名称">
          <el-input v-model="addform.material_name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="addform.material_remarks"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitmaterial">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apimaterialList, apimaterialset } from "@/request/api.js";
export default {
  name: "materialList",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      materialName: "",
      materialList: [],
      header: [
        ["材料编号", "construct_material_num"],
        ["材料名称", "construct_material_name"],
        ["描述", "construct_material_remarks"]
      ],
      headle: ["型号规格", "", "修改材料"],
      isadd: false,
      addform: {}
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  props: {
    seriesID: Number
  },
  watch: {
    seriesID() {
      this.getmaterialList();
    }
  },
  mounted() {
    this.getmaterialList();
  },
  methods: {
    //提交材料
    submitmaterial() {
      apimaterialset(this.addform).then(res => {
        console.log(res);
        this.isadd = false;
        this.getmaterialList();
      });
    },
    //获取当前每页数量
    getlimit(val) {
      this.currentlimit = val;
      this.getmaterialList();
    },
    //获取当前页数
    getpage(val) {
      this.currentpage = val;
      this.getmaterialList();
    },
    addmaterial() {
      this.addform = {
        material_id: "",
        material_name: "",
        material_remarks: "",
        construct_material_num: "",
        seriesID: this.seriesID
      };
      this.isadd = true;
    },
    modify(row) {
      this.addform = {
        material_id: row.construct_material_id,
        material_name: row.construct_material_name,
        material_remarks: row.construct_material_remarks,
        construct_material_num: row.construct_material_num,
        seriesID: this.seriesID
      };
      this.isadd = true;
    },
    //型号规格方法
    getModel(row) {
      console.log(row);
      this.$emit("setMaterialId", row.construct_material_id);
    },
    //获取材料列表方法
    getmaterialList() {
      let data = {
        rows: this.currentlimit,
        page: this.currentpage,
        construct_material_seriesID: this.seriesID,
        construct_material_name: this.materialName
      };
      apimaterialList(data).then(res => {
        console.log(res);
        this.materialList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
