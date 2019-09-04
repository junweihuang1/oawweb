<template>
  <div>
    <add-contract-approve
      :history="history"
      :openType="openType"
      :contractapprove="contractapprove"
      @close="close"
      :active="active"
    ></add-contract-approve>
  </div>
</template>

<script>
import addContractApprove from "@/components/Ca-to-do/add-contract-approve";
import { apicontractapproveNew } from "@/request/api.js";
import { changetime } from "@/components/global-fn/global-fn.js";
export default {
  name: "headleleave",
  data() {
    return {
      history: [],
      contractapprove: {}
    };
  },
  components: {
    addContractApprove
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
      let id = this.active.BUSINESS_KEY_
        ? this.active.BUSINESS_KEY_.split(".")[1]
        : this.active.businessId;
      apicontractapproveNew({
        manage_contractapprove_id: id
      }).then(res => {
        console.log(res);
        this.contractapprove = res.contractapprove;
        this.history = res.history
          ? res.history.map(item => {
              item.START_TIME_ = item.START_TIME_
                ? changetime(item.START_TIME_.time)
                : "";
              item.END_TIME_ = item.END_TIME_
                ? changetime(item.END_TIME_.time)
                : "";
              return item;
            })
          : [];
        this.isopen = false;
        this.$nextTick(() => {
          this.isopen = true;
        });
      });
    }
  }
};
</script>
