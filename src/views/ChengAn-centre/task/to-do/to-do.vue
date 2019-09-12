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
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="todoList"
      :header="header"
      :headle="headle"
      @checkleave="openheadle"
      @edit="openpic"
    ></Ca-rule-table>
    <!-- 打开办理普通采购的窗口 -->
    <el-dialog :title="openTitle" :visible.sync="openGoods" top="8vh">
      <headle-Goods
        v-if="openGoods"
        :active="active"
        openType="headle"
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
        openType="headle"
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
        openType="headle"
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
        openType="headle"
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
        openType="headle"
        @close="closewin"
      ></headle-Seal>
    </el-dialog>
    <el-dialog
      :title="openTitle"
      :visible.sync="openPurchase"
      width="75%"
      top="8vh"
    >
      <headle-Purchase
        v-if="openPurchase"
        :active="active"
        openType="headle"
        @close="closewin"
      ></headle-Purchase>
    </el-dialog>
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
        openType="headle"
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
        openType="headle"
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
        openType="headle"
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
        openType="headle"
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
        openType="headle"
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
        openType="headle"
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
        openType="headle"
        @close="closewin"
      ></aParty-apply-purchase>
    </el-dialog>
    <!-- 打开流程图 -->
    <el-dialog :visible.sync="isopenpic" title="流程图" width="70%">
      <el-image :src="img_src" v-if="isopenpic" v-loading="loading"></el-image>
    </el-dialog>
  </div>
</template>

<script>
import ApplyMove from "@/components/Ca-to-do/Apply-move";
import ApplyCorrented from "@/components/Ca-to-do/Apply-corrented";
import ApplyQuit from "@/components/Ca-to-do/Apply-quit";
import headleContractApprove from "./components/headle-contract-approve";
import headleCost from "./components/headle-Cost";
import ApplicationForm from "@/components/Ca-to-do/Application-form";
import aPartyApplyPurchase from "@/components/Ca-to-do/aParty-apply-purchase/aParty-apply-purchase";
import headlePurchase from "./components/headle-Purchase";
import headleSeal from "./components/headle-Seal";
import headleLeave from "./components/headle-leave";
import headleIncrement from "./components/headle-Increment";
import headleGoOut from "./components/headle-go-out";
import headleGoods from "./components/headle-Goods";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { changetime } from "@/components/global-fn/global-fn";
import http from "@/request/http";
import {
  apifindTaskLists,
  apifindTaskType,
  apipersonManagem_s
} from "@/request/api";
import { type } from "os";
export default {
  name: "todo",
  data() {
    return {
      img_src: "",
      todoList: [],
      selectType: "",
      header: [
        ["流水号", "ID_", 90],
        ["流程类型", "pdname", 150],
        ["步骤名称", "NAME_", 150],
        ["任务创建时间", "CREATE_TIME_", 150],
        ["流程实例id", "PROC_INST_ID_", 120],
        ["申请人", "applicant", 120],
        ["单据描述", "illustrate"]
      ],
      headle: ["办理", "", "流程图"],
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
      openaParty: false,
      openRemove: false,
      loading: true,
      OrderId: "",
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
    aPartyApplyPurchase,
    ApplyMove
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
    this.getToDoList();
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
      this.getToDoList();
    },
    //查询
    query() {
      this.getToDoList();
      // if (this.selectType == "") {
      //   this.todoList = this.summary;
      // } else {
      //   this.todoList = this.summary.filter(
      //     item => item.pdname == this.selectType
      //   );
      // }
    },
    //打开流程图
    loadimg(Event) {
      console.log(Event);
    },
    openpic(row) {
      this.img_src = `${http.base_url}personManagem_s?processInstanceId=${
        row.PROC_INST_ID_
      }`;
      this.isopenpic = true;
      this.loading = false;
      // console.log(row);
      // apipersonManagem_s({ processInstanceId: row.PROC_INST_ID_ }).then(res => {
      //   let img = document.createElement("img");
      //   img.src = window.URL.createObjectURL(
      //     new Blob([res], { type: "image/jpeg" })
      //   ).substring(5);
      //   img.onload = function() {
      //     window.URL.revokeObjectURL(this.src);
      //   };
      //   console.log(img);
      //   document.body.appendChild(img);
      // });
    },
    //待办
    openheadle(row) {
      this.active = row;
      console.log(row);
      this.openTitle = row.pdname;
      switch (row.pdname) {
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
      }
    },
    getToDoList() {
      let data = {
        pdkey: this.selectType
      };
      apifindTaskLists(data).then(res => {
        console.log(res);
        this.todoList = res.map(item => {
          item.CREATE_TIME_ = changetime(item.CREATE_TIME_);
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
