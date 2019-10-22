<template>
  <div>
    <Apply-leave
      :openType="openType"
      @close="getclose"
      :form="activeform"
      :DataList="entryList"
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
      activeform: {},
      entryList: []
    };
  },
  components: {
    ApplyLeave
  },
  props: {
    openType: String,
    active: Object
  },
  mcreatedounted() {
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
        this.entryList = res.hisComment.map(item => {
          item.END_TIME_ = item.END_TIME_ ? changetime(item.END_TIME_) : "";
          return item;
        });
        this.activeform = res.data[0];
        this.activeform.start_time = changetime(this.activeform.start_time);
        this.activeform.end_time = changetime(this.activeform.end_time);
      });
    }
  }
};
</script>
