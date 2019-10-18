<template>
  <div>
    <table>
      <tr>
        <th>文件名</th>
        <th>{{ form.own_seal_fileName }}</th>
        <th>预结算金额</th>
        <th>{{ form.own_seal_settle }}</th>
      </tr>
      <tr>
        <th>用章公司</th>
        <th>
          {{ form.own_seal_companyName }}
        </th>
        <th>主送单位</th>
        <th>{{ form.own_seal_sender }}</th>
      </tr>
      <tr>
        <th>用章类别</th>
        <th colspan="3">
          {{ form.Category }}
        </th>
      </tr>
      <tr>
        <th>盖章用途</th>
        <th colspan="3">{{ form.own_seal_remark }}</th>
      </tr>
      <tr v-for="(item, index) in Approvaltable" :key="index">
        <th>{{ item.name_ }}</th>
        <th colspan="3">{{ item.MESSAGE_ }}</th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "costDetails",
  data() {
    return {
      applicant: sessionStorage.getItem("username"),
      form: this.setform
    };
  },
  props: {
    setform: {
      type: Object
    },
    Approvaltable: Array
  },
  mounted() {
    console.log(this.setform);
    setTimeout(() => {
      //打印
      window.print();
    }, 50);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  border: none;
  width: 100%;
}
th {
  border: solid #aaa 0.5px;
  width: 25%;
  height: 60px;
  font-size: 16px;
  font-family: "宋体";
}
</style>
