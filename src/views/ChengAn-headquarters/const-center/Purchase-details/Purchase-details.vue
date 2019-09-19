<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item label="项目名称">
        <el-input
          v-model="projectName"
          clearable
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="purchaseStatus" placeholder="采购状态" clearable>
          <el-option
            :label="item[1]"
            :value="item[0]"
            v-for="item in status"
            :key="item[0]"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      style="width:85%;"
      :DataList="PurList"
      :header="header"
      :headle="headle"
      @checkleave="checkitem"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog :visible.sync="isopen" width="70%" title="采购明细">
      <Apply-purchase
        @close="close"
        v-if="isopen"
        openType="check"
        :headform="headform"
        :ProcessList="ProcessList"
        :entryList="DataList"
        :activeForm="activeform"
      ></Apply-purchase>
    </el-dialog>
  </div>
</template>

<script>
import ApplyPurchase from "@/components/Ca-to-do/Apply-purchase/Apply-purchase";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { changetime } from "@/components/global-fn/global-fn";
import { apimatPurReports, apigetPurchase } from "@/request/api.js";
export default {
  name: "PurchaseDetails",
  data() {
    return {
      currentpage: 1,
      currentlimit: 15,
      total: 0,
      projectName: "",
      purchaseStatus: "",
      status: [
        [0, "保存"],
        [1, "项目经理提交"],
        [2, "经营部审核"],
        [3, "总经理审核"],
        [4, "采购核对单价"],
        [5, "财务经理审核"],
        [6, "董事会审核"]
      ],
      PurList: [],
      header: [
        ["编号", "construct_purchase_id", 80],
        ["简单时间", "construct_purchase_creatTime", 150],
        ["项目名称", "construct_project_name"],
        ["项目经理", "construct_project_leader", 100],
        ["供应商", "construct_purchase_supplier"],
        ["采购分类", "construct_purchase_materialSerName", 180],
        ["采购合计", "total", 100],
        ["采购状态", "construct_purchase_status", 120]
      ],
      headle: ["查看"],
      isopen: false,
      ProcessList: [],
      headform: {},
      DataList: [],
      activeform: {}
    };
  },
  components: {
    CaRuleTable,
    paging,
    ApplyPurchase
  },
  mounted() {
    this.getPurList();
  },
  methods: {
    query() {
      this.currentlimit = 15;
      this.currentpage = 1;
      this.getPurList();
    },
    getpage(val) {
      this.currentpage = val;
      this.getPurList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getPurList();
    },
    close() {
      this.isopen = false;
    },
    //查看
    checkitem(row) {
      console.log(row);
      apigetPurchase({
        construct_purchase_id: row.construct_purchase_id
      }).then(res => {
        console.log(res);
        this.ProcessList = res.hisComment.map(item => {
          item.END_TIME_ = item.END_TIME_ ? changetime(item.END_TIME_) : "";
          return item;
        });
        this.headform = res.projectInfo;
        this.DataList = res.purchaseEntry;
        this.activeform = res.purchaseHead;
        this.isopen = true;
      });
    },
    getPurList() {
      let data = {
        limit: this.currentlimit,
        page: this.currentpage,
        construct_project_name: this.projectName,
        construct_purchase_status: this.purchaseStatus
      };
      console.log(data);
      apimatPurReports(data).then(res => {
        console.log(res);
        this.total = res.count;
        this.PurList = res.data.map(item => {
          switch (item.construct_purchase_status) {
            case 0:
              item.construct_purchase_status = "保存";
              break;
            case 1:
              item.construct_purchase_status = "项目经理提交";
              break;
            case 2:
              item.construct_purchase_status = "经营部审核";
              break;
            case 3:
              item.construct_purchase_status = "总经理审核";
              break;
            case 4:
              item.construct_purchase_status = "采购核对单价";
              break;
            case 5:
              item.construct_purchase_status = "财务经理审核";
              break;
            case 6:
              item.construct_purchase_status = "董事会审核";
              break;
          }
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
