<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item>
        <el-select v-model="company_id" placeholder="请选择公司">
          <el-option
            v-for="item in companyList"
            :key="item.company_id"
            :label="item.company_name"
            :value="item.company_id"
          >
          </el-option
        ></el-select>
      </el-form-item>
      <el-form-item
        ><el-input v-model="userName" placeholder="用户名"></el-input
      ></el-form-item>
      <el-form-item
        ><el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="openwin">历史</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="CostsList"
      :header="header"
      :headle="headle"
      @checkleave="file"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      @setpage="getpage"
      @setlimit="getlimit"
      :total="total"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import { apiuserWagesLists, apisave_userWages } from "@/request/api.js";
export default {
  name: "LaborCosts",
  data() {
    return {
      currentpage: 1,
      currentlimit: 15,
      total: 50,
      userName: "",
      companyList: [
        { company_id: 12, company_name: "诚安时代" },
        { company_id: 13, company_name: "传诚管理" },
        { company_id: 14, company_name: "诚安科技" },
        { company_id: 15, company_name: "传诚教育" },
        { company_id: 16, company_name: "诚安建设" }
      ],
      company_id: "",
      header: [
        ["中心名", "center_name", 110],
        ["用户名", "username", 90],
        ["出勤天数", "finance_wages_attCount", 100],
        ["休假天数", "", 100],
        ["请假天数", "finance_wages_leaveCount", 100],
        ["实际出勤", "actualDay", 100],
        ["基本工资", "uc_wage_base", 100],
        ["岗位工资", "uc_wage_post", 100],
        ["绩效工资", "uc_wage_achieve", 100],
        ["津贴补助", "uc_wage_subsidy", 100],
        ["考勤扣除", "uc_wages_dedu", 100],
        ["应发小计", "grosspay", 100],
        ["代扣社保", "uc_wage_socSec", 100],
        ["公积金", "", 100],
        ["扣除小计", "", 100],
        ["代扣个税", "uc_wage_tax", 100],
        ["实发工资", "net_payment", 100]
      ],
      CostsList: [],
      headle: ["存档"]
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    this.getCostsList();
  },
  methods: {
    openwin() {
      this.$store.commit("addTabs", {
        route: "/History",
        title: "历史人员成本",
        id: "201"
      });
      this.$store.commit("changeActiveIndex", "201");
      this.$router.push({
        path: "/History"
      });
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getCostsList();
    },
    getpage(e) {
      this.currentpage = e;
      this.getCostsList();
    },
    file(row) {
      let data = {
        finance_wages_vacaCount: "", //休假天数；
        uc_wages_dedu: "", //(必填)：考勤扣除；
        uc_wages_baseTotal: "", //(必填)：应发小计
        uc_wage_tax: "", //(必填)：代扣个税
        uc_wage_realhair: "", //(必填)：实发工资
        company_name: "", //必填)：公司名称
        userid: "", //必填)：用户id;
        uc_wage_actualDay: "", //必填)：实际出勤天数
        uc_wage_center_name: "" //必填)：中心名称；
      };
      console.log(row);
      // apisave_userWages(row).then(res => {
      //   console.log(res);
      // });
    },
    query() {
      this.getCostsList();
    },
    getCostsList() {
      let data = {
        limit: this.currentlimit,
        page: this.currentpage,
        username: this.userName,
        company_id: this.company_id
      };
      apiuserWagesLists(data).then(res => {
        console.log(res);
        this.CostsList = res.data.map(item => {
          item.grosspay =
            item.uc_wage_post + item.uc_wage_base + item.uc_wage_subsidy;
          item.net_payment =
            item.grosspay - item.uc_wage_tax - item.uc_wage_socSec;
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
