// 时间日期选择器组件
<template>
  <div>
    <el-date-picker
      v-model="time"
      type="datetime"
      placeholder="选择日期时间"
      @change="settime"
      style="width:100%;"
    >
    </el-date-picker>
  </div>
</template>

<script>
import { changetime } from "@/components/global-fn/global-fn.js";
export default {
  name: "datetime",
  data() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let date = new Date().getDate();
    return {
      time: this.startstauts
        ? new Date()
        : year + "-" + month + "-" + date + " 18:00:00"
    };
  },
  props: {
    startstauts: {
      type: Boolean,
      default: false
    }
  },
  watch: {},
  created() {
    this.settime(this.time);
  },
  methods: {
    settime(e) {
      this.$emit("settime", changetime(e));
    }
  }
};
</script>

<style lang="scss" scoped></style>
