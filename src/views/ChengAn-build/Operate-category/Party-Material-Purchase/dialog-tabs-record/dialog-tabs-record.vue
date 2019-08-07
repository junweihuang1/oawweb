<template>
  <div style="border:1px solid #E4E7ED;">
    <el-tabs tab-position="top" v-model="currentActive" type="card">
      <el-tab-pane label="申请采购" name="1">
        <Apply-purchase
          v-if="isRefresh"
          style="padding:10px;"
          :projectList="projectList"
          @addNeworder="addNeworder"
          @setPurchaseId="getPurchaseId"
          @setOrderId="getOrderId"
        ></Apply-purchase>
      </el-tab-pane>
      <el-tab-pane label="查看订单" name="2" v-if="isOpenDetails">
        <purchase-details
          :PurchaseId="PurchaseId"
          style="padding:10px;"
        ></purchase-details>
      </el-tab-pane>
      <el-tab-pane
        :label="ordertype == 'up' ? '修改订单' : '新增订单'"
        name="3"
        v-if="isOpenOrder"
      >
        <new-order
          :ProList="projectList"
          @close="closeOrder"
          :OrderId="OrderId"
          style="padding:10px;"
        ></new-order>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import NewOrder from "./components/new-order";
import PurchaseDetails from "./components/purchase-details";
import ApplyPurchase from "./components/Apply-purchase";
export default {
  name: "dialogTabsRecord",
  data() {
    return {
      currentActive: "1",
      PurchaseId: "",
      isOpenDetails: false,
      isOpenOrder: false,
      OrderId: "",
      ordertype: "",
      isRefresh: true
    };
  },
  components: {
    ApplyPurchase,
    PurchaseDetails,
    NewOrder
  },
  props: {
    projectList: Object
  },
  watch: {},
  methods: {
    getPurchaseId(id) {
      this.PurchaseId = id;
      this.currentActive = "2";
      this.isOpenDetails = true;
      this.isOpenOrder = false;
    },
    //新增
    addNeworder() {
      this.OrderId = "";
      this.isOpenOrder = false;
      this.$nextTick(() => {
        this.isOpenOrder = true;
      });
      this.isOpenDetails = false;
      this.currentActive = "3";
      this.ordertype = "save";
    },
    //修改
    getOrderId(id) {
      this.OrderId = id.toString();
      this.isOpenOrder = false;
      this.$nextTick(() => {
        this.isOpenOrder = true;
      });
      this.isOpenDetails = false;
      this.currentActive = "3";
      this.ordertype = "up";
    },
    closeOrder() {
      this.isOpenOrder = false;
      this.currentActive = "1";
      this.isRefresh = false;
      this.$nextTick(() => {
        this.isRefresh = true;
      });
    }
  }
};
</script>

<style lang="scss"></style>
