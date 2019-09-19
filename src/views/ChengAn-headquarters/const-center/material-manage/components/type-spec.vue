<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="型号规格">
        <el-input v-model="SpecName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="success" @click="openSpecWin">新增规格</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :setheight="0.6"
      :DataList="SpecList"
      :header="header"
      :headle="headle"
      @checkleave="modify"
      @delete="deleteitem"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      :total="15"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog :visible.sync="isopen" width="15%" :append-to-body="true">
      <el-form size="mini">
        <el-form-item label="型号名称">
          <el-input v-model="addform.model_name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addform.model_remarks"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="addform.model_unit"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="saveSpec">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import {
  apimaterialhome,
  apieditMaterial,
  apideleteMaterial
} from "@/request/api.js";
export default {
  name: "TypeSpec",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      SpecName: "",
      SpecList: [],
      header: [
        ["型号编号", "construct_materail_model_num"],
        ["型号规格", "construct_material_model_name"],
        ["材料名称", "construct_material_name"],
        ["备注", "construct_material_model_remarks"],
        ["单位", "construct_material_model_unit"]
      ],
      headle: ["修改规格", "删除"],
      addform: {},
      isopen: false
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  props: {
    material_id: String
  },
  watch: {
    material_id() {
      this.getSpecList();
    }
  },
  mounted() {
    this.getSpecList();
  },
  methods: {
    query() {
      this.currentlimit = 15;
      this.currentpage = 1;
      this.getSpecList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getSpecList();
    },
    getpage(val) {
      this.currentpage = val;
      this.getSpecList();
    },
    //删除
    deleteitem(row) {
      console.log(row);
      this.$confirm(`是否要删除${row.construct_material_model_name}的规格`)
        .then(() => {
          apideleteMaterial({
            menuids: row.construct_material_model_id
          }).then(res => {
            console.log(res);
            this.getSpecList();
          });
        })
        .catch(() => {});
    },
    //修改型号规格
    modify(row) {
      console.log(row);
      this.addform = {
        model_name: row.construct_material_model_name,
        model_remarks: row.construct_material_model_remarks,
        model_unit: row.construct_material_model_unit,
        model_parentid: this.material_id,
        model_id: row.construct_material_model_id,
        construct_materail_model_num: ""
      };
      this.isopen = true;
    },
    //提交
    saveSpec() {
      console.log(this.addform);
      apieditMaterial(this.addform).then(res => {
        console.log(res);
        this.getSpecList();
        this.isopen = false;
      });
    },
    openSpecWin() {
      this.addform = {
        model_name: "",
        model_remarks: "",
        model_unit: "",
        model_parentid: this.material_id,
        model_id: "",
        construct_materail_model_num: ""
      };
      this.isopen = true;
    },
    //获取指定材料的所有规格信息
    getSpecList() {
      apimaterialhome({
        rows: this.currentlimit,
        page: this.currentpage,
        construct_material_id: this.material_id,
        construct_material_model_name: this.SpecName
      }).then(res => {
        console.log(res);
        this.SpecList = res.rows;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
