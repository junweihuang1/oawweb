<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="工人名字">
        <el-input v-model="workerName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="success" @click="openadd">添加</el-button>
          <el-button type="primary" @click="allremove">批量调动</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :setselect="true"
      @setselect="getselect"
      :setheight="0.5"
      :DataList="teamList"
      :header="header"
      :headle="headle"
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
import { apiworkerList } from "@/request/api";
export default {
  name: "teamInfor",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      workerName: "",
      teamList: [],
      header: [
        ["用户id", "userid"],
        ["姓名", "username"],
        ["电话", "phone_number"],
        ["性别", "sex2"],
        ["状态", "status2"]
      ],
      headle: ["调动申请", "", "调动记录"],
      summary: [],
      idarr: [],
      namearr: []
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  props: {
    Inforlist: Object
  },
  mounted() {
    this.getTeamList();
  },
  methods: {
    //批量调动
    allremove() {
      if (this.idarr == "") {
        this.$message.warning("请选择需要调动的人员");
        return;
      }
      this.$emit("openmove", [this.idarr, this.namearr]);
    },
    getselect(row) {
      this.namearr = row.map(item => item.username);
      this.idarr = row.map(item => item.userid);
    },
    getWorker(row) {
      console.log(row);
    },
    openadd() {
      this.$emit("openadd");
    },
    query() {
      this.teamList = this.summary.filter(item => {
        return item.username.indexOf(this.workerName) !== -1;
      });
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
      apiworkerList({
        rows: this.currentlimit,
        page: this.currentpage,
        construct_project_id: this.Inforlist.construct_project_id,
        construct_project_workTeam_id: this.Inforlist
          .construct_project_workTeam_id
      }).then(res => {
        console.log(res);
        this.teamList = res.rows.map(item => {
          item.sex2 = item.sex == 1 ? "男" : "女";
          item.status2 = item.status == 1 ? "可调动" : "不可调动";
          return item;
        });
        this.summary = [].concat(this.teamList);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
