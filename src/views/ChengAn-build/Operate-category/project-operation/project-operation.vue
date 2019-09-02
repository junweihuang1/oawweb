<template>
  <div>
    <project-operation-com :companyId="1"></project-operation-com>
  </div>
</template>

<script>
import projectOperationCom from "@/components/project-operation/project-operation-com";
export default {
  name: "projectOperation",
  data() {
    return {};
  },
  components: {
    projectOperationCom
  }
};
</script>

<style lang="scss" scoped></style>
