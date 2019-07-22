<template>
  <div>
    <!-- <Ca-rule-table></Ca-rule-table> -->
  </div>
</template>

<script>
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apiuserWagesLibs1 } from "@/request/api.js";
export default {
  name: "wageSlip",
  data() {
    return {
      currentpage: 1,
      currentlimit: 10
    };
  },
  components: {
    CaRuleTable
  },
  mounted() {
    apiuserWagesLibs1({
      page: this.currentpage,
      limit: this.currentlimit
    }).then(res => {
      console.log(res);
    });
  }
};
</script>

<style lang="scss" scoped></style>
