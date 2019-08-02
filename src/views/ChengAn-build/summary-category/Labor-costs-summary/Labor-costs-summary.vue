<template>
  <div>
    建设222
  </div>
</template>

<script>
export default {
  name: "LaborCostsSummary",
  data() {
    return {
      queryYear: "",
      projectName: "",
      currentpage: 1,
      currentlimit: 15
    };
  },
  mounted() {
    this.getLaborList();
  },
  methods: {
    getLaborList() {
      let data = {
        companyId: 11,
        hr_attend_date: this.queryYear,
        construct_project_name: this.projectName,
        limit: this.currentpage,
        pageSize: this.currentlimit
      };
      console.log(data);
      // apilaborCostMon(data).then(res => {
      //   console.log(res);
      // });
    }
  }
};
</script>

<style lang="scss" scoped></style>
