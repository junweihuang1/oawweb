<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="公司部门">
        <el-input v-model="companyName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="getCostList">搜索</el-button>
          <el-button type="success" @click="additem">新增</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="costList"
      :header="header"
      style="width:85%;"
      :headle="headle"
      @checkleave="details"
      @delete="deleteitem"
      @edit="print"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="20"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog :visible.sync="isopen" title="费用申请单" top="8vh" v-dialogDrag>
      <cost-details
        v-if="isopen"
        :openType="openType"
        @close="closewin"
        :setform="setform"
        :Approvaltable="Approvaltable"
      ></cost-details>
    </el-dialog>
    <el-dialog
      width="100%"
      :visible.sync="isprint"
      title="费用报销"
      :fullscreen="true"
      :show-close="false"
      top="8vh"
      v-dialogDrag
    >
      <cost-details-print
        v-if="isprint"
        :setform="setform"
        :Approvaltable="Approvaltable"
      ></cost-details-print>
    </el-dialog>
  </div>
</template>

<script>
import costDetailsPrint from "./components/cost-details-print";
import costDetails from "@/components/Ca-to-do/cost-details";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import {
  apigetCostappList,
  apigetCostappById,
  apidelCostapp
} from "@/request/api.js";
import { changetime } from "@/components/global-fn/global-fn";
export default {
  name: "costApplication",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      companyName: "",
      costList: [],
      header: [
        ["ID", "costapp_id", 70],
        ["公司部门", "costapp_company", 250],
        ["申请事项", "costapp_appitem"],
        ["申请类型", "costapp_application", 100],
        ["建单时间", "costapp_time", 100],
        ["费用金额", "costapp_amount", 100],
        ["状态", "costapp_status", 100]
      ],
      headle: ["查看", "删除", "打印"],
      isopen: false,
      setform: {},
      Approvaltable: [],
      isprint: false,
      openType: ""
    };
  },
  components: {
    CaRuleTable,
    paging,
    costDetails,
    costDetailsPrint
  },
  mounted() {
    this.getCostList();
  },
  methods: {
    closewin() {
      this.isopen = false;
      this.getCostList();
    },
    //修改
    // modify(row) {
    //   apigetCostappById({
    //     costapp_id: row.costapp_id
    //   }).then(res => {
    //     console.log(res);
    //     this.Approvaltable = res.hisComment;
    //     this.setform = res.data;
    //     this.openType = "modify";
    //     this.isopen = true;
    //   });
    // },
    //打印
    print(row) {
      apigetCostappById({
        costapp_id: row.costapp_id
      }).then(res => {
        this.Approvaltable = res.hisComment.map(item => {
          item.START_TIME_ = changetime(item.START_TIME_);
          return item;
        });
        this.setform = res.data;
        this.isprint = true;
        setTimeout(() => {
          this.isprint = false;
        }, 100);
      });
    },
    //删除
    deleteitem(row) {
      this.$confirm("确定删除？")
        .then(() => {
          apidelCostapp({
            costapp_id: row.costapp_id
          }).then(() => {
            this.$message.success("删除成功！");
            this.getCostList();
          });
        })
        .catch(() => {});
    },
    //新增
    additem() {
      this.openType = "add";
      this.setform = {};
      this.Approvaltable = [];
      this.isopen = true;
    },
    //查看
    details(row) {
      this.openType = "check";
      apigetCostappById({
        costapp_id: row.costapp_id
      }).then(res => {
        console.log(res);
        this.Approvaltable = [];
        if (res.hisComment) {
          this.Approvaltable = res.hisComment.map(item => {
            item.END_TIME_ = item.END_TIME_ ? changetime(item.END_TIME_) : "";
            return item;
          });
        }
        this.setform = res.data;
        this.isopen = true;
      });
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getCostList();
    },
    getpage(val) {
      this.currentpage = val;
      this.getCostList();
    },
    getCostList() {
      apigetCostappList({
        own_seal_company: this.companyName,
        pageSize: this.currentlimit,
        limit: this.currentpage
      }).then(res => {
        console.log(res);
        this.costList = res.data.map(item => {
          item.costapp_status =
            item.costapp_status == 3
              ? "审批通过"
              : item.costapp_status == 2
              ? "审核中"
              : item.costapp_status == 1
              ? "审核不通过"
              : "初始录入";
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
