<template>
  <div></div>
</template>

<script>
import { apichengan_dream } from "@/request/api.js";
export default {
  name: "chenganDream",
  mounted() {
    apichengan_dream({
      rows: "15",
      page: "1",
      goal_year: ""
    }).then(res => {
      console.log(res);
    });
  }
};
</script>

<style lang="scss" scoped></style>
