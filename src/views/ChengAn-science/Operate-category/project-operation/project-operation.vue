<template>
  <div>
    <project-operation :companyId="2" openType="science"></project-operation>
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
