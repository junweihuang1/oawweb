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
      <el-tab-pane
        :label="
          openType == 'add'
            ? '新增订单'
            : openType == 'check'
            ? '查看订单'
            : '修改订单'
        "
        name="2"
        v-if="isOpenOrder"
      >
        <aParty-apply-purchase
          v-if="isOpenOrder"
          @close="closeOrder"
          :OrderId="OrderId"
          :proList="projectList"
          :openType="openType"
          style="padding:10px;"
        ></aParty-apply-purchase>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import aPartyApplyPurchase from "@/components/Ca-to-do/aParty-apply-purchase/aParty-apply-purchase";
import ApplyPurchase from "./components/Apply-purchase";
export default {
  name: "dialogTabsRecord",
  data() {
    return {
      currentActive: "1",
      isOpenOrder: false,
      OrderId: "",
      openType: "",
      isRefresh: true
    };
  },
  components: {
    ApplyPurchase,
    aPartyApplyPurchase
  },
  props: {
    projectList: Object
  },
  watch: {},
  methods: {
    getPurchaseId(id) {
      this.OrderId = id.toString();
      this.currentActive = "2";
      this.isOpenOrder = false;
      this.$nextTick(() => {
        this.isOpenOrder = true;
      });
      this.openType = "check";
    },
    //新增
    addNeworder() {
      this.OrderId = "";
      this.isOpenOrder = false;
      this.$nextTick(() => {
        this.isOpenOrder = true;
      });
      this.currentActive = "2";
      this.openType = "add";
    },
    //修改
    getOrderId(id) {
      this.OrderId = id.toString();
      this.isOpenOrder = false;
      this.$nextTick(() => {
        this.isOpenOrder = true;
      });
      this.currentActive = "2";
      this.openType = "modify";
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
