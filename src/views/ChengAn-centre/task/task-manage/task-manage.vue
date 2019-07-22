<template>
  <div></div>
</template>

<script>
import { apiownWorkList } from "@/request/api.js";
export default {
  name: "taskManage",
  mounted() {
    apiownWorkList()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped></style>
