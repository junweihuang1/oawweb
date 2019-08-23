<template>
  <div>
    <el-divider content-position="left">项目信息</el-divider>
    <el-row>
      <el-form inline size="mini" label-width="130px" label-position="left">
        <el-form-item label="项目名称">
          <el-input
            v-model="headform.manage_contract_name"
            readonly
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="工程地址">
          <el-input
            v-model="headform.manage_contract_address"
            readonly
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="项目经理">
          <el-input
            v-model="headform.construct_project_leader"
            readonly
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="项目经理联系方式">
          <el-input
            v-model="headform.construct_project_leaderTel"
            readonly
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-divider content-position="left">材料信息</el-divider>
    <el-row>
      <el-form inline size="mini" label-width="130px" label-position="left">
        <el-form-item label="计划日期">
          <el-date-picker
            type="date"
            style="width:100%;"
            v-model="activeForm.construct_purchase_planDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="希望送达时间">
          <el-date-picker
            type="date"
            style="width:100%;"
            v-model="activeForm.construct_purchase_arriveDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="材料计划员">
          <el-input
            @focus="openselectplanMan"
            v-model="activeForm.construct_purchase_planMan"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="复核员">
          <el-input
            @focus="openselectreviewer"
            v-model="activeForm.construct_purchase_reviewer"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input
            v-model="activeForm.construct_purchase_supplier"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商联系方式">
          <el-input
            clearable
            v-model="activeForm.construct_purchase_supplierTel"
          ></el-input>
        </el-form-item>
        <el-form-item label="材料类别" v-if="openType !== 'check'">
          <el-input
            @focus="openselectMaterialseries"
            clearable
            v-model="activeForm.construct_purchase_materialSerName"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-divider content-position="left">班组信息</el-divider>
    <el-button-group v-if="openType != 'check'">
      <el-button type="primary" size="mini" @click="additem">添加行</el-button>
      <el-button type="warning" size="mini" @click="cancel">撤销</el-button>
    </el-button-group>
    <el-table :data="entryList" border :header-cell-style="getRowClass">
      <el-table-column
        :label="item[0]"
        v-for="(item, index) in header"
        :key="index"
        :width="item[2]"
        align="center"
        :prop="item[1]"
      >
        <template slot-scope="{ row }">
          <input
            type="text"
            v-model="row[item[1]]"
            class="inputbox"
            v-if="openType !== 'check' && item[0] == '材料名称'"
            placeholder="请选择"
            @focus="openselectMaterial(row)"
          />
          <input
            type="text"
            v-model="row[item[1]]"
            class="inputbox"
            placeholder="请输入"
            v-else-if="openType !== 'check' && item[3] == 'edit'"
          />
          <span v-else>
            {{ row[item[1]] }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      v-if="openType !== 'check'"
      type="primary"
      size="mini"
      style="float:right;margin:20px 100px 20px 0;"
      @click="save"
      >保存</el-button
    >
    <div v-if="openType == 'check'">
      <el-divider content-position="left">流程线</el-divider>
      <Ca-rule-table
        :DataList="ProcessList"
        :setheight="0.3"
        :header="Process_header"
      ></Ca-rule-table>
    </div>
    <el-dialog :visible.sync="isselectMaterialseries" :append-to-body="true">
      <select-material-series
        @setSelectName="getSelectName"
        v-if="isselectMaterialseries"
      ></select-material-series>
    </el-dialog>
    <el-dialog :visible.sync="isselectMaterial" :append-to-body="true">
      <select-material
        @setSelectName="getMaterialName"
        :projectId="headform.construct_project_id"
        :materialSerId="activeForm.construct_purchase_materialSerId"
        v-if="isselectMaterial"
      ></select-material>
    </el-dialog>
    <el-dialog :visible.sync="isreviewer" :append-to-body="true">
      <select-teams
        @setSelectName="getreviewerName"
        v-if="isreviewer"
      ></select-teams>
    </el-dialog>
    <el-dialog :visible.sync="isplanMan" :append-to-body="true">
      <select-teams
        @setSelectName="getplanManName"
        v-if="isplanMan"
      ></select-teams>
    </el-dialog>
  </div>
</template>

<script>
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import selectTeams from "@/components/Ca-select/select-teams";
import selectMaterial from "@/components/Ca-select/select-material";
import selectMaterialSeries from "@/components/Ca-select/select-material-series";
import {
  apisavePurchase,
  apiNextProcess,
  apimodPurchase
} from "@/request/api.js";
export default {
  name: "projectInfor",
  data() {
    return {
      Process_header: [
        ["步骤名称", "name_", 100],
        ["相关人员", "username", 100],
        ["发生时间", "END_TIME_", 120],
        ["中心", "center_name", 100],
        ["部门", "department_name", 100],
        ["审核意见", "MESSAGE_"]
      ],
      header: [
        ["材料名称", "construct_purchase_material", 100],
        ["型号规格", "construct_purchase_model", 100],
        ["单位", "construct_purchase_unit", 80],
        ["合同工程量", "construct_purchase_quantities", 120],
        ["累计审批量", "construct_purchase_approvalNum", 120],
        ["计划采购量", "construct_purchase_applyNum", 120, "edit"],
        ["合同单价", "construct_purchase_contractPrice", 100],
        ["采购单价", "construct_purchase_purchasePrice", 100],
        ["采购小计", "construct_purchase_purchaseTotal", 100],
        ["材料品牌", "construct_purchase_brand", 100, "edit"],
        ["备注", "construct_purchase_remarks", "", "edit"]
      ],
      isselectMaterialseries: false,
      isselectMaterial: false,
      active: {},
      isreviewer: false,
      isplanMan: false
    };
  },
  props: {
    headform: Object,
    openType: String,
    entryList: Array,
    activeForm: {
      // type: Object,
      default: () => {
        return {
          construct_purchase_planDate: "", //(必填)计划日期
          construct_purchase_arriveDate: "", //(必填)希望送达时间
          construct_purchase_planMan: "", //(必填)计划员
          construct_purchase_reviewer: "", //(必填)复核员
          construct_purchase_supplier: "", //(必填)供应商
          construct_purchase_supplierTel: "", //(必填)供应商联系方式
          construct_purchase_projectId: this.headform.construct_project_id, //(必填)项目id
          construct_purchase_materialSerId: "", //(必填)材料系列id
          construct_purchase_materialSerName: "" //(必填)材料系列}}
        };
      }
    },
    ProcessList: Array
  },
  components: {
    selectMaterialSeries,
    selectMaterial,
    selectTeams,
    CaRuleTable
  },
  mounted() {
    console.log(this.headform);
  },
  methods: {
    //从子组件获取计划员姓名
    getplanManName(row) {
      this.activeForm.construct_purchase_planMan = row.username;
      this.isplanMan = false;
    },
    //从子组件获取复核员姓名
    getreviewerName(row) {
      this.activeForm.construct_purchase_reviewer = row.username;
      this.isreviewer = false;
    },
    //打开选择计划员
    openselectplanMan() {
      this.isplanMan = true;
    },
    //打开选择复核员
    openselectreviewer() {
      this.isreviewer = true;
    },
    //双击选择材料，接收子组件回调的方法。赋值给点击的行
    getMaterialName(row) {
      this.active.construct_purchase_material =
        row.construct_project_quantities_name;
      this.active.construct_purchase_model =
        row.construct_project_quantities_model;
      this.active.construct_purchase_unit =
        row.construct_project_quantities_unit;
      this.active.construct_purchase_quantities =
        row.construct_project_quantities_num;
      this.active.construct_purchase_approvalNum = row.sum;
      this.active.construct_purchase_contractPrice =
        row.construct_project_quantities_price;
      this.active.construct_purchase_purchasePrice = "";
      this.active.construct_purchase_purchaseTotal = "";
      console.log(row);
      this.isselectMaterial = false;
    },
    openselectMaterial(row) {
      this.active = row;
      this.isselectMaterial = true;
    },
    getSelectName(row) {
      this.activeForm.construct_purchase_materialSerName =
        row.construct_material_seriesName;
      this.activeForm.construct_purchase_materialSerId =
        row.construct_material_seriesID;
      this.isselectMaterialseries = false;
    },
    openselectMaterialseries() {
      this.isselectMaterialseries = true;
    },
    cancel() {
      this.entryList.pop();
    },
    additem() {
      let select = this.activeForm.construct_purchase_materialSerName;
      if (select == "") {
        this.$message.error("请先选择材料类别");
        return;
      }
      this.entryList.push({
        construct_purchase_material: "", //(必填)材料名称
        construct_purchase_model: "", //(必填)型号规格
        construct_purchase_unit: "", //(必填)单位
        construct_purchase_quantities: "", //(必填)合同工程量
        construct_purchase_approvalNum: "", //(必填)累计审批量
        construct_purchase_applyNum: "", //(必填)计划采购量
        construct_purchase_contractPrice: "", //(必填)合同单价
        construct_purchase_purchasePrice: "", //(必填)采购单价
        construct_purchase_purchaseTotal: "", //(必填)采购小计
        construct_purchase_remarks: "", //(必填)备注
        construct_purchase_brand: "", //(必填)品牌
        construct_purchase_quantitiesId: "" //(必填)合同工程量id
      });
    },
    getNextProcess() {
      apiNextProcess({
        type: "new"
      }).then(res => {
        console.log(res);
      });
    },
    save() {
      this.getNextProcess();
      this.activeForm.entry = JSON.stringify(this.entryList);
      console.log(this.activeForm);
      if (
        this.activeForm.construct_purchase_planMan == "" ||
        !this.activeForm.construct_purchase_planMan
      ) {
        this.$message.error("计划员不能为空");
        return;
      }
      if (
        this.activeForm.construct_purchase_reviewer == "" ||
        !this.activeForm.construct_purchase_reviewer
      ) {
        this.$message.error("复核员不能为空");
        return;
      }
      if (this.openType == "add") {
        console.log(this.activeForm);
        apisavePurchase(this.activeForm).then(res => {
          console.log(res);
          this.$message.success(res.msg);
          this.$emit("close");
        });
      } else {
        apimodPurchase(this.activeForm).then(res => {
          console.log(res);
        });
      }
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return `background: ${
          this.$store.state.tableColor
        };color:#fff;height:40px;padding:0px;`;
      } else {
        return "height:40px;padding:0px;";
      }
    }
  }
};
</script>

<style lang="scss">
.el-divider {
  text-shadow: 2px 2px 2px #aaa;
}
.el-table--border td:first-child .cell {
  padding-left: 0;
}
.el-table td .cell {
  padding: 0;
  line-height: 30px;
}
.el-table--small td {
  padding: 0;
}

.el-step__title {
  font-size: 12px;
}
</style>
