<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item label="年份">
        <el-date-picker
          type="year"
          value-format="yyyy"
          placeholder="请选择"
          v-model="queryYear"
          clearable
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="项目">
        <el-input
          placeholder="请输入"
          v-model="projectName"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <!-- <Ca-rule-table
      :DataList="SummaryList"
      :header="header"
      :setsummary="true"
      :headle="headle"
      @checkleave="checkcard"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging> -->
    <print-table
      :setdata="setdata"
      :url="url"
      v-if="isload"
      totalName="total"
      pageName="limit"
      limitName="pageSize"
      :header="header2"
      @checkleave="checkcard"
    ></print-table>
    <dialog-tabs
      :companyId="companyId"
      :departmentid="departmentid"
      :isopen="isopen"
      @closewin="closedialog"
    ></dialog-tabs>
  </div>
</template>

<script>
import http from "@/request/http.js";
import printTable from "@/components/Ca-table/print-table.vue";
import dialogTabs from "./dialog-tabs";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apifirmLaborCost } from "@/request/api.js";
export default {
  name: "SupplierLaborSummary",
  data() {
    return {
      url: http.base_url + "firmLaborCost",
      isload: true,
      queryYear: "",
      projectName: "",
      total: 0,
      setdata: {
        companyId: this.companyId
      },
      currentlimit: 15,
      currentpage: 1,
      SummaryList: [],
      isopen: false,
      // header: [
      //   ["项目部", "constuct_project_dep_name", 90],
      //   ["项目负责人", "constuct_project_dep_leader", 120],
      //   ["合同总金额", "conAmount", 120],
      //   ["单价（天/人）", "construct_project_workTeam_price", 130],
      //   ["年度", "firmYear", 75],
      //   ["1月", "january", 75],
      //   ["2月", "february", 75],
      //   ["3月", "march", 75],
      //   ["4月", "april", 75],
      //   ["5月", "may", 75],
      //   ["6月", "June", 75],
      //   ["7月", "July", 75],
      //   ["8月", "August", 75],
      //   ["9月", "September", 75],
      //   ["10月", "October", 75],
      //   ["11月", "November", 75],
      //   ["12月", "december", 75],
      //   ["累计付款", "totalLaborCost", 100]
      // ],
      header2: [
        [
          //表头
          {
            field: "constuct_project_dep_name",
            title: "项目部",
            width: 100,
            totalRowText: "合计"
          },
          {
            field: "constuct_project_dep_leader",
            title: "项目负责人",
            width: 120
          },
          {
            field: "conAmount",
            title: "合同总金额",
            width: 110,
            totalRow: true
          },
          {
            field: "construct_project_workTeam_price",
            title: "单价(天/人)",
            width: 100
          },
          { field: "firmYear", title: "年度", width: 80 },
          { field: "january", title: "1月", width: 80, totalRow: true },
          { field: "february", title: "2月", width: 80, totalRow: true },
          { field: "march", title: "3月", width: 80, totalRow: true },
          { field: "april", title: "4月", width: 80, totalRow: true },
          { field: "may", title: "5月", width: 80, totalRow: true },
          { field: "June", title: "6月", width: 80, totalRow: true },
          { field: "July", title: "7月", width: 80, totalRow: true },
          { field: "August", title: "8月", width: 80, totalRow: true },
          { field: "September", title: "9月", width: 80, totalRow: true },
          { field: "October", title: "10月", width: 80, totalRow: true },
          { field: "November", title: "11月", width: 80, totalRow: true },
          { field: "december", title: "12月", width: 80, totalRow: true },
          {
            field: "totalLaborCost",
            title: "累计付款",
            width: 90,
            totalRow: true
          },
          {
            fixed: "right",
            title: "操作",
            width: 100,
            align: "center",
            templet: d => {
              return `<button
          class="layui-btn layui-btn-sm"
          lay-event="add"
          @click="file"
        >
          查看打卡
        </button>`;
            }
          }
        ]
      ],
      headle: ["查看打卡"],
      departmentid: ""
    };
  },
  props: {
    companyId: Number
  },
  components: {
    CaRuleTable,
    paging,
    dialogTabs,
    printTable
  },
  created() {
    // this.getSummaryList();
  },
  methods: {
    query() {
      this.setdata = {
        companyId: this.companyId,
        firmYear: this.queryYear,
        constuct_project_dep_name: this.projectName
      };
      this.isload = false;
      this.$nextTick(() => {
        this.isload = true;
      });
      // this.currentpage = 1;
      // this.currentlimit = 15;
      // this.getSummaryList();
    },
    closedialog() {
      this.isopen = false;
      this.$store.state.dialog_openTabs = [false, false, false];
    },
    checkcard(row) {
      this.departmentid = row.constuct_project_dep_id.toString();
      this.isopen = true;
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getSummaryList();
    },
    getpage(val) {
      this.currentpage = val;
      this.getSummaryList();
    },
    getSummaryList() {
      let data = {
        companyId: this.companyId,
        firmYear: this.queryYear,
        constuct_project_dep_name: this.projectName,
        pageSize: this.currentlimit,
        limit: this.currentpage
      };
      apifirmLaborCost(data).then(res => {
        this.total = res.total;
        this.SummaryList = res.data;
      });
    }
  }
};
</script>

<style lang="scss"></style>
