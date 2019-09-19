// 选择供应商组件
<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="项目名称">
        <el-input v-model="workerName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getworkerList">搜索</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :setheight="0.5"
      :header="header"
      :DataList="workerList"
      @dblclick="dblclick"
    ></Ca-rule-table>
    <paging
      :currentpage="currentPage"
      :currentlimit="currentlimit"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import { apiworkerCheck } from "@/request/api.js";
export default {
  name: "selectProject",
  data() {
    return {
      currentPage: 1,
      currentlimit: 15,
      total: 0,
      workerList: [],
      header: [
        ["员工编号", "userid", 110],
        ["员工名称", "username", 120],
        ["联系方式", "phone_number", 90],
        ["性别", "sex2"],
        ["部门", "department_name", 110]
      ],
      workerName: ""
    };
  },
  watch: {},
  components: {
    CaRuleTable,
    paging
  },
  props: {
    Inforlist: Object
  },
  mounted() {
    this.getworkerList();
  },
  methods: {
    getlimit(e) {
      this.currentlimit = e;
      this.getworkerList();
    },
    getpage(e) {
      this.currentPage = e;
      this.getworkerList();
    },
    //双击选择项目
    dblclick(row) {
      this.$emit("setWorker", row);
    },
    getworkerList() {
      apiworkerCheck({
        rows: this.currentlimit,
        page: this.currentPage,
        username: this.workerName,
        departmentId: this.Inforlist.department
      }).then(res => {
        console.log(res);
        this.total = res.total;
        this.workerList = res.rows.map(item => {
          item.sex2 = item.sex == 1 ? "男" : "女";
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
