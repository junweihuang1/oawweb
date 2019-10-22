<template>
  <div>
    <Ca-rule-table
      :DataList="WorkerList"
      :header="header"
      :setheight="0.5"
      :headle="headle"
      @edit="modify"
      @checkleave="checklist"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog
    v-dialogDrag
      :visible.sync="isopenlist"
      top="6vh"
      width="75%"
      :append-to-body="true"
    >
      <dialog-tabs
        v-if="isopenlist"
        :activeForm="activeForm"
        @render="render"
      ></dialog-tabs>
    </el-dialog>
    <el-dialog :visible.sync="isopenmodify" width="20%" :append-to-body="true" v-dialogDrag>
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
import dialogTabs from "@/components/project-operation/dialog-tabs";
import {
  apiprojectDepList,
  apimodprojectDep,
  apisaveprojectDep
} from "@/request/api";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
export default {
  name: "JoinProject",
  data() {
    return {
      projectName: "",
      currentlimit: 15,
      currentpage: 1,
      WorkerList: [],
      total: 0,
      header: [
        ["项目部名称", "constuct_project_dep_name", 110],
        ["项目负责人", "constuct_project_dep_leader"],
        ["合同总金额", "total", 110],
        ["采购成本", "purchaseCost", 110],
        ["人工成本", "laborCost", 110]
      ],
      headle: ["项目列表", "", "修改"],
      categoryList: ["建设项目"],
      activeForm: {},
      isopenmodify: false,
      isopenlist: false,
      category: ""
    };
  },
  components: { CaRuleTable, paging, dialogTabs },
  created() {
    this.getWorkerList();
  },
  methods: {
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
    //提交
    submit() {
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
    },
    checklist(row) {
      console.log(row);
      this.activeForm = row;
      this.isopenlist = true;
    },
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
      this.getWorkerList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getWorkerList();
    },
    getWorkerList() {
      apiprojectDepList({
        constuct_project_dep_company: "3",
        dep_name: this.projectName,
        pageSize: this.currentlimit,
        limit: this.currentpage
      }).then(res => {
        console.log(res);
        this.total = res.total;
        this.WorkerList = res.data;
      });
    }
  }
};
</script>
