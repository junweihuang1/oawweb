<template>
  <div style="border:1px solid #E4E7ED;">
    <el-tabs v-model="currentActive" type="card" @tab-remove="removeTab">
      <el-tab-pane label="项目列表" name="1">
        <project-list
          :activeForm="activeForm"
          v-if="isreload"
          style="padding:10px;"
          @openProject="openProject"
        ></project-list>
      </el-tab-pane>
      <el-tab-pane label="项目信息" name="2" v-if="isopen[0]" closable>
        <project-infor
          style="padding:10px;"
          :openType="openType"
          @close="closeInfor"
          :activeForm="activeForm"
          :entryList="entryList"
          :headform="headform"
        ></project-infor>
      </el-tab-pane>
      <el-tab-pane label="采购列表" name="3" v-if="isopen[1]" closable>
        <purchase-list
          @render="render"
          @openaddPurchase="openaddPurchase"
          @opencheckPurchase="opencheckPurchase"
          @openeditPurchase="openeditPurchase"
          style="padding:10px;"
          :activeForm="headform"
        ></purchase-list>
      </el-tab-pane>
      <el-tab-pane :label="pruchase_title" name="4" v-if="isopen[2]" closable>
        <Apply-purchase
          style="padding:10px;"
          :entryList="Purchase_entryList"
          :headform="headform"
          :activeForm="headform2"
          :ProcessList="ProcessList"
          @close="closeApply"
          :openType="ApplyopenType"
        ></Apply-purchase>
      </el-tab-pane>
      <el-tab-pane label="合同工程量" name="5" v-if="isopen[3]" closable>
        <Party-material-list
          v-if="isopen[3]"
          @openContract="openContract"
          style="padding:10px;"
          :projectList="headform"
        ></Party-material-list>
      </el-tab-pane>
      <el-tab-pane label="增加合同工程量" name="6" v-if="isopen[4]" closable>
        <Contract-quantity
          @close="closeQuantity"
          style="padding:10px;"
          openType="add"
          :projectList="headform"
        ></Contract-quantity>
      </el-tab-pane>
      <el-tab-pane label="请款进度" name="7" v-if="isopen[5]" closable>
        <echarts
          v-if="isopen[5] && isreload"
          style="padding:10px;"
          @openApplyForm="openApplyForm"
          @printApplyForm="printApplyForm"
          :projectList="headform"
        ></echarts>
      </el-tab-pane>
      <el-tab-pane label="开发票申请表" name="8" v-if="isopen[6]" closable>
        <Application-form
          v-if="isopen[6]"
          style="padding:10px;"
          @close="closeApplication"
          :reqfundsId="reqfundsId"
          :openType="ApplyFormopenType"
        ></Application-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ApplicationForm from "@/components/Ca-to-do/Application-form";
import echarts from "./components/request-funds/echarts";
import ContractQuantity from "@/components/Ca-to-do/Contract-quantity/Contract-quantity";
import PartyMaterialList from "@/components/Ca-to-do/Contract-quantity/Party-material-list";
import ApplyPurchase from "@/components/Ca-to-do/Apply-purchase/Apply-purchase";
import purchaseList from "./components/purchase-list/purchase-list";
import ProjectInfor from "./components/project-list/project-infor";
import ProjectList from "./components/project-list/project-list";
import { apigetTeamByProject, apigetPurchase } from "@/request/api.js";
import { changetime } from "@/components/global-fn/global-fn";
export default {
  name: "dialogTabs",
  data() {
    return {
      currentActive: "1",
      isopen: [false, false, false, false, false, false, false],
      entryList: [],
      headform: {},
      openType: "",
      projectId: Number,
      Purchase_entryList: [], //采购申请中的表格数组
      ApplyopenType: "",
      reqfundsId: Number,
      ApplyFormopenType: "",
      ProcessList: [],
      headform2: {},
      isreload: true,
      pruchase_title: ""
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
    //流程启动成功后转跳待办事项
    render() {
      this.$emit("render");
    },
    getNext(Ind) {
      this.isopen = this.isopen.map((item, index) => {
        if (index == Ind) {
          item = true;
        }
        return item;
      });
    },
    getopenList() {
      this.isopen = this.isopen.map(item => {
        item = false;
        return item;
      });
    },
    printApplyForm(id) {
      this.isopen = [false, false, false, false, false, true, false];
      this.$nextTick(() => {
        this.isopen = [false, false, false, false, false, true, true];
      });
      this.currentActive = "8";
      this.reqfundsId = id;
      this.ApplyFormopenType = "add";
    },
    //打开开票申请表
    openApplyForm(id) {
      this.isopen = [false, false, false, false, false, true, false];
      this.$nextTick(() => {
        this.isopen = [false, false, false, false, false, true, true];
      });
      this.currentActive = "8";
      this.reqfundsId = id;
      this.ApplyFormopenType = "check";
    },
    //关闭标签
    removeTab(e) {
      this.isopen[e - 2] = false;
      //先把当前点击标签默认为1，若还有打开的标签，则点击标签为该标签
      this.currentActive = "1";
      this.isopen.forEach((item, index) => {
        if (item === true) {
          this.currentActive = index + 2 + "";
        }
      });
    },
    //关闭新增合同工程量
    closeQuantity() {
      this.isopen[4] = false;
      this.currentActive = "1";
      this.isopen.forEach((item, index) => {
        if (item === true) {
          this.currentActive = index + 2 + "";
        }
      });
    },
    //关闭项目信息窗口
    closeInfor() {
      this.currentActive = "1";
      this.isopen[0] = false;
      this.isreload = false;
      this.$nextTick(() => {
        this.isreload = true;
      });
      this.isopen.forEach((item, index) => {
        if (item === true) {
          this.currentActive = index + 2 + "";
        }
      });
    },
    closeApplication() {
      this.currentActive = "1";
      this.isopen[6] = false;
      this.isreload = false;
      this.$nextTick(() => {
        this.isreload = true;
      });
      this.isopen.forEach((item, index) => {
        if (item === true) {
          this.currentActive = index + 2 + "";
        }
      });
    },
    //打开新增合同工程量
    openContract() {
      this.isopen[4] = true;
      this.currentActive = "6";
    },
    closeApply() {
      this.currentActive = "3";
      this.isopen = [false, false, false, false, false, false, false];
      this.$nextTick(() => {
        this.isopen = [false, true, false, false, false, false, false];
      });
    },
    //打开修改采购单
    openeditPurchase(id) {
      this.pruchase_title = "修改采购申请";
      this.currentActive = "4";
      apigetPurchase({ construct_purchase_id: id }).then(res => {
        // this.headform = res.projectInfo;
        console.log(res);
        this.Purchase_entryList = res.purchaseEntry;
        if (res.hisComment != null) {
          this.ProcessList = res.hisComment.map(item => {
            item.END_TIME_ = item.END_TIME_ ? changetime(item.END_TIME_) : "";
            return item;
          });
        }

        this.headform2 = res.purchaseHead;
      });
      this.ApplyopenType = "edit";
      this.isopen[2] = true;
    },
    //打开查看采购单
    opencheckPurchase(id) {
      this.pruchase_title = "查看采购申请";
      this.currentActive = "4";
      this.ApplyopenType = "check";
      this.isopen[2] = true;
      apigetPurchase({ construct_purchase_id: id }).then(res => {
        this.Purchase_entryList = res.purchaseEntry;
        this.ProcessList = res.hisComment.map(item => {
          item.END_TIME_ = item.END_TIME_ ? changetime(item.END_TIME_) : "";
          return item;
        });
        this.headform2 = res.purchaseHead;
      });
    },
    //打開采购申请列表
    openaddPurchase() {
      this.pruchase_title = "新增采购申请";
      this.currentActive = "4";
      this.ApplyopenType = "add";
      this.isopen[2] = true;
      this.Purchase_entryList = [];
      // this.headform = {};
      this.ProcessList = [];
      this.headform2 = {
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
    },
    openProject([type, val]) {
      switch (type) {
        case "request":
          this.isopen = [false, false, false, false, false, false, false];
          this.$nextTick(() => {
            this.isopen = [false, false, false, false, false, true, false];
          });
          this.currentActive = "7";
          this.headform = val;
          break;
        case "contract":
          this.getopenList();
          this.isopen[3] = true;
          this.currentActive = "5";
          this.headform = val;
          break;
        case "purchase":
          this.getopenList();
          this.isopen = [false, false, false, false, false, false, false];
          this.$nextTick(() => {
            this.isopen = [false, true, false, false, false, false, false];
          });
          this.currentActive = "3";
          this.headform = val;
          break;
        case "modify":
          apigetTeamByProject({
            construct_project_id: val.construct_project_id
          }).then(res => {
            console.log(res);
            this.getopenList();
            this.openType = "modify";
            this.currentActive = "2";
            this.entryList = res.entry;
            this.isopen[0] = true;
            this.headform = res.head[0];
            this.headform.depName = this.activeForm.constuct_project_dep_name;
          });

          break;
        //查看项目
        case "check":
          apigetTeamByProject({
            construct_project_id: val.construct_project_id
          }).then(res => {
            this.getopenList();
            this.isopen[0] = true;
            this.openType = "check";
            this.currentActive = "2";
            this.entryList = res.entry;
            this.headform = res.head[0];
            this.headform.depName = this.activeForm.constuct_project_dep_name;
          });

          break;
        //查看项目
        case "add":
          this.openType = "add";
          this.entryList = [];
          this.getopenList();
          this.isopen[0] = true;
          this.headform = {};
          this.currentActive = "2";
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
