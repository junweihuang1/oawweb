<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="订单号">
        <el-input v-model="order_num" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="success" @click="isaddform">新增</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :headle="headle"
      :DataList="PurList"
      :header="header"
      @checkleave="modifyParty"
      @delete="deleteitem"
      @edit="modifyOrder"
      :setheight="0.5"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setlimit="getlimit"
      @setpage="getpage"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apiaPartyPurList, apidel_apartyPur } from "@/request/api.js";
export default {
  name: "ApplyPurchase",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      order_num: "",
      PurList: [],
      total: 0,
      header: [
        ["订单编号", "construct_Aparty_purchase_orderNum", 120],
        ["创建时间", "construct_Aparty_purchase_creatTime", 100],
        ["项目名称", "construct_project_name", 110],
        ["收货地址", "construct_project_addr", 110],
        ["项目经理", "construct_project_leader", 100],
        ["项目经理联系方式", "construct_project_leaderTel", 150],
        ["供货单位", "construct_Aparty_purchase_supplier"],
        ["联系人", "construct_Aparty_purchase_contacts"],
        ["联系电话", "construct_Aparty_purchase_tel"],
        ["状态", "construct_Aparty_purchase_status", 80]
      ],
      headle: ["查看订单", "删除", "修改"]
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  props: {
    projectList: Object
  },
  created() {
    this.getMaterialList();
  },
  methods: {
    query() {
      this.currentpage = 1;
      this.currentlimit = 15;
      this.getMaterialList();
    },
    //修改
    modifyOrder(row) {
      this.$emit("setOrderId", row.construct_Aparty_purchase_id);
    },
    //删除
    deleteitem(row) {
      this.$confirm("确定删除？")
        .then(() => {
          apidel_apartyPur({ id: row.construct_Aparty_purchase_id }).then(
            res => {
              this.$message.success("删除成功！");
              this.getMaterialList();
            }
          );
        })
        .catch(() => {});
    },
    //查看订单
    modifyParty(row) {
      this.$emit("setPurchaseId", row.construct_Aparty_purchase_id);
    },
    isaddform() {
      this.$emit("addNeworder");
    },
    //删除多行
    query() {
      this.getMaterialList();
    },
    getpage(val) {
      this.currentpage = val;
      this.getMaterialList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getMaterialList();
    },
    getMaterialList() {
      apiaPartyPurList({
        construct_project_id: this.projectList.construct_project_id,
        construct_Aparty_purchase_orderNum: this.order_num,
        pageSize: this.currentlimit,
        limit: this.currentpage
      }).then(res => {
        console.log(res);
        this.total = res.total;
        this.PurList = res.data.map(item => {
          switch (item.construct_Aparty_purchase_status) {
            case 0:
              item.construct_Aparty_purchase_status = "初始录入";
              break;
            case 1:
              item.construct_Aparty_purchase_status = "审核中";
              break;
            case 2:
              item.construct_Aparty_purchase_status = "审核通过";
              break;
            case 3:
              item.construct_Aparty_purchase_status = "驳回";
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
