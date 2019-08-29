<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="流程类型">
        <el-select v-model="selectType" placeholder="请选择" clearable>
          <el-option
            v-for="(item, index) in typeList"
            :value="item"
            :label="item"
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
      width="50%"
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
  </div>
</template>

<script>
import ApplicationForm from "@/components/Ca-to-do/Application-form";
import headlePurchase from "./components/headle-Purchase";
import headleSeal from "./components/headle-Seal";
import headleLeave from "./components/headle-leave";
import headleIncrement from "./components/headle-Increment";
import headleGoOut from "./components/headle-go-out";
import headleGoods from "./components/headle-Goods";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { changetime } from "@/components/global-fn/global-fn";
import {
  apiFindTaskList,
  apifindTaskType,
  apipersonManagem_s
} from "@/request/api";
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
        ["流程实例id", "EXECUTION_ID_", 120],
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
    ApplicationForm
  },
  mounted() {
    //获取待办类型
    apifindTaskType().then(res => {
      console.log(res);
      this.typeList = res.data.map(item => {
        return item.NAME_;
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
      this.getToDoList();
    },
    //查询
    query() {
      if (this.selectType == "") {
        this.todoList = this.summary;
      } else {
        this.todoList = this.summary.filter(
          item => item.pdname == this.selectType
        );
      }
    },
    //打开流程图
    openpic(row) {
      console.log(row);
      apipersonManagem_s({ processInstanceId: row.PROC_INST_ID_ }).then(res => {
        // console.log(res);
        this.img_src = res;
      });
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
      }
    },
    getToDoList() {
      apiFindTaskList({
        process_name: this.selectType,
        pageSize: this.currentlimit,
        limit: this.currentpage
      }).then(res => {
        console.log(res);
        this.summary = res.map(item => {
          item.CREATE_TIME_ = changetime(item.CREATE_TIME_);
          return item;
        });
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
