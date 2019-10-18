<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="材料系列">
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
      @checkleave="checkitem"
      @edit="modifyParty"
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
      v-dialogDrag
      top="8vh"
      :title="diatitle"
      :visible.sync="isadd"
      :append-to-body="true"
      width="35%"
    >
      <el-form size="mini" inline label-width="90px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="材料名称">
              <el-input
                clearable
                readonly
                placeholder="请选择"
                @focus="openSelectMaterial"
                v-model="addform.construct_project_quantities_name"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="型号规格">
              <el-input
                clearable
                :readonly="opentype === 'modify' ? true : false"
                v-model="addform.construct_project_quantities_model"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主材数量">
              <el-input
                clearable
                :readonly="isedit"
                v-model="addform.construct_project_quantities_num"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="辅材数量">
              <el-input
                clearable
                v-model="addform.construct_project_quantities_auxiliaryNum"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位">
              <el-input
                clearable
                :readonly="opentype === 'modify' ? true : false"
                v-model="addform.construct_project_quantities_unit"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同单价">
              <el-input
                clearable
                v-model="addform.construct_project_quantities_price"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input
                clearable
                v-model="addform.construct_project_quantities_remarks"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="opentype !== 'check'">
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
        type="BSupply"
      ></Contract-record>
    </el-dialog>
    <el-dialog
      :visible.sync="isopenMaterial"
      title="选择材料11"
      :append-to-body="true"
    >
      <select-material
        v-if="isopenMaterial"
        @setSelectName="getMaterialName"
      ></select-material>
    </el-dialog>
  </div>
</template>

<script>
import selectMaterial from "./select-material";
import ContractRecord from "./Contract-record";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import {
  apiContractQuantity,
  apisaveQuantities,
  apimodQuantities
} from "@/request/api.js";
export default {
  name: "PartyMaterialList",
  data() {
    return {
      total: 0,
      loading: true,
      currentlimit: 15,
      currentpage: 1,
      material_category: "",
      material_name: "",
      material_model_name: "",
      materialList: [],
      header: [
        ["材料系列", "construct_material_seriesName", 100],
        ["材料名称", "construct_material_name", 100],
        ["规格型号", "construct_material_model_name", 130],
        ["单位", "construct_material_model_unit", 80],
        [
          "主材数量",
          "",
          "",
          "",
          [
            ["数量", "construct_project_quantities_num", 100],
            ["新增数量", "afterAddingNum", 100]
          ]
        ],
        ["辅材数量", "construct_project_quantities_auxiliaryNum", 100],
        ["已采购量", "purNum", 100],
        ["合同单价", "construct_project_quantities_price", 120],
        ["备注", "construct_project_quantities_remarks"]
      ],
      headle: ["查看", "", "修改"],
      isadd: false,
      addform: {},
      diatitle: "",
      idarr: [],
      contractForm: {},
      isopenContract: false,
      isopen_ContractRecord: false,
      isopenMaterial: false,
      opentype: "",
      isedit: false
    };
  },
  components: {
    CaRuleTable,
    paging,
    ContractRecord,
    selectMaterial
  },
  props: {
    projectList: Object
  },
  watch: {
    //打卡选择材料
    projectList() {
      this.materialList = [];
      this.getMaterialList();
    }
  },
  created() {
    this.getMaterialList();
  },
  methods: {
    query() {
      this.currentpage = 1;
      this.currentlimit = 15;
      this.getMaterialList();
    },
    //获取选择的材料信息，赋值到要保存的合同工程量
    getMaterialName(row) {
      this.addform.construct_project_quantities_name =
        row.construct_material_name;
      this.addform.construct_project_quantities_model =
        row.construct_material_model_name;
      this.addform.construct_project_quantities_unit =
        row.construct_material_model_unit;
      this.addform.construct_project_quantities_modelId =
        row.construct_material_model_id;
      this.isopenMaterial = false;
    },
    //打开材料选择
    openSelectMaterial() {
      this.isopenMaterial = true;
    },
    //打开合同工程量记录
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
      this.$confirm(`确定提交吗？`)
        .then(() => {
          if (!this.addform.construct_project_quantities_id) {
            apisaveQuantities(this.addform).then(res => {
              this.$message.success(res.msg);
            });
          } else {
            apimodQuantities(this.addform).then(res => {
              this.$message.success(res.msg);
            });
          }
          this.isadd = false;
          this.getMaterialList();
        })
        .catch(() => {});
    },
    checkitem(row) {
      this.isadd = true;
      this.diatitle = "查看合同工程量";
      this.opentype = "check";
      this.isedit = row.construct_project_quantities_num === 0 ? false : true;
      this.addform = {
        construct_project_quantities_id: row.construct_project_quantities_id,
        construct_project_quantities_conId: this.projectList
          .construct_project_id,
        construct_project_quantities_name: row.construct_material_name, //(必填)材料名称
        construct_project_quantities_model: row.construct_material_model_name, //(型号规格)
        construct_project_quantities_num: row.construct_project_quantities_num, //(必填)主材数量
        construct_project_quantities_auxiliaryNum:
          row.construct_project_quantities_auxiliaryNum, //(必填)辅材数量
        construct_project_quantities_unit: row.construct_material_model_unit, //(必填)单位
        construct_project_quantities_price:
          row.construct_project_quantities_price, //(必填)单价
        construct_project_quantities_remarks:
          row.construct_project_quantities_remarks, //(必填)备注
        construct_project_quantities_modelId:
          row.construct_project_quantities_modelId //(必填)规格id
      };
    },
    //打开修改合同工程量窗口
    modifyParty(row) {
      console.log(row);
      this.opentype = "modify";
      this.diatitle = "修改合同工程量";
      this.isadd = true;
      //当主材料不为O时禁止编辑
      this.isedit = row.construct_project_quantities_num === 0 ? false : true;
      this.addform = {
        construct_project_quantities_id: row.construct_project_quantities_id,
        construct_project_quantities_conId: this.projectList
          .construct_project_id,
        construct_project_quantities_name: row.construct_material_name, //(必填)材料名称
        construct_project_quantities_model: row.construct_material_model_name, //(型号规格)
        construct_project_quantities_num: row.construct_project_quantities_num, //(必填)主材数量
        construct_project_quantities_auxiliaryNum:
          row.construct_project_quantities_auxiliaryNum, //(必填)辅材数量
        construct_project_quantities_unit: row.construct_material_model_unit, //(必填)单位
        construct_project_quantities_price:
          row.construct_project_quantities_price, //(必填)单价
        construct_project_quantities_remarks:
          row.construct_project_quantities_remarks, //(必填)备注
        construct_project_quantities_modelId:
          row.construct_project_quantities_modelId //(必填)规格id
      };
      console.log(this.isedit);
    },
    //打开新增合同工程量窗口
    isaddform() {
      this.opentype = "";
      this.diatitle = "新增合同工程量";
      this.isadd = true;
      this.addform = {
        construct_project_quantities_name: "", //(必填)材料名称
        construct_project_quantities_model: "", //(型号规格)
        construct_project_quantities_num: 0, //(必填)主材数量
        construct_project_quantities_auxiliaryNum: 0, //(必填)辅材数量
        construct_project_quantities_unit: "", //(必填)单位
        construct_project_quantities_price: 0, //(必填)单价
        construct_project_quantities_remarks: "", //(必填)备注
        construct_project_quantities_conId: this.projectList
          .construct_project_id, //(必填)项目id
        construct_project_quantities_modelId: "" //(必填)规格id
      };
    },
    getpage(val) {
      this.currentpage = val;
      this.getMaterialList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getMaterialList();
    },
    getMaterialList() {
      apiContractQuantity({
        construct_project_id: this.projectList.construct_project_id,
        construct_material_seriesName: this.material_category,
        construct_project_quantities_name: this.material_name,
        construct_project_quantities_model: this.material_model_name,
        pageSize: this.currentlimit,
        limit: this.currentpage
      }).then(res => {
        console.log(res);
        this.loading = false;
        this.total = res.total;
        this.materialList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
