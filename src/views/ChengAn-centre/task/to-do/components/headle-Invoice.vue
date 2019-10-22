<template>
  <div>
    <Application-form
      @close="close"
      :active="active"
      :openType="openType"
      :headform="headform"
      :entryList="DataList"
      :activeForm="activeform"
    ></Application-form>
  </div>
</template>

<script>
import ApplicationForm from "@/components/Ca-to-do/Application-form";
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
    ApplicationForm
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
      console.log(id);
      apigetPurchase({
        construct_purchase_id: id
      }).then(res => {
        console.log(res);
        this.headform = res.projectInfo;
        this.DataList = res.purchaseEntry;
        this.activeform = res.purchaseHead;
      });
    }
  }
};
</script>
