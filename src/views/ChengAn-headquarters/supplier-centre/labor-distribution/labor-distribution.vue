<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="项目名称">
        <el-input v-model="projectName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { apiworkerConList } from "@/request/api";
export default {
  name: "laborDis",
  data() {
    return {
      projectName: "",
      laborList: [],
      currentpage: 1,
      currentlimit: 15,
      header: [
        ["项目名称", ""],
        ["工程地址", ""],
        ["项目经理", ""],
        ["项目经理联系方式", ""],
        ["施工项目", ""],
        ["班组", ""]
      ]
    };
  },
  mounted() {
    this.getloborList();
  },
  methods: {
    getloborList() {
      apiworkerConList({
        rows: this.currentlimit,
        page: this.currentpage,
        construct_project_name: this.projectName
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
