<template>
  <div>
    <Apply-purchase
      @close="close"
      :active="active"
      openType="headle"
      :headform="headform"
      :entryList="DataList"
      :ProcessList="ProcessList"
      :activeForm="activeform"
    ></Apply-purchase>
  </div>
</template>

<script>
import ApplyPurchase from "@/components/Ca-to-do/Apply-purchase";
import { apigetPurchase } from "@/request/api.js";
export default {
  name: "headlePurchase",
  data() {
    return {
      isopen: false,
      openType: "edit",
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
    active: Object
  },
  watch: {
    openGoods(val) {
      this.isopen = val;
    }
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
      apigetPurchase({
        construct_purchase_id: this.active.BUSINESS_KEY_.split(".")[1]
      }).then(res => {
        console.log(res);
        this.headform = res.projectInfo;
        this.DataList = res.purchaseEntry;
        this.activeform = res.purchaseHead;
        this.ProcessList = res.hisComment;
      });
    }
  }
};
</script>
