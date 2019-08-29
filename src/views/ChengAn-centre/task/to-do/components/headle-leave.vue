<template>
  <div>
    <Apply-leave
      :openType="openType"
      @close="getclose"
      :form="activeform"
      :active="active"
    ></Apply-leave>
  </div>
</template>

<script>
import ApplyLeave from "@/components/Ca-to-do/Apply-leave";
import { apiLeaveListById } from "@/request/api.js";
import { changetime } from "@/components/global-fn/global-fn.js";
export default {
  name: "headleleave",
  data() {
    return {
      activeform: {}
    };
  },
  components: {
    ApplyLeave
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
      apiLeaveListById({ id: id }).then(res => {
        console.log(res);

        this.activeform = res.data[0];
        this.activeform.start_time = changetime(this.activeform.start_time);
        this.activeform.end_time = changetime(this.activeform.end_time);
      });
    }
  }
};
</script>
