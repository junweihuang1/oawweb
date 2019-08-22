<template>
  <div style="border:1px solid #E4E7ED;">
    <el-tabs v-model="currentActive" type="card" @tab-remove="removeTab">
      <el-tab-pane label="项目列表" name="1">
        <project-list
          :activeForm="activeForm"
          style="padding:10px;"
          @openProject="openProject"
        ></project-list>
      </el-tab-pane>
      <el-tab-pane label="项目信息" name="2" v-if="isopenProjectInfor" closable>
        <project-infor
          style="padding:10px;"
          :openType="openType"
          :activeForm="activeForm"
          :entryList="entryList"
          :headform="headform"
        ></project-infor>
      </el-tab-pane>
      <el-tab-pane label="采购列表" name="3" v-if="isopenPurchase" closable>
        <purchase-list
          @openaddPurchase="openaddPurchase"
          style="padding:10px;"
          :activeForm="headform"
        ></purchase-list>
      </el-tab-pane>
      <el-tab-pane
        label="新增采购申请"
        name="4"
        v-if="isopenAddPurchase"
        closable
      >
        <Apply-purchase
          style="padding:10px;"
          :entryList="Purchase_entryList"
          :headform="headform"
          @close="closeApply"
          :openType="ApplyopenType"
        ></Apply-purchase>
      </el-tab-pane>
      <el-tab-pane label="合同工程量" name="5" v-if="isopenContract" closable>
        <Party-material-list
          v-if="isopenContract"
          @openContract="openContract"
          style="padding:10px;"
          :projectList="headform"
        ></Party-material-list>
      </el-tab-pane>
      <el-tab-pane
        label="增加合同工程量"
        name="6"
        v-if="isopenAddContract"
        closable
      >
        <Contract-quantity
          @close="closeQuantity"
          style="padding:10px;"
          :projectList="headform"
        ></Contract-quantity>
      </el-tab-pane>
      <el-tab-pane label="请款进度" name="7" v-if="isopenRequest" closable>
        <echarts
          v-if="isopenRequest"
          style="padding:10px;"
          @openApplyForm="openApplyForm"
          :projectList="headform"
        ></echarts>
      </el-tab-pane>
      <el-tab-pane label="开发票申请表" name="8" v-if="isopenApply" closable>
        <Application-form
          v-if="isopenApply"
          style="padding:10px;"
          :reqfundsId="reqfundsId"
        ></Application-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ApplicationForm from "./components/request-funds/Application-form";
import echarts from "./components/request-funds/echarts";
import ContractQuantity from "./components/Contract-quantity/Contract-quantity";
import PartyMaterialList from "./components/Contract-quantity/Party-material-list";
import ApplyPurchase from "./components/purchase-list/Apply-purchase";
import purchaseList from "./components/purchase-list/purchase-list";
import ProjectInfor from "./components/project-list/project-infor";
import ProjectList from "./components/project-list/project-list";
import { apigetTeamByProject, apiContractInvoice } from "@/request/api.js";
export default {
  name: "dialogTabs",
  data() {
    return {
      currentActive: "1",
      isopenProjectInfor: false,
      isopenPurchase: false,
      isopenAddPurchase: false,
      isopenContract: false,
      isopenAddContract: false,
      isopenRequest: false,
      isopenApply: false,
      entryList: [],
      headform: Object,
      openType: "",
      projectId: Number,
      Purchase_entryList: [], //采购申请中的表格数组
      ApplyopenType: "",
      reqfundsId: Number
    };
  },
  props: {
    activeForm: Object
  },
  components: {
    ProjectList,
    ProjectInfor,
    purchaseList,
    ApplyPurchase,
    PartyMaterialList,
    ContractQuantity,
    echarts,
    ApplicationForm
  },
  methods: {
    openApplyForm(id) {
      this.isopenApply = false;
      this.$nextTick(() => {
        this.isopenApply = true;
      });
      this.currentActive = "8";
      this.reqfundsId = id;
    },
    removeTab(e) {
      console.log(e);
    },
    //关闭新增合同工程量
    closeQuantity() {
      this.isopenAddContract = false;
      this.currentActive = "5";
    },
    //打开新增合同工程量
    openContract() {
      this.isopenAddContract = true;
      this.currentActive = "6";
    },
    closeApply() {
      this.isopenAddPurchase = false;
      this.currentActive = "3";
      this.isopenPurchase = false;
      this.$nextTick(() => {
        this.isopenPurchase = true;
      });
    },
    //打開采购申请列表
    openaddPurchase() {
      this.currentActive = "4";
      this.isopenProjectInfor = false;
      this.isopenAddPurchase = true;
      this.Purchase_entryList = [];
      this.ApplyopenType = "add";
    },
    openProject([type, val]) {
      switch (type) {
        case "request":
          this.isopenContract = false;
          this.isopenProjectInfor = false;
          this.isopenPurchase = false;
          this.isopenAddPurchase = false;
          this.isopenRequest = false;
          this.$nextTick(() => {
            this.isopenRequest = true;
          });
          this.currentActive = "7";
          this.headform = val;
          break;
        case "contract":
          this.isopenContract = false;
          this.isopenProjectInfor = false;
          this.isopenPurchase = false;
          this.isopenAddPurchase = false;
          this.$nextTick(() => {
            this.isopenContract = true;
          });
          this.currentActive = "5";
          this.headform = val;
          break;
        case "purchase":
          this.isopenProjectInfor = false;
          this.isopenPurchase = false;
          this.isopenAddPurchase = false;
          this.$nextTick(() => {
            this.isopenPurchase = true;
          });
          this.currentActive = "3";
          this.headform = val;
          break;
        case "modify":
          apigetTeamByProject({
            construct_project_id: val.construct_project_id
          }).then(res => {
            console.log(res);
            this.isopenProjectInfor = false;
            this.$nextTick(() => {
              this.isopenProjectInfor = true;
            });
            this.openType = "modify";
            this.currentActive = "2";
            this.isopenPurchase = false;
            this.isopenAddPurchase = false;
            this.entryList = res.entry.map(item => {
              switch (item.construct_project_workTeam_category) {
                case 1:
                  item.construct_project_workTeam_category = "预埋";
                  break;
                case 2:
                  item.construct_project_workTeam_category = "消防水";
                  break;
                case 3:
                  item.construct_project_workTeam_category = "消防电";
                  break;
                case 4:
                  item.construct_project_workTeam_category = "防排烟";
                  break;
                case 5:
                  item.construct_project_workTeam_category = "消防水电";
                  break;
              }
              return item;
            });
            this.headform = res.head[0];
          });

          break;
        //查看项目
        case "check":
          apigetTeamByProject({
            construct_project_id: val.construct_project_id
          }).then(res => {
            console.log(res);
            this.isopenProjectInfor = false;
            this.$nextTick(() => {
              this.isopenProjectInfor = true;
            });
            this.isopenPurchase = false;
            this.isopenAddPurchase = false;
            this.openType = "check";
            this.currentActive = "2";
            this.entryList = res.entry.map(item => {
              switch (item.construct_project_workTeam_category) {
                case 1:
                  item.construct_project_workTeam_category = "预埋";
                  break;
                case 2:
                  item.construct_project_workTeam_category = "消防水";
                  break;
                case 3:
                  item.construct_project_workTeam_category = "消防电";
                  break;
                case 4:
                  item.construct_project_workTeam_category = "防排烟";
                  break;
                case 5:
                  item.construct_project_workTeam_category = "消防水电";
                  break;
              }
              return item;
            });
            this.headform = res.head[0];
            console.log(this.headform);
          });

          break;
        //查看项目
        case "add":
          this.openType = "add";
          this.entryList = [];
          this.isopenProjectInfor = false;
          this.isopenPurchase = false;
          this.isopenAddPurchase = false;
          this.headform = {};
          this.$nextTick(() => {
            this.isopenProjectInfor = true;
          });
          this.currentActive = "2";
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
