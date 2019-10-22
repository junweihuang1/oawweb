<template>
  <div>
    <el-form label-width="80px" inline>
      <el-form-item label="部门名称">
        <el-input v-model="departmentName" clearable />
      </el-form-item>
      <el-form-item label="中心名称">
        <el-input v-model="centerName" clearable />
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input v-model="companyName" clearable />
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" size="mini" @click="query">查询</el-button>
          <el-button type="success" size="mini" @click="addCompanyInf"
            >新增</el-button
          >
          <el-button type="danger" size="mini" @click="deleteitem"
            >删除</el-button
          >
        </el-button-group>
      </el-form-item>
    </el-form>
    <div style="width:45%;">
      <Ca-rule-table
        :DataList="departmentList"
        :header="headerList"
        :headle="headleList"
        @checkleave="openwindow"
        :setselect="isselect"
        @setselect="getselect"
      ></Ca-rule-table>
      <el-dialog :visible.sync="isopen" title="部门信息" width="30%" v-dialogDrag>
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="部门名称" prop="department_name">
            <el-input
              v-model="form.department_name"
              autofocus="true"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="中心名称" prop="center_name">
            <el-input
              v-model="form.center_name"
              readonly="readonly"
              placeholder="请选择"
              clearable
              @focus="openSelect"
            ></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="company_name">
            <el-input
              v-model="form.company_name"
              :disabled="true"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="order">
            <el-input v-model="form.order" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="modify">提交</el-button>
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
    <select-center
      :isopenSelect="isopenSelect"
      @closewin="closewin"
      @setSelectName="setSelectName"
    ></select-center>
  </div>
</template>

<script>
import selectCenter from "./components/select-center";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import {
  apidepartmentList,
  apisaveDepartment,
  apideleDepartment
} from "@/request/api.js";
export default {
  name: "departmentRecord",
  data() {
    return {
      companyName: "",
      centerName: "",
      departmentName: "",
      isselect: true,
      isopenSelect: false,
      departmentList: [],
      headerList: [
        ["部门编号", "department_id", 100],
        ["部门名称", "department_name"],
        ["排序", "order"],
        ["所属中心", "center_name"],
        ["所属公司", "company_name"]
      ],
      headleList: ["修改"],
      isopen: false,
      form: {},
      selectList: [],
      currentpage: 1,
      currentlimit: 15,
      total: 0
    };
  },
  components: {
    CaRuleTable,
    paging,
    selectCenter
  },
  created() {
    this.getDepartmentInf();
  },
  methods: {
    query() {
      this.currentlimit = 15;
      this.currentpage = 1;
      this.getDepartmentInf();
    },
    //子组件选择中心名称后回调
    setSelectName(row) {
      this.form.center_id = row.center_id;
      this.form.center_name = row.center_name;
      this.form.company_name = row.company_name;
      this.form.company_id = row.company_id;
      this.isopenSelect = false;
    },
    closewin() {
      this.isopenSelect = false;
    },
    openSelect() {
      this.isopenSelect = true;
    },
    getpage(e) {
      this.currentpage = e;
      this.getDepartmentInf();
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getDepartmentInf();
    },
    addCompanyInf() {
      this.form = {
        company_id: "",
        company_name: "",
        center_id: "",
        order: 0,
        center_name: "",
        department_id: "",
        department_name: ""
      };
      this.isopen = true;
    },
    getDepartmentInf() {
      apidepartmentList({
        rows: this.currentlimit,
        page: this.currentpage,
        department_name: this.departmentName,
        center_name: this.centerName,
        company_name: this.companyName
      }).then(res => {
        this.total = res.total;
        this.departmentList = res.rows;
      });
    },
    openwindow(e) {
      this.form = {
        order: e.order,
        company_id: e.company_id,
        company_name: e.company_name,
        center_id: e.center_id,
        center_name: e.center_name,
        department_id: e.department_id,
        department_name: e.department_name
      };
      this.isopen = true;
    },
    modify() {
      console.log(this.form);
      this.$confirm(`确定提交吗？`)
        .then(() => {
          apisaveDepartment({
            department_id: this.form.department_id,
            department_name: this.form.department_name,
            department_centerId: this.form.center_id,
            department_companyId: this.form.company_id,
            order: this.form.order
          }).then(res => {
            console.log(res);
            this.$message.success(res.msg);
            this.isopen = false;
            this.getDepartmentInf();
          });
        })
        .catch(() => {});
    },
    deleteitem() {
      if (this.selectList == "") {
        this.$message.error("请选择部门");
        return;
      }
      console.log(JSON.stringify(this.selectList));
      this.$confirm(`确定删除吗？`)
        .then(() => {
          apideleDepartment({
            ids: JSON.stringify(this.selectList)
          }).then(res => {
            this.$message.success(res.msg);
            this.getDepartmentInf();
          });
        })
        .catch(() => {});
    },
    getselect(val) {
      this.selectList = val.map(item => item.department_id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
