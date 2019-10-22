<template>
  <div>
    <Apply-payment
      @close="close"
      :active="active"
      v-if="isopen"
      :openType="openType"
      :headform="headform"
      :ProcessList="ProcessList"
      :entryList="DataList"
      :activeForm="activeform"
    ></Apply-payment>
  </div>
</template>

<script>
import ApplyPayment from "@/components/Ca-to-do/Apply-payment";
import { apipayApplyProcessInfo } from "@/request/api.js";
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
    ApplyPayment
  },
  props: {
    openType: String,
    active: Object
  },
  created() {
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
      let data = {
        bizId: id
      };
      console.log(data);
      apipayApplyProcessInfo(data).then(res => {
        console.log(res);
        this.ProcessList = res.history.map(item => {
          item.END_TIME_ = item.END_TIME_ ? changetime(item.END_TIME_) : "";
          return item;
        });
        this.headform = res.projectInfo;
        this.DataList = res.entryInfo;
        this.activeform = res.payApply;
        this.isopen = true;
      });
    }
  }
};
</script>
