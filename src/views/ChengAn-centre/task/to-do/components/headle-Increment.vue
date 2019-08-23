<template>
  <div>
    <Contract-quantity
      @close="closeQuantity"
      :projectList="activeform"
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
    id: String,
    taskid: String
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
    closeQuantity() {},
    getclose() {},
    getGoOut() {
      console.log(this.id);
      apiChangeQuantity({
        id: this.id
      }).then(res => {
        console.log(res);
        this.activeform = res.head;
        this.DataList = res.entry;
      });
    }
  }
};
</script>
