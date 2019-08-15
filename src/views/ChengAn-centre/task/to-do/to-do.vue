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
    <el-dialog :visible.sync="openGoods">
      <headle-Goods
        v-if="openGoods"
        :id="id"
        :taskid="taskid"
        @close="closewin"
        :openGoods="openGoods"
      ></headle-Goods>
    </el-dialog>
  </div>
</template>

<script>
import headleGoods from "./components/headle-Goods";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { changetime } from "@/components/global-fn/global-fn";
import { apiFindTaskList } from "@/request/api";
export default {
  name: "todo",
  data() {
    return {
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
      typeList: [
        "[人事]-转正申请",
        "[考勤]-请假申请",
        "[资费]-采购付款申请",
        "材料采购申请(建设)",
        "[甲供]-材料采购",
        "绩效考评",
        "合同工程量新增",
        "[资费]-材料价格变更",
        "项目合同申请",
        "[资费]-费用申请",
        "[资费]-领款申请",
        "[考勤]-外勤申请",
        "[公告]-通知公告",
        "[材料]-物品采购",
        "开票申请",
        "离职申请",
        "[内部]-盖章申请",
        "监察意见",
        "劳动力分配"
      ],
      summary: [],
      openGoods: false,
      id: "",
      taskid: ""
    };
  },
  components: {
    CaRuleTable,
    headleGoods
  },
  mounted() {
    this.getToDoList();
  },
  methods: {
    closewin() {
      this.openGoods = false;
      this.getToDoList();
    },
    query() {
      if (this.selectType == null) {
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
    },
    //待办
    openheadle(row) {
      // console.log(row);
      this.id = row.BUSINESS_KEY_.split(".")[1];
      this.taskid = row.ID_;
      switch (row.pdname) {
        case "[材料]-物品采购":
          this.openGoods = true;
          break;
      }
    },
    getToDoList() {
      apiFindTaskList().then(res => {
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
