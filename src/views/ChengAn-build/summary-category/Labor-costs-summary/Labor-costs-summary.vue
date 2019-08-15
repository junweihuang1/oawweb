<template>
  <div>
    <costs-summary :companyId="1"></costs-summary>
  </div>
</template>

<script>
import CostsSummary from "@/components/costs-summary/costs-summary";
export default {
  name: "LaborCostsSummary",
  data() {
    return {};
  },
  components: {
    CostsSummary
  }
};
</script>

<style lang="scss" scoped></style>
