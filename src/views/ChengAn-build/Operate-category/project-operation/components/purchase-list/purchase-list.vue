<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="供应商">
        <el-input v-model="supplierName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getPurchaseList">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" class="el-icon-plus" @click="openPurchase"
          >申请采购</el-button
        >
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="purchaseList"
      :header="header"
      :setheight="0.5"
      :headle="headle"
      @edit="modify"
      @delete="delitem"
      @checkleave="checkitem"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="45"
      @setlimit="getlimit"
      @setpage="getpage"
    ></paging>
    <el-dialog></el-dialog>
  </div>
</template>

<script>
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import paging from "@/components/paging/paging";
import { apiPurchaseList, apidelPurchase } from "@/request/api.js";
import { getDates } from "@/components/global-fn/global-fn";
export default {
  name: "purchaseList",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      purchaseList: [],
      header: [
        ["采购单号", "construct_purchase_id", 100],
        ["项目名称", "construct_project_name", 100],
        ["工程地址", "construct_project_addr", 100],
        ["项目经理", "construct_project_leader", 100],
        ["项目经理联系方式", "construct_project_leaderTel", 150],
        ["计划时间", "construct_purchase_planDate", 100],
        ["希望送达时间", "construct_purchase_arriveDate", 120],
        ["计划员", "construct_purchase_planMan", 90],
        ["复核员", "construct_purchase_reviewer", 90],
        ["供应商", "construct_purchase_supplier", 90],
        ["供应商联系方式", "construct_purchase_supplierTel", 130],
        ["状态", "construct_purchase_status", 90]
      ],
      headle: ["查看", "删除", "修改"],
      openType: "",
      supplierName: ""
    };
  },
  props: {
    activeForm: Object
  },
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    this.getPurchaseList();
  },
  methods: {
    //修改
    modify(row) {
      console.log(row);
      this.$emit("openeditPurchase", row.construct_purchase_id);
    },
    //删除
    delitem(row) {
      this.$confirm(`确定删除吗？`)
        .then(() => {
          apidelPurchase({
            construct_purchase_id: row.construct_purchase_id
          }).then(res => {
            this.$message.success(res.msg);
            this.getPurchaseList();
          });
        })
        .catch();
    },
    //申请采购
    openPurchase() {
      this.$emit("openaddPurchase");
    },
    getpage(val) {
      this.currentpage = val;
      this.getPurchaseList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getPurchaseList();
    },
    //查看
    checkitem(row) {
      this.$emit("opencheckPurchase", row.construct_purchase_id);
    },
    getPurchaseList() {
      let data = {
        construct_purchase_supplier: this.supplierName,
        construct_project_id: this.activeForm.construct_project_id,
        pageSize: this.currentlimit,
        limit: this.currentpage
      };
      console.log(data);
      apiPurchaseList(data).then(res => {
        console.log(res);
        this.purchaseList = res.data.map(item => {
          item.construct_purchase_planDate = getDates(
            item.construct_purchase_planDate
          );
          item.construct_purchase_arriveDate = getDates(
            item.construct_purchase_arriveDate
          );
          switch (item.construct_purchase_status) {
            case 6:
              item.construct_purchase_status = "供应商";
              break;
            case 11:
              item.construct_purchase_status = "供应商结算申请";
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
