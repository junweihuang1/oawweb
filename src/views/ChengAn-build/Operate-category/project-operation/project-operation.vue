<template>
  <div>
    <project-operation :companyId="1"></project-operation>
  </div>
</template>

<script>
import projectOperation from "@/components/project-operation/project-operation";
export default {
  name: "projectOperation",
  data() {
    return {
    };
  },
  components:{
    projectOperation
  }
};
</script>

<style lang="scss" scoped></style>
