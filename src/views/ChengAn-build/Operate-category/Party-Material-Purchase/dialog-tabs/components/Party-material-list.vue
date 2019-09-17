<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="材料类别">
        <el-input v-model="material_category" clearable></el-input>
      </el-form-item>
      <el-form-item label="材料名称">
        <el-input v-model="material_name" clearable></el-input>
      </el-form-item>
      <el-form-item label="材料规格">
        <el-input v-model="material_model_name" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="success" @click="isaddform">新增</el-button>
          <el-button type="danger" @click="deleteitem">删除</el-button>
          <el-button type="primary" @click="openContract"
            >新增合同工程量申请</el-button
          >
          <el-button type="primary" @click="openQuantityRecord">
            新增合同工程量记录
          </el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.6)"
      :headle="headle"
      :setselect="true"
      @setselect="getselect"
      :DataList="materialList"
      :header="header"
      @checkleave="modifyParty"
      :setheight="0.6"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setlimit="getlimit"
      @setpage="getpage"
    ></paging>
    <el-dialog
      top="8vh"
      :title="diatitle"
      :visible.sync="isadd"
      :append-to-body="true"
      width="35%"
    >
      <el-form size="mini" inline label-width="90px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="材料类别">
              <el-input
                clearable
                v-model="addform.construct_Aparty_material_category"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="材料名称">
              <el-input
                clearable
                v-model="addform.construct_Aparty_material_name"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="型号规格">
              <el-input
                clearable
                v-model="addform.construct_Aparty_material_model"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位">
              <el-input
                clearable
                v-model="addform.construct_Aparty_material_unit"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同工程量">
              <el-input
                clearable
                :readonly="
                  addform.construct_Aparty_material_num == 0 ? false : true
                "
                v-model="addform.construct_Aparty_material_num"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input
                clearable
                v-model="addform.construct_Aparty_material_remark"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label=" ">
              <el-button type="primary" @click="saveform">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      :visible.sync="isopen_ContractRecord"
      title="新增合同工程量记录"
      :append-to-body="true"
    >
      <Contract-record
        v-if="isopen_ContractRecord"
        :projectid="projectList.construct_project_id"
        type="ASupply"
      ></Contract-record>
    </el-dialog>
  </div>
</template>

<script>
import ContractRecord from "./Contract-record";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import {
  apiaPartyMaterialList,
  apisaveAParty,
  apiupdateAParty,
  apideleteAParty
} from "@/request/api.js";
export default {
  name: "PartyMaterialList",
  data() {
    return {
      total: 0,
      currentlimit: 15,
      currentpage: 1,
      material_category: "",
      material_name: "",
      material_model_name: "",
      materialList: [],
      header: [
        ["材料类别", "construct_Aparty_material_category", 100],
        ["材料名称", "construct_Aparty_material_name", 100],
        ["规格型号", "construct_Aparty_material_model"],
        ["单位", "construct_Aparty_material_unit", 80],
        [
          "合同工程量",
          "",
          "",
          "",
          [
            ["合同工程量", "construct_Aparty_material_num", 120],
            ["新增工程量", "afterAddingNum", 120]
          ]
        ],
        ["已采购数量", "sum", 120],
        ["可采购数量", "", 120],
        ["备注", "construct_Aparty_material_remark", 90]
      ],
      headle: ["修改"],
      loading: true,
      isadd: false,
      addform: {},
      diatitle: "",
      idarr: [],
      contractForm: {},
      isopenContract: false,
      isopen_ContractRecord: false
    };
  },
  components: {
    CaRuleTable,
    paging,
    ContractRecord
  },
  props: {
    projectList: Object
  },
  watch: {
    projectList() {
      this.loading = true;
      this.materialList = [];
      this.getMaterialList();
    }
  },
  mounted() {
    this.getMaterialList();
  },
  methods: {
    openQuantityRecord() {
      this.isopen_ContractRecord = true;
    },
    //打开新增合同工程量
    openContract() {
      this.$emit("openContract");
    },
    getselect(e) {
      this.idarr = e.map(item => item.construct_Aparty_material_id);
    },
    saveform() {
      if (!this.addform.construct_Aparty_material_id) {
        apisaveAParty(this.addform).then(res => {
          console.log(res);
          this.$message.success("保存成功");
        });
      } else {
        apiupdateAParty(this.addform).then(res => {
          console.log(res);
          this.$message.success("修改成功");
        });
      }
      this.isadd = false;
      this.getMaterialList();
    },
    //打开修改合同工程量窗口
    modifyParty(row) {
      console.log(row);
      this.diatitle = "修改合同工程量";
      this.isadd = true;
      this.addform = {
        construct_Aparty_material_id: row.construct_Aparty_material_id,
        construct_Aparty_material_name: row.construct_Aparty_material_name,
        construct_Aparty_material_unit: row.construct_Aparty_material_unit,
        construct_Aparty_material_category:
          row.construct_Aparty_material_category,
        construct_Aparty_material_num: row.construct_Aparty_material_num,
        construct_Aparty_material_remark: row.construct_Aparty_material_remark,
        construct_Aparty_material_constructId: this.projectList
          .construct_project_id,
        construct_Aparty_material_model: row.construct_Aparty_material_model
      };
    },
    //打开新增合同工程量窗口
    isaddform() {
      this.diatitle = "新增合同工程量";
      this.isadd = true;
      this.addform = {
        construct_Aparty_material_name: "",
        construct_Aparty_material_unit: "",
        construct_Aparty_material_category: "",
        construct_Aparty_material_num: "",
        construct_Aparty_material_remark: "",
        construct_Aparty_material_constructId: this.projectList
          .construct_project_id,
        construct_Aparty_material_model: ""
      };
    },
    //删除多行
    deleteitem() {
      this.$confirm(`确定删除吗(有问题未修复)？`)
        .then(() => {
          apideleteAParty({ ids: this.idarr }).then(res => {
            console.log(res);
          });
        })
        .catch(() => {});
    },
    query() {
      this.loading = true;
      this.getMaterialList();
    },
    getpage(val) {
      this.loading = true;
      this.currentpage = val;
      this.getMaterialList();
    },
    getlimit(val) {
      this.loading = true;
      this.currentlimit = val;
      this.getMaterialList();
    },
    getMaterialList() {
      apiaPartyMaterialList({
        construct_project_id: this.projectList.construct_project_id,
        material_category: this.material_category,
        material_name: this.material_name,
        material_model_name: this.material_model_name,
        pageSize: this.currentlimit,
        limit: this.currentpage
      }).then(res => {
        console.log(res);
        this.total = res.total;
        this.loading = false;
        this.materialList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
