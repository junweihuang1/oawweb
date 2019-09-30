<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item>
        <select-company @setCompanyName="getCompanyName"></select-company>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="date"
          v-model="start_time"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="date"
          v-model="end_time"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="输入用户名" v-model="username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportToExcel">导出</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="cardRecordList"
      :header="header"
      :setheight="0.6"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setlimit="getlimit"
      @setpage="getpage"
    ></paging>
  </div>
</template>

<script>
import selectCompany from "@/components/Ca-select/select-company.vue";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apiworkerAttendLists } from "@/request/api.js";
import { getDates } from "@/components/global-fn/global-fn";
import http from "@/request/http";
export default {
  name: "cardRecord",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      start_time: getDates(new Date()),
      end_time: getDates(new Date()),
      username: "",
      companyId: "",
      cardRecordList: [],
      header: [
        ["用户编号", "userid", 100],
        ["姓名", "username", 100],
        ["打卡日期", "hr_attend_date", 100],
        ["上班地址", "hr_attend_workAddress", 250],
        ["下班地址", "hr_attend_offWorkAddress", 250],
        ["上班打卡时间", "hr_attend_startWork", 120],
        ["下班打卡时间", "hr_attend_knockOff", 120],
        ["上班打卡状态", "hr_attend_workingState", 120],
        ["下班打卡状态", "hr_attend_restState", 120],
        ["是否加班", "hr_attend_overtime", 100],
        ["加班时长", "hr_attend_overtimeDate", 100],
        ["工作时长", "hr_attend_WTLength", 100],
        ["是否补卡", "hr_attend_overtime", 100],
        ["补卡原因", "hr_attend_remarks", 100]
      ],
      isopen: false,
      queryList: [],
      total: 0
    };
  },
  components: { CaRuleTable, paging, selectCompany },

  mounted() {
    this.getcardRecordList();
  },
  methods: {
    query() {
      this.currentpage = 1;
      this.currentlimit = 15;
      this.getcardRecordList();
    },
    //excel数据导出
    exportToExcel() {
      console.log(
        `${http.base_url}hrattendExcel?company_id=${
          this.companyId
        }&&start_time=${this.start_time}&&end_time=${this.end_time}&&username=${
          this.username
        }`
      );
      window.open(
        `${http.base_url}hrattendExcel?company_id=${
          this.companyId
        }&&start_time=${this.start_time}&&end_time=${this.end_time}&&username=${
          this.username
        }`
      );
      // apiworkerAttendLists({
      //   limit: this.total,
      //   page: this.currentpage,
      //   company_id: this.companyId,
      //   start_time: this.start_time,
      //   end_time: this.end_time,
      //   username: this.username
      // }).then(res => {
      //   this.cardRecordList = res.data;
      //   this.loading = false;
      //   require.ensure([], () => {
      //     const { export_json_to_excel } = require("@/assets/js/Export2Excel");
      //     const tHeader = this.header.map(item => {
      //       return item[0];
      //     });
      //     const filterVal = this.header.map(item => {
      //       return item[1];
      //     });
      //     const list = this.cardRecordList;
      //     const data = this.formatJson(filterVal, list);
      //     export_json_to_excel(tHeader, data, "打卡记录");
      //   });
      // });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    getCompanyName(val) {
      console.log(val);
      this.companyId = val;
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getcardRecordList();
    },
    getpage(val) {
      this.currentpage = val;
      this.getcardRecordList();
    },
    getcardRecordList() {
      apiworkerAttendLists({
        limit: this.currentlimit,
        page: this.currentpage,
        company_id: this.companyId,
        start_time: this.start_time,
        end_time: this.end_time,
        username: this.username
      }).then(res => {
        console.log(res);
        this.total = res.count;
        this.cardRecordList = res.data;
      });
    }
  }
};
</script>
