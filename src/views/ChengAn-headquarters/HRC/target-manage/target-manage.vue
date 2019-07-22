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
      <el-form-item>
        <el-button type="success" size="mini" @click="addCompanyInf"
          >新增</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="danger" size="mini" @click="deleteitem"
          >删除</el-button
        >
      </el-form-item>
    </el-form>

    <Ca-rule-table
      style="width:40%;"
      :DataList="targetList"
      :header="headerList"
      :headle="headleList"
      @checkleave="openwindow"
      :setselect="isselect"
      @setselect="getselect"
    ></Ca-rule-table>
    <el-dialog :visible.sync="isopen" title="公司信息" width="30%">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item
          label="原公司名称"
          prop="old_name"
          v-if="form.old_name != ''"
        >
          <el-input v-model="form.old_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="新公司名称" prop="company_name">
          <el-input v-model="form.company_name" autofocus="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="modify">提交</el-button>
          <el-button type="danger" @click="exit">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
import axios from "axios";
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
      headleList: ["修改"],
      isopen: false,
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
    addCompanyInf() {
      this.form = {
        company_id: "",
        company_name: "",
        old_name: ""
      };
      this.isopen = true;
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
    //打开信息编辑窗口
    openwindow(e) {
      this.form = {
        company_id: e.company_id,
        company_name: e.company_name,
        old_name: e.company_name
      };
      this.isopen = true;
    },
    //提交修改信息
    modify() {
      //   apisaveCompany({
      //     company_id: this.form.company_id,
      //     company_name: this.form.company_name
      //   }).then(res => {
      //     console.log(res);
      //     this.targetList.forEach(item => {
      //       if (item.company_id == this.form.company_id) {
      //         item.company_name = this.form.company_name;
      //       }
      //     });
      //     this.$message.success("修改成功");
      //     setTimeout(() => {
      //       this.form.old_name = this.form.company_name;
      //       this.isopen = false;
      //     }, 1500);
      //   });
    },
    exit() {
      this.form.company_name = this.form.old_name;
      this.isopen = false;
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
