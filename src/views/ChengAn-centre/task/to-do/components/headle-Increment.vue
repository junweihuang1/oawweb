<template>
  <div>
    <Contract-quantity
      @close="closeQuantity"
      :projectList="activeform"
      :active="active"
      openType="openType"
      :DataList="DataList"
    ></Contract-quantity>
  </div>
</template>

<script>
import ContractQuantity from "@/components/Ca-to-do/Contract-quantity/Contract-quantity";
import { apiChangeQuantity } from "@/request/api.js";
export default {
  name: "headleIncrement",
  data() {
    return {
      isopen: false,
      activeform: {},
      DataList: []
    };
  },
  components: {
    ContractQuantity
  },
  props: {
    openType: String,
    active: Object
  },
  mounted() {
    this.getGoOut();
  },
  methods: {
    closeQuantity() {
      this.$emit("close");
    },
    getGoOut() {
      // console.log(this.active);
      let id = this.active.BUSINESS_KEY_
        ? this.active.BUSINESS_KEY_.split(".")[1]
        : this.active.businessId;
      apiChangeQuantity({
        id: id
      }).then(res => {
        console.log(res);
        this.activeform = res.head;
        this.DataList = res.entry;
      });
    }
  }
};
</script>
