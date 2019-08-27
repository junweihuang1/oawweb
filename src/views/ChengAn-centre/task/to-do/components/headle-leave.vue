<template>
  <div>
    <Apply-leave
      :openType="openType"
      :DataList="entryList"
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
      entryList: [],
      isopen: false,
      openType: "headle",
      activeform: {}
    };
  },
  components: {
    ApplyLeave
  },
  props: {
    active: Object
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
    getclose() {
      this.$emit("close");
    },
    getGoOut() {
      apiLeaveListById({ id: this.active.BUSINESS_KEY_.split(".")[1] }).then(
        res => {
          console.log(res);
          this.entryList = res.hisComment.map(item => {
            item.END_TIME_ = item.END_TIME_ ? changetime(item.END_TIME_) : "";
            return item;
          });
          this.activeform = res.data[0];
          this.activeform.start_time = changetime(this.activeform.start_time);
          this.activeform.end_time = changetime(this.activeform.end_time);
        }
      );
    }
  }
};
</script>
