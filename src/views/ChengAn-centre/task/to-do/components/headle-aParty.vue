<template>
  <div>
    <aParty-apply-purchase
      @close="close"
      :active="active"
      :openType="openType"
      :headform="headform"
      :entryList="DataList"
      :activeForm="activeform"
    ></aParty-apply-purchase>
  </div>
</template>

<script>
import aPartyApplyPurchase from "@/components/Ca-to-do/aParty-apply-purchase/aParty-apply-purchase";
import { apigetPurchase } from "@/request/api.js";

export default {
  name: "headlePurchase",
  data() {
    return {
      isopen: false,
      activeform: {},
      DataList: [],
      headform: {}
    };
  },
  components: {
    aPartyApplyPurchase
  },
  props: {
    openType: String,
    active: Object
  },
  watch: {
    openGoods(val) {
      this.isopen = val;
    }
  },
  created() {
    this.getGoOut();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    getGoOut() {
      console.log(this.active);
      let id = this.active.BUSINESS_KEY_
        ? this.active.BUSINESS_KEY_.split(".")[1]
        : this.active.businessId;
      apigetPurchase({
        construct_purchase_id: id
      }).then(res => {
        // console.log(res);
        this.headform = res.projectInfo;
        this.DataList = res.purchaseEntry;
        this.activeform = res.purchaseHead;
      });
    }
  }
};
</script>
