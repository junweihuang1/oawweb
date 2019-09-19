<template>
  <div>
    <Apply-purchase
      @close="close"
      :active="active"
      v-if="isopen"
      :openType="openType"
      :headform="headform"
      :ProcessList="ProcessList"
      :entryList="DataList"
      :activeForm="activeform"
    ></Apply-purchase>
  </div>
</template>

<script>
import ApplyPurchase from "@/components/Ca-to-do/Apply-purchase/Apply-purchase";
import { apigetPurchase } from "@/request/api.js";
import { changetime } from "@/components/global-fn/global-fn";
export default {
  name: "headlePurchase",
  data() {
    return {
      isopen: false,
      activeform: {},
      DataList: [],
      headform: {},
      ProcessList: []
    };
  },
  components: {
    ApplyPurchase
  },
  props: {
    openType: String,
    active: Object
  },
  mounted() {
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
        console.log(res);
        this.ProcessList = res.hisComment.map(item => {
          item.END_TIME_ = item.END_TIME_ ? changetime(item.END_TIME_) : "";
          return item;
        });
        this.headform = res.projectInfo;
        this.DataList = res.purchaseEntry.map(item => {
          item.construct_purchase_purchaseTotal = item.construct_purchase_purchaseTotal
            ? item.construct_purchase_purchaseTotal.toFixed(2)
            : "";
          return item;
        });
        this.activeform = res.purchaseHead;
        this.isopen = true;
      });
    }
  }
};
</script>
