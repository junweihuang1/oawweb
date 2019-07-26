<template>
  <div>
    <Ca-rule-table :DataList="wageslist" :header="header"></Ca-rule-table>
    <paging
      :curentepage="currentpage"
      :currentlimit="currentlimit"
      :total="15"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apiuserWagesLibs1 } from "@/request/api.js";
export default {
  name: "wageSlip",
  data() {
    return {
      currentpage: 1,
      currentlimit: 15,
      header: [
        ["用户名", "username"],
        ["日期", "uc_wage_yearMon"],
        ["出勤天数", "finance_wages_attCount"],
        ["休假天数", "finance_wages_vacaCount"],
        ["请假天数", "finance_wages_leaveCount"],
        ["实际出勤", "uc_wage_actualDay"],
        ["基本工资", "uc_wage_base"],
        ["岗位工资", "uc_wage_post"],
        ["绩效工资", "uc_wage_achieve"],
        ["津贴补助", "uc_wage_subsidy"],
        ["考勤扣除", "uc_wage_dedu"],
        ["应发小计", "uc_wage_baseTotal"],
        ["代扣社保", "uc_wage_socSec"],
        ["公积金", "uc_wage_accFund"],
        ["扣除小计", ""],
        ["代扣个税", "uc_wage_tax"],
        ["实发工资", "uc_wage_realhair"]
      ],
      wageslist: []
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    this.getWagesList();
  },
  methods: {
    getpage(e) {
      this.currentpage = e;
      this.getWagesList();
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getWagesList();
    },
    getWagesList() {
      apiuserWagesLibs1({
        page: this.currentpage,
        limit: this.currentlimit
      }).then(res => {
        console.log(res);
        this.wageslist = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
