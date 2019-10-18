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
      :headle="headle"
      @checkleave="opencardlist"
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
import { apifirmLaborCostTeam } from "@/request/api.js";
export default {
  name: "teamlist",
  data() {
    return {
      currentlimit: 15,
      total: 0,
      currentpage: 1,
      queryYear: "",
      teamList: [],
      header: [
        ["项目", "construct_project_name", 90],
        ["施工项目", "construct_project_workTeam_category", 100],
        ["班组", "username"],
        ["合同总金额", "construct_project_workTeam_amount", 110],
        ["单价（天/人）", "construct_project_workTeam_price", 130],
        ["年度", "firmYear", 75],
        ["1月", "january", 75],
        ["2月", "february", 75],
        ["3月", "march", 75],
        ["4月", "april", 75],
        ["5月", "may", 75],
        ["6月", "June", 75],
        ["7月", "July", 75],
        ["8月", "August", 75],
        ["9月", "September", 75],
        ["10月", "October", 75],
        ["11月", "November", 75],
        ["12月", "december", 75],
        ["累计付款", "totalLaborCost", 100]
      ],
      headle: ["打卡列表"]
    };
  },
  components: {
    CaRuleTable,
    paging
  },

  props: {
    projectId: String
  },
  watch: {
    projectId() {
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
    opencardlist(row) {
      this.$emit("opencardlist", row);
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
        firmYear: this.queryYear,
        projectId: this.projectId,
        pageSize: this.currentlimit,
        limit: this.currentpage
      };
      apifirmLaborCostTeam(data).then(res => {
        console.log(res);
        this.total = res.total;
        this.teamList = res.data.map(item => {
          item.construct_project_workTeam_category =
            item.construct_project_workTeam_category == 2
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
