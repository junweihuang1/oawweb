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
        <el-button type="primary" @click="getPurList">查询</el-button>
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
      :total="50"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apimatPurReports } from "@/request/api.js";
export default {
  name: "PurchaseDetails",
  data() {
    return {
      currentpage: 1,
      currentlimit: 15,
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
      headle: ["查看"]
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    this.getPurList();
  },
  methods: {
    getpage(val) {
      this.currentpage = val;
      this.getPurList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getPurList();
    },
    //查看
    checkitem(row) {
      console.log(row);
    },
    getPurList() {
      apimatPurReports({
        limit: this.currentlimit,
        page: this.currentpage,
        construct_project_name: this.projectName,
        construct_purchase_status: this.purchaseStatus
      }).then(res => {
        console.log(res);
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
