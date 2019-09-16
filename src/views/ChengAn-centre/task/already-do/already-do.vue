<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="流程类型">
        <el-select v-model="selectType" placeholder="请选择" clearable>
          <el-option
            v-for="(item, index) in typeList"
            :value="item.key"
            :label="item.name"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="applicant" clearable placeholder="申请人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="todoList"
      :header="header"
      :headle="headle"
      @checkleave="openheadle"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <!-- 打开办理普通采购的窗口 -->
    <el-dialog :title="openTitle" :visible.sync="openGoods" top="8vh">
      <headle-Goods
        v-if="openGoods"
        :active="active"
        openType="check"
        @close="closewin"
        :openGoods="openGoods"
      ></headle-Goods>
    </el-dialog>
    <!-- 打开办理外勤窗口 -->
    <el-dialog
      :title="openTitle"
      :visible.sync="openGoOut"
      width="35%"
      top="8vh"
    >
      <headle-go-out
        v-if="openGoOut"
        :active="active"
        openType="check"
        @close="closewin"
        :openGoOut="openGoOut"
      ></headle-go-out>
    </el-dialog>
    <!-- 打开办理增量流程窗口 -->
    <el-dialog
      :title="openTitle"
      :visible.sync="openIncrement"
      width="50%"
      top="8vh"
    >
      <headle-Increment
        v-if="openIncrement"
        :active="active"
        openType="check"
        @close="closewin"
      ></headle-Increment>
    </el-dialog>
    <el-dialog
      :title="openTitle"
      :visible.sync="openleave"
      width="50%"
      top="8vh"
    >
      <headle-leave
        v-if="openleave"
        :active="active"
        openType="check"
        @close="closewin"
      ></headle-leave>
    </el-dialog>
    <el-dialog
      :title="openTitle"
      :visible.sync="openSeal"
      width="50%"
      top="8vh"
    >
      <headle-Seal
        v-if="openSeal"
        :active="active"
        openType="check"
        @close="closewin"
      ></headle-Seal>
    </el-dialog>
    <el-dialog
      :title="openTitle"
      :visible.sync="openPurchase"
      width="50%"
      top="8vh"
    >
      <headle-Purchase
        v-if="openPurchase"
        :active="active"
        openType="check"
        @close="closewin"
      ></headle-Purchase>
    </el-dialog>

    <!--  -->
    <el-dialog
      :title="openTitle"
      :visible.sync="openInvoice"
      width="50%"
      top="8vh"
    >
      <Application-form
        v-if="openInvoice"
        @close="closewin"
        :active="active"
        :reqfundsId="reqfundsId"
        openType="check"
      ></Application-form>
    </el-dialog>
    <el-dialog
      :title="openTitle"
      :visible.sync="openCost"
      width="50%"
      top="8vh"
    >
      <headle-Cost
        v-if="openCost"
        @close="closewin"
        :active="active"
        openType="check"
      ></headle-Cost>
    </el-dialog>
    <!-- 打开项目合同申请 -->
    <el-dialog
      :title="openTitle"
      :visible.sync="openApply"
      width="50%"
      top="8vh"
    >
      <headle-contract-approve
        v-if="openApply"
        @close="closewin"
        :active="active"
        openType="check"
      ></headle-contract-approve>
    </el-dialog>
    <!-- 打开离职申请 -->
    <el-dialog
      :title="openTitle"
      :visible.sync="openQuit"
      width="70%"
      top="8vh"
    >
      <Apply-quit
        v-if="openQuit"
        @close="closewin"
        :active="active"
        openType="check"
      ></Apply-quit>
    </el-dialog>
    <!-- 打开转正申请 -->
    <el-dialog
      :title="openTitle"
      :visible.sync="openCorrent"
      width="50%"
      top="8vh"
    >
      <Apply-corrented
        v-if="openCorrent"
        @close="closewin"
        :active="active"
        openType="check"
      ></Apply-corrented>
    </el-dialog>
    <!-- 打开调动申请 -->
    <el-dialog
      :title="openTitle"
      :visible.sync="openRemove"
      width="50%"
      top="8vh"
    >
      <Apply-move
        v-if="openRemove"
        @close="closewin"
        :active="active"
        openType="check"
      ></Apply-move>
    </el-dialog>
    <!-- 打开甲供材料采购 -->
    <el-dialog
      :title="openTitle"
      :visible.sync="openaParty"
      width="50%"
      top="8vh"
    >
      <aParty-apply-purchase
        v-if="openaParty"
        :OrderId="OrderId"
        :active="active"
        openType="check"
        @close="closewin"
      ></aParty-apply-purchase>
    </el-dialog>
    <!-- 支付申请 -->
    <el-dialog
      :title="openTitle"
      :visible.sync="openPayment"
      width="75%"
      top="8vh"
    >
      <headle-payment
        v-if="openPayment"
        :active="active"
        openType="check"
        @close="closewin"
      ></headle-payment>
    </el-dialog>
  </div>
</template>

<script>
import headlePayment from "../to-do/components/headle-payment";
import aPartyApplyPurchase from "@/components/Ca-to-do/aParty-apply-purchase/aParty-apply-purchase";
import ApplyMove from "@/components/Ca-to-do/Apply-move";
import ApplyCorrented from "@/components/Ca-to-do/Apply-corrented";
import ApplyQuit from "@/components/Ca-to-do/Apply-quit";
import headleContractApprove from "../to-do/components/headle-contract-approve";
import headleCost from "../to-do/components/headle-Cost";
import ApplicationForm from "@/components/Ca-to-do/Application-form";
import headlePurchase from "../to-do/components/headle-Purchase";
import headleSeal from "../to-do/components/headle-Seal";
import headleLeave from "../to-do/components/headle-leave";
import headleIncrement from "../to-do/components/headle-Increment";
import headleGoOut from "../to-do/components/headle-go-out";
import headleGoods from "../to-do/components/headle-Goods";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import paging from "@/components/paging/paging";
import { changetime } from "@/components/global-fn/global-fn";
import { apialreadyHandleTask, apifindTaskType } from "@/request/api";
export default {
  name: "alreadyDo",
  data() {
    return {
      total: 0,
      img_src: "",
      todoList: [],
      selectType: "",
      applicant: "",
      header: [
        ["流水号", "ID_", 90],
        ["流程类型", "processName", 150],
        ["申请时间", "startTime", 150],
        ["申请人", "applicant", 120],
        ["流程实例id", "taskid", 120],
        ["步骤名称", "taskName", 130],
        ["任务到达时间", "arrivalTime", 120],
        ["办理人", "assignee", 100],
        ["状态", "status", 100],
        ["单据描述", "illustrate"]
      ],
      headle: ["查看"],
      typeList: [],
      summary: [],
      currentlimit: 15,
      currentpage: 1,
      active: {},
      openTitle: "",
      openGoods: false,
      openGoOut: false,
      openIncrement: false,
      openleave: false,
      openSeal: false,
      openPurchase: false,
      openInvoice: false,
      openCost: false,
      openApply: false,
      openQuit: false,
      openCorrent: false,
      isopenpic: false,
      openRemove: false,
      openPayment: false,
      openaParty: false,
      loading: true,
      reqfundsId: ""
    };
  },
  components: {
    CaRuleTable,
    headleGoods,
    headleGoOut,
    headleIncrement,
    headleLeave,
    headlePurchase,
    headleSeal,
    ApplicationForm,
    headleCost,
    headleContractApprove,
    ApplyQuit,
    ApplyCorrented,
    paging,
    aPartyApplyPurchase,
    ApplyMove,
    headlePayment
  },
  mounted() {
    //获取待办类型
    apifindTaskType().then(res => {
      console.log(res);
      this.typeList = res.data.map(item => {
        return {
          name: item.NAME_,
          key: item.KEY_
        };
      });
    });
    this.getReadyDoList();
  },
  methods: {
    closewin() {
      this.openGoods = false;
      this.openGoOut = false;
      this.openIncrement = false;
      this.openleave = false;
      this.openSeal = false;
      this.openPurchase = false;
      this.openInvoice = false;
      this.openCost = false;
      this.openApply = false;
      this.openQuit = false;
      this.openCorrent = false;
      this.openaParty = false;
      this.openRemove = false;
      this.openPayment = false;
      // this.getReadyDoList();
    },
    //查询
    query() {
      // console.log(this.selectType);
      // console.log(this.summary);
      // if (this.selectType == "") {
      //   this.todoList = this.summary;
      // } else {
      //   this.todoList = this.summary.filter(
      //     item => item.pdname == this.selectType
      //   );
      // }
      this.getReadyDoList();
    },
    //待办
    openheadle(row) {
      this.active = row;
      console.log(row);
      this.openTitle = row.processName;
      switch (row.processName) {
        case "[材料]-物品采购":
          this.openGoods = true;
          break;
        case "[考勤]-外勤申请":
          this.openGoOut = true;
          break;
        case "合同工程量新增":
          this.openIncrement = true;
          break;
        case "[考勤]-请假申请":
          this.openleave = true;
          break;
        case "[内部]-盖章申请":
          this.openSeal = true;
          break;
        case "材料采购申请(建设)":
          this.openPurchase = true;
          break;
        case "[资费]-开票申请":
          this.openInvoice = true;
          this.reqfundsId = this.active.BUSINESS_KEY_
            ? parseInt(this.active.BUSINESS_KEY_.split(".")[1])
            : parseInt(this.active.businessId);
          console.log(typeof this.reqfundsId);
          break;
        case "[资费]-费用申请":
          this.openCost = true;
          break;
        case "项目合同申请":
          this.openApply = true;
          break;
        case "离职申请":
          this.openQuit = true;
          break;
        case "[人事]-转正申请":
          this.openCorrent = true;
          break;
        case "[甲供]-材料采购":
          this.openaParty = true;
          this.OrderId = this.active.BUSINESS_KEY_
            ? this.active.BUSINESS_KEY_.split(".")[1]
            : this.active.businessId;
          break;
        case "劳动力分配":
          this.openRemove = true;
          break;
        case "[材料] 采购单支付申请":
          this.openPayment = true;
          break;
      }
    },
    getpage(val) {
      this.currentpage = val;
      this.getReadyDoList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getReadyDoList();
    },
    getReadyDoList() {
      let data = {
        applicant: this.applicant,
        processKey: this.selectType,
        pageSize: this.currentlimit,
        limit: this.currentpage
      };
      console.log(data);
      apialreadyHandleTask(data).then(res => {
        console.log(res);
        this.total = res.total;
        // this.summary = res.data.map(item => {
        //   item.startTime = changetime(item.startTime);
        //   return item;
        // });
        this.todoList = res.data.map(item => {
          item.startTime = changetime(item.startTime);
          item.status =
            item.status == 0 ? "审核中" : item.status == 1 ? "已结束" : "";
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
