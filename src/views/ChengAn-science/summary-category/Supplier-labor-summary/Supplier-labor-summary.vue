<template>
  <div>
    <labor-summary :companyId="2"></labor-summary>
  </div>
</template>

<script>
import LaborSummary from "@/components/labor-summary/labor-summary";
export default {
  name: "SupplierLaborSummary",
  components: {
    LaborSummary
  }
};
</script>

<style lang="scss" scoped></style>
