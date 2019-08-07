<template>
  <div>
    <el-form label-width="40px" inline size="mini">
      <el-form-item label="年度">
        <el-input v-model="yearNum" />
      </el-form-item>
      <el-form-item label="公司">
        <el-input v-model="companyName" />
      </el-form-item>
      <el-form-item label="中心">
        <el-input v-model="centerName" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="queryCompanyInf"
          >查询</el-button
        >
      </el-form-item>
    </el-form>

    <Ca-rule-table
      style="width:40%;"
      :DataList="targetList"
      :header="headerList"
    ></Ca-rule-table>
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
      headerList: [["公司", "company_name"], ["中心", "center_name"]],
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
  mounted() {
    this.getCompanyInf();
  },
  methods: {
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
    queryCompanyInf() {
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
      })
        .then(res => {
          console.log(res);
          this.targetList = res.data;
        })
        .catch(err => {
          console.log(err);
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
