<template>
  <div>
    <Contract-quantity
      @close="closeQuantity"
      :projectList="activeform"
      :active="active"
      opentype="headle"
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
      openType: "edit",
      activeform: {},
      DataList: []
    };
  },
  components: {
    ContractQuantity
  },
  props: {
    active: Object
  },
  mounted() {
    this.getGoOut();
  },
  methods: {
    closeQuantity() {
      this.$emit("close");
    },
    getclose() {},
    getGoOut() {
      console.log(this.active)
      let id=this.active.BUSINESS_KEY_.split(".")[1]?this.active.BUSINESS_KEY_.split(".")[1]:this.active.businessId
      console.log(id)
      apiChangeQuantity({
        id: id
      }).then(res => {
        console.log(res);
        // this.activeform = res.head;
        // this.DataList = res.entry;
      });
    }
  }
};
</script>
