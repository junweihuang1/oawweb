<template>
  <div>
    <table>
      <tr>
        <th v-for="(item, index) in print_header" :key="index">
          {{ item[0] }}
        </th>
      </tr>
      <tr v-for="(item, index) in CostsList" :key="index">
        <td v-for="(item2, index2) in print_header" :key="index2">
          {{ item[item2[1]] }}
        </td>
      </tr>
    </table>

    <div class="page-break"></div>
    <table>
      <tr>
        <th v-for="(item, index) in print_header" :key="index">
          {{ item[0] }}
        </th>
      </tr>
      <tr v-for="(item, index) in CostsList" :key="index">
        <td v-for="(item2, index2) in print_header" :key="index2">
          {{ item[item2[1]] }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "printTable",
  data() {
    return {};
  },
  props: {
    CostsList: Array,
    print_header: Array
  },
  mounted() {
    setTimeout(() => {
      window.print();
      this.$nextTick(() => {
        this.$emit("close");
      });
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
.page-break {
  page-break-after: always;
}
table {
  border-collapse: collapse;
  border: none;
  width: 100%;
}
th {
  border: solid #aaa 0.1px;
  width: 5.88%;
  font-size: 16px;
  font-family: "宋体";
}
td {
  border: solid #aaa 0.1px;
  width: 5.88%;
  height: 50px;
  font-size: 12px;
  font-family: "宋体";
}
</style>
