<template>
  <div>
    <table class="Application_form">
      <tr>
        <th>项目名称</th>
        <th>{{ form.manage_contractapprove_name }}</th>
        <th>所属公司</th>
        <th>{{ form.manage_contractapprove_company }}</th>
      </tr>
      <tr>
        <th>项目地址</th>
        <th colspan="3">{{ form.manage_contractapprove_address }}</th>
      </tr>
      <tr>
        <th>发包方（甲方）</th>
        <th>{{ form.manage_contractapprove_firstParty }}</th>
        <th>合同金额</th>
        <th>{{ form.manage_contractapprove_amount }}</th>
      </tr>
      <tr>
        <th>乙方</th>
        <th colspan="3">{{ form.manage_contractapprove_secondParty }}</th>
      </tr>
      <tr>
        <th>开始时间</th>
        <th>{{ form.manage_contractapprove_startTime }}</th>
        <th>结束时间</th>
        <th>{{ form.manage_contractapprove_endTime }}</th>
      </tr>
      <tr>
        <th>付款比例</th>
        <th>{{ form.manage_contractapprove_payment }}</th>
        <th>是否含税</th>
        <th>{{ form.manage_contractapprove_taxIncluded }}</th>
      </tr>
      <tr>
        <th>合同类型</th>
        <th>{{ form.category }}</th>
        <th>备注</th>
        <th>{{ form.manage_contractapprove_remark }}</th>
      </tr>
      <tr v-for="(item, index) in Approvaltable" :key="index">
        <th>{{ item.name_ }}</th>
        <th colspan="3">{{ item.MESSAGE_ }}</th>
      </tr>
    </table>
  </div>
</template>

<script>
import { getDates, number_chinese } from "@/components/global-fn/global-fn";
export default {
  name: "costDetails",
  data() {
    return {
      applicant: sessionStorage.getItem("username"),
      form: this.setform,
      nowtime: getDates(new Date())
    };
  },
  props: {
    setform: {
      type: Object
    },
    Approvaltable: Array
  },
  mounted() {
    setTimeout(() => {
      //打印
      // window.print();
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
  height: 60px;
  font-size: 16px;
  font-family: "宋体";
}
td:nth-child(n),
th:nth-child(n) {
  width: 20%;
  background: #ccc;
}
td:nth-child(2n),
th:nth-child(n) {
  width: 30%;
}
</style>
