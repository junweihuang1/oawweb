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
    ></Ca-rule-table>
    <paging :currentpage="currentpage" :currentlimit="currentlimit" :total="total" @setpage="getpage" @setlimit="getlimit"></paging>
    <!-- 打开办理普通采购的窗口 -->
    <el-dialog :title="openTitle" :visible.sync="openGoods" top="8vh">
      <headle-Goods
        v-if="openGoods"
        :active="active"
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
        @close="closewin"
      ></headle-Purchase>
    </el-dialog>
  </div>
</template>

<script>
import headlePurchase from "../to-do/components/headle-Purchase";
import headleSeal from "../to-do/components/headle-Seal";
import headleLeave from "../to-do/components/headle-leave";
import headleIncrement from "../to-do/components/headle-Increment";
import headleGoOut from "../to-do/components/headle-go-out";
import headleGoods from "../to-do/components/headle-Goods";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import paging from "@/components/paging/paging"
import { changetime } from "@/components/global-fn/global-fn";
import {
  apialreadyHandleTask,
  apifindTaskType,
  apipersonManagem_s
} from "@/request/api";
export default {
  name: "alreadyDo",
  data() {
    return {
        total:0,
      img_src: "",
      todoList: [],
      selectType: "",
      header: [
        ["流水号", "ID_", 90],
        ["流程类型", "processName", 150],
        ["申请时间", "startTime", 150],        
        ["申请人", "applicant", 120],
        ["流程实例id", "taskid", 120],
        ["步骤名称", "taskName", 130],
        ["任务到达时间","arrivalTime",120],
        ["办理人","assignee",100],
         ["状态","status",100],
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
      openPurchase: false
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
    paging
  },
  mounted() {
    //获取待办类型
    apifindTaskType().then(res => {
      console.log(res);
      this.typeList = res.data.map(item => {
        return item.NAME_;
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
      this.getReadyDoList();
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
      }
    },
    getpage(val){
        this.currentpage=val
        this.getReadyDoList()
    },
    getlimit(val){
        this.currentlimit=val
        this.getReadyDoList()
    },
    getReadyDoList() {
        let data={
        applicant:"",
        processKey: this.selectType,
        pageSize: this.currentlimit,
        limit: this.currentpage
      }
      console.log(data)
      apialreadyHandleTask(data).then(res => {
        console.log(res);
        this.total=res.total
        // this.summary = res.data.map(item => {
        //   item.startTime = changetime(item.startTime);
        //   return item;
        // });
        this.todoList = res.data.map(item => {
          item.startTime = changetime(item.startTime);
          item.status=item.status==0?'已结束':''
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
