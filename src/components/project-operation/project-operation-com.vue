<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="项目部名称">
        <el-input v-model="projectName" clearable></el-input>
      </el-form-item>
      <el-form-item label="年度">
        <el-select v-model="years" clearable>
          <el-option
            v-for="(item, index) in yearList"
            :key="index"
            :value="item"
            :label="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="success" @click="additem">新增</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item v-if="openType">
        <el-radio-group v-model="mycompanyId" @change="query">
          <el-radio-button :label="2">改造项目</el-radio-button>
          <el-radio-button :label="4">保养项目</el-radio-button>
          <el-radio-button :label="5">检测项目</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      style="width:60%"
      :DataList="projectList"
      :headle="headle"
      :header="header"
      @edit="modify"
      @checkleave="checklist"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setlimit="getlimit"
      @setpage="getpage"
    ></paging>
    <el-dialog :visible.sync="isopenlist" top="6vh" width="75%">
      <dialog-tabs
        v-if="isopenlist"
        :activeForm="activeForm"
        @render="render"
      ></dialog-tabs>
    </el-dialog>
    <el-dialog :visible.sync="isopenmodify" width="20%">
      <div style="width:90%;">
        <el-form label-width="90px" size="mini" label-position="left">
          <el-form-item label="分类">
            <el-select v-model="category">
              <el-option
                v-for="(item, index) in categoryList"
                :value="item"
                :key="index"
                :label="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目部名称">
            <el-input v-model="activeForm.constuct_project_dep_name"></el-input>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input
              v-model="activeForm.constuct_project_dep_leader"
            ></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" @click="submit">
              提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dialogTabs from "./dialog-tabs";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import {
  apiprojectDepList,
  apisaveprojectDep,
  apimodprojectDep
} from "@/request/api.js";
export default {
  name: "projectOperation",
  data() {
    return {
      total: 0,
      projectName: "",
      currentpage: 1,
      currentlimit: 15,
      years: "",
      yearList: [],
      projectList: [],
      header: [
        ["项目部名称", "constuct_project_dep_name", 110],
        ["项目负责人", "constuct_project_dep_leader"],
        ["合同总金额", "total", 110],
        ["采购成本", "purchaseCost", 110],
        ["人工成本", "laborCost", 110]
      ],
      headle: ["项目列表", "", "修改"],
      isopenlist: false,
      activeForm: {},
      isopenmodify: false,
      categoryList: ["建设项目"],
      category: "建设项目",
      mycompanyId: this.companyId
    };
  },
  props: {
    companyId: Number,
    openType: String
  },
  components: {
    CaRuleTable,
    paging,
    dialogTabs
  },
  watch: {
    companyId(val) {
      this.mycompanyId = val;
    }
  },
  mounted() {
    this.getProjectList();
    let now = new Date();
    let nowYear = now.getFullYear();
    for (nowYear; nowYear >= 2016; nowYear--) {
      this.yearList.push(nowYear);
    }
  },
  methods: {
    query() {
      this.currentpage = 1;
      this.currentlimit = 15;
      this.getProjectList();
    },
    render() {
      this.isopenlist = false;
      //路由重定向到待办页
      if (this.$store.openTabs.some(item => item.id != "51")) {
        this.$store.commit("addTabs", {
          route: "/to-do",
          title: "待办事项",
          id: "51"
        });
      }
      this.$store.commit("changeActiveIndex", "51");
      this.$router.push({
        path: "/to-do"
      });
    },
    //新增
    additem() {
      this.activeForm = {
        constuct_project_dep_company: this.companyId
      };
      this.isopenmodify = true;
    },
    //提交
    submit() {
      this.$confirm(`确定提交吗？`)
        .then(() => {
          if (
            this.activeForm.constuct_project_dep_id &&
            this.activeForm.constuct_project_dep_id != ""
          ) {
            apimodprojectDep(this.activeForm).then(res => {
              this.$message.success(res.msg);
              this.isopenmodify = false;
              this.getProjectList();
            });
          } else {
            apisaveprojectDep(this.activeForm).then(res => {
              this.$message.success(res.msg);
              this.isopenmodify = false;
              this.getProjectList();
            });
          }
        })
        .catch(() => {});
    },
    //修改项目
    modify(row) {
      this.activeForm = {
        constuct_project_dep_id: row.constuct_project_dep_id,
        constuct_project_dep_name: row.constuct_project_dep_name,
        constuct_project_dep_leader: row.constuct_project_dep_leader,
        constuct_project_dep_company: this.companyId
      };
      this.isopenmodify = true;
    },
    getpage(val) {
      this.currentpage = val;
      this.getProjectList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getProjectList();
    },
    checklist(row) {
      console.log(row);
      this.activeForm = row;
      this.isopenlist = true;
    },
    getProjectList() {
      apiprojectDepList({
        constuct_project_dep_company: this.mycompanyId,
        dep_name: this.projectName,
        pageSize: this.currentlimit,
        limit: this.currentpage
      }).then(res => {
        this.total = res.total;
        this.projectList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
