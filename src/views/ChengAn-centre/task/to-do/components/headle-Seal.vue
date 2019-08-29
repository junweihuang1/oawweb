<template>
  <div>
    <Seal-Apply
      :openType="openType"
      :Approvaltable="entryList"
      @close="getclose"
      :form="activeform"
      :active="active"
    ></Seal-Apply>
  </div>
</template>

<script>
import SealApply from "@/components/Ca-to-do/Seal-Apply";
import { apiSealById } from "@/request/api.js";
import { changetime } from "@/components/global-fn/global-fn.js";
export default {
  name: "headleleave",
  data() {
    return {
      entryList: [],
      activeform: {}
    };
  },
  components: {
    SealApply
  },
  props: {
    openType: String,
    active: Object
  },
  mounted() {
    this.getGoOut();
  },
  methods: {
    getclose() {
      this.$emit("close");
    },
    getGoOut() {
      let id = this.active.BUSINESS_KEY_
        ? this.active.BUSINESS_KEY_.split(".")[1]
        : this.active.businessId;
      apiSealById({
        own_seal_id: id
      }).then(res => {
        console.log(res);
        this.entryList = res.hisComment.map(item => {
          item.END_TIME_ = item.END_TIME_ ? changetime(item.END_TIME_) : "";
          return item;
        });
        this.activeform = res.data;
        this.activeform.own_seal_chapCategory = this.activeform.own_seal_chapCategory.split(
          ","
        );
      });
    }
  }
};
</script>
