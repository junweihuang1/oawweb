<template>
  <div>
    <el-form label-width="40px" inline size="mini">
      <el-form-item label="年度">
        <el-input v-model="yearNum" clearable />
      </el-form-item>
      <el-form-item label="公司">
        <el-input v-model="companyName" clearable />
      </el-form-item>
      <el-form-item label="中心">
        <el-input v-model="centerName" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table :DataList="targetList" :header="headerList"></Ca-rule-table>
    <paging
      @setlimit="getlimit"
      @setpage="getpage"
      :total="total"
      :currentpage="currentpage"
      :currentlimit="currentlimit"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import {
  apiownGoalReport,
  apiownGoalList,
  apisaveownGoal,
  apifinishOwnGoal
} from "@/request/api.js";
export default {
  name: "targetManage",
  data() {
    return {
      yearNum: "",
      centerName: "",
      companyName: "",
      isselect: true,
      targetList: [],
      headerList: [
        ["公司", ""],
        ["中心", ""],
        ["姓名", ""],
        ["年度", ""],
        ["总数", ""],
        ["未完成工作目标", ""],
        ["完成工作目标", ""],
        ["完成生活目标", ""],
        ["未完成生活目标", ""],
        ["生活目标完成率", ""],
        ["工作目标完成率", ""],
        ["目标完成率", ""]
      ],
      form: {},
      selectList: [],
      currentpage: 1,
      currentlimit: 15,
      total: 7
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  created() {
    this.getCompanyInf();
  },
  methods: {
    query() {
      this.currentlimit = 15;
      this.currentpage = 1;
      this.getCompanyInf();
    },
    //获取当前页数
    getpage(e) {
      this.currentpage = e;
      this.getCompanyInf();
    },
    //获取当前页显示数量
    getlimit(e) {
      this.currentlimit = e;
      this.getCompanyInf();
    },
    //获取目标信息
    getCompanyInf() {
      apiownGoalReport({
        yearNum: this.yearNum,
        rows: this.currentlimit,
        page: this.currentpage,
        company: this.companyName,
        center: this.centerName
      }).then(res => {
        console.log(res);
        this.total = res.total;
        this.targetList = res.data;
      });
    },
    deleteitem() {
      if (this.selectList == "") {
        this.$message.error("请选择公司");
        return;
      }
      //   apideleCompany({
      //     ids: this.selectList
      //   }).then(res => {
      //     console.log(res);
      //   });
    },
    getselect(val) {
      this.selectList = val.map(item => item.company_id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
