<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item label="年份">
        <el-date-picker
          type="month"
          value-format="yyyy-MM"
          placeholder="请选择"
          v-model="queryYearMonth"
          clearable
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTeamList">
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :setheight="0.6"
      :DataList="teamList"
      :header="header"
      :setsummary="true"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="15"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apidetailedCard } from "@/request/api.js";
export default {
  name: "detailedList",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      queryYearMonth: "",
      teamList: [],
      header: [
        ["项目", "construct_project_name", 90],
        ["施工项目", "construct_project_workTeam_category", 100],
        ["打卡人", "labor", 100],
        ["上班打卡日期", "hr_attend_date", 130],
        ["上班打卡时间", "hr_attend_startWork", 130],
        ["下班打卡时间", "hr_attend_knockOff", 130],
        ["上班打卡地址", "hr_attend_workAddress"],
        ["下班打卡地址", "hr_attend_offWorkAddress"],
        ["上班打卡状态", "hr_attend_workingState", 130],
        ["下班打卡状态", "hr_attend_restState", 130],
        ["工作时长", "hr_attend_WTLength", 100]
      ]
    };
  },
  components: {
    CaRuleTable,
    paging
  },

  props: {
    workTeamId: String,
    userId: String
  },
  watch: {
    userId() {
      this.getTeamList();
    }
  },
  mounted() {
    this.getTeamList();
  },
  methods: {
    getpage(val) {
      this.currentpage = val;
      this.getTeamList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getTeamList();
    },
    getTeamList() {
      let data = {
        attend_date: this.queryYearMonth,
        userId: this.userId,
        workTeam_id: this.workTeamId,
        pageSize: this.currentlimit,
        limit: this.currentpage
      };
      apidetailedCard(data).then(res => {
        this.teamList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
