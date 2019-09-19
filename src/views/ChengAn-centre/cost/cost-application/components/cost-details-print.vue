<template>
  <div>
    <table>
      <tr>
        <th>申请人</th>
        <th>{{ applicant }}</th>
        <th>申请时间</th>
        <th>{{ form.costapp_time }}</th>
      </tr>
      <tr>
        <th>公司/部门</th>
        <th colspan="3">{{ form.costapp_company }}</th>
      </tr>
      <tr>
        <th>申请类型</th>
        <th>{{ form.costapp_application }}</th>
        <th>费用金额</th>
        <th>{{ form.costapp_amount }}</th>
      </tr>
      <tr>
        <th>费用金额(大写)</th>
        <th colspan="3">{{ big_costapp_amount }}</th>
      </tr>
      <tr>
        <th>申请事项</th>
        <th colspan="3">{{ form.costapp_appitem }}</th>
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
      applicant: localStorage.getItem("username"),
      form: this.setform,
      nowtime: getDates(new Date())
    };
  },
  props: {
    setform: {
      type: Object,
      default: () => {
        return {
          costapp_company: "",
          costapp_appitem: "",
          costapp_amount: "",
          costapp_application: ""
        };
      }
    },
    Approvaltable: Array
  },
  // watch: {
  //   setform(val) {
  //     this.form = val;
  //     setTimeout(() => {
  //       //打印
  //       window.print();
  //     }, 50);
  //   }
  // },
  mounted() {
    setTimeout(() => {
      //打印
      window.print();
    }, 50);
  },
  computed: {
    big_costapp_amount() {
      return number_chinese(this.form.costapp_amount);
    }
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
