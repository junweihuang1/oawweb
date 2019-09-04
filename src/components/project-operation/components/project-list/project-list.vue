<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="项目名称">
        <el-input v-model="projectName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button
            type="primary"
            class="el-icon-edit"
            @click="checkProject('modify')"
            >修改项目</el-button
          >
          <el-button
            type="primary"
            class="el-icon-plus"
            @click="checkProject('add')"
            >新增项目</el-button
          >
          <el-button
            type="primary"
            class="el-icon-search"
            @click="checkProject('check')"
            >查看项目</el-button
          >
          <el-button
            type="primary"
            class="el-icon-document"
            @click="checkProject('purchase')"
            >采购申请列表</el-button
          >
          <el-button type="primary" @click="checkProject('contract')"
            >合同工程量</el-button
          >
          <el-button type="primary" @click="checkProject('request')"
            >请款进度</el-button
          >
          <!-- <el-button type="primary" @click="checkProject">领款申请</el-button>
          <el-button type="primary" @click="checkProject">领款列表</el-button>
          <el-button type="primary" @click="checkProject">保养项目</el-button>
          <el-button type="primary" @click="checkProject"
            >保养项目内容</el-button
          > -->
        </el-button-group>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="lists"
      :header="header"
      @oneselect="oneselect"
      :setheight="0.5"
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
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apiprojectdetail } from "@/request/api.js";
export default {
  name: "projectList",
  data() {
    return {
      total: 0,
      currentlimit: 15,
      currentpage: 1,
      projectName: "",
      lists: [],
      header: [
        ["项目编号", "construct_project_id", 100],
        ["项目名称", "manage_contract_name", 280],
        ["甲方", "manage_contract_firstParty"],
        ["工程地址", "manage_contract_address", 150],
        ["项目经理", "construct_project_leader", 100],
        ["项目经理联系方式", "construct_project_leaderTel", 160],
        ["项目开始时间", "manage_contract_startTime", 140],
        ["项目结束时间", "manage_contract_endTime", 140]
      ],
      activeitem: Object
    };
  },
  components: {
    paging,
    CaRuleTable
  },
  props: {
    activeForm: Object
  },
  mounted() {
    this.getdetails();
  },
  methods: {
    //查看项目
    checkProject(type) {
      if (this.activeitem === Object && type !== "add") {
        this.$message.warning("请选择项目");
      } else {
        console.log(this.activeitem);
        this.$emit("openProject", [type, this.activeitem]);
      }
    },
    //获取单选的数据
    oneselect(val) {
      this.activeitem = val;
    },
    getpage(val) {
      this.currentpage = val;
      this.getProjectList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getProjectList();
    },
    getdetails() {
      apiprojectdetail({
        constuct_project_dep_id: this.activeForm.constuct_project_dep_id,
        construct_project_name: this.activeForm.construct_project_name,
        pageSize: this.currentlimit,
        limit: this.currentpage
      }).then(res => {
        console.log(res);
        this.total = res.total;
        this.lists = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
