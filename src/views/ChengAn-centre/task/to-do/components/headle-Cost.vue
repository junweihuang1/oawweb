<template>
  <div>
    <cost-details
      :openType="openType"
      @close="getclose"
      :setform="setform"
      :active="active"
      :Approvaltable="Approvaltable"
    ></cost-details>
  </div>
</template>

<script>
import costDetails from "@/components/Ca-to-do/cost-details";
import { apigetCostappById } from "@/request/api.js";
import { changetime } from "@/components/global-fn/global-fn.js";
export default {
  name: "headleleave",
  data() {
    return {
      activeform: {},
      setform: {},
      Approvaltable: []
    };
  },
  components: {
    costDetails
  },
  props: {
    openType: String,
    active: Object
  },
  created() {
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
      apigetCostappById({
        costapp_id: id
      }).then(res => {
        console.log(res); //hisComment
        this.setform = res.data;
        this.setform.username = res.applyUser.username;
        this.Approvaltable = res.hisComment
          ? res.hisComment.map(item => {
              item.END_TIME_ = item.END_TIME_ ? changetime(item.END_TIME_) : "";
              return item;
            })
          : [];
      });
    }
  }
};
</script>
