<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item label="姓名">
        <el-input v-model="userName" placeholder="请输入" clearable> </el-input>
      </el-form-item>
      <el-form-item label="月份">
        <el-date-picker
          type="month"
          format="yyyy-MM"
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
      style="width:70%;"
      :setheight="0.6"
      :DataList="workerList"
      :header="header"
      :setsummary="true"
      :headle="headle"
      @checkleave="opendetaillist"
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
import { apifirmLaborCostPerson } from "@/request/api.js";
export default {
  name: "workerlist",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      userName: "",
      queryYearMonth: "",
      workerList: [],
      header: [
        ["项目", "construct_project_name"],
        ["施工项目", "construct_project_workTeam_category", 100],
        ["打卡人", "username", 100],
        ["打卡年月", "yearMon"],
        ["出勤天数", "attendanceDays", 130],
        ["实际工作时长", "hr_attend_WTLength", 130],
        ["单价", "january", 90],
        ["应发工资", "wage", 100]
      ],
      headle: ["打卡详情"]
    };
  },
  components: {
    CaRuleTable,
    paging
  },

  props: {
    teamId: String
  },
  watch: {
    teamId() {
      this.getTeamList();
    }
  },
  mounted() {
    this.getTeamList();
  },
  methods: {
    opendetaillist(row) {
      this.$emit("opendetaillist", row);
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
        userName: this.userName,
        workTeam_id: this.teamId,
        pageSize: this.currentlimit,
        limit: this.currentpage
      };
      apifirmLaborCostPerson(data).then(res => {
        console.log(res);
        this.workerList = res.data.map(item => {
          item.construct_project_workTeam_category =
            item.construct_project_workTeam_category == 2
              ? "消防水"
              : item.construct_project_workTeam_category == 3
              ? "消防电"
              : "防排烟";
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
