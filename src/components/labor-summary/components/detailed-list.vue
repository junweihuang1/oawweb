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
        <el-button type="primary" @click="query">
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
      :total="total"
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
      total: 0,
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
  created() {
    this.getTeamList();
  },
  methods: {
    query() {
      this.currentpage = 1;
      this.currentlimit = 15;
      this.getTeamList();
    },
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
        this.total = res.total;
        this.teamList = res.data.map(item => {
          item.construct_project_workTeam_category =
            item.construct_project_workTeam_category == 1
              ? "预埋"
              : item.construct_project_workTeam_category == 2
              ? "消防水"
              : item.construct_project_workTeam_category == 3
              ? "消防电"
              : item.construct_project_workTeam_category == 4
              ? "防排烟"
              : "消防水电";
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
