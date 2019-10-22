<template>
  <div>
    <el-form label-width="80px" inline>
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

    <Ca-rule-table
      style="width:30%;"
      :DataList="companyList"
      :header="headerList"
      :headle="headleList"
      @checkleave="openwindow"
      :setselect="isselect"
      @setselect="getselect"
    ></Ca-rule-table>
    <paging
      @setlimit="getlimit"
      @setpage="getpage"
      :total="total"
      :currentpage="currentpage"
      :currentlimit="currentlimit"
    ></paging>
    <el-dialog :visible.sync="isopen" title="公司信息" width="30%" v-dialogDrag>
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="新公司名称">
          <el-input v-model="form.company_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.order" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import {
  apicompanyList,
  apisaveCompany,
  apideleCompany
} from "@/request/api.js";
export default {
  name: "companyRecord",
  data() {
    return {
      companyName: "",
      isselect: true,
      companyList: [],
      headerList: [
        ["公司编号", "company_id", 100],
        ["公司名称", "company_name", 120],
        ["排序", "order", 100]
      ],
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
    //增加公司
    addCompanyInf() {
      this.form = {
        company_id: "",
        company_name: "",
        order: ""
      };
      this.isopen = true;
    },
    //获取所有公司信息
    getCompanyInf() {
      apicompanyList({
        rows: this.currentlimit,
        page: this.currentpage,
        companyname: this.companyName
      }).then(res => {
        this.total = res.total;
        this.companyList = res.data;
      });
    },
    //打开编辑窗口
    openwindow(e) {
      this.form = {
        company_id: e.company_id,
        company_name: e.company_name,
        order: e.order
      };
      this.isopen = true;
    },
    submit() {
      this.$confirm(`确定提交吗？`)
        .then(() => {
          apisaveCompany(this.form).then(res => {
            this.$message.success(res.data);
            this.isopen = false;
            this.getCompanyInf();
          });
        })
        .catch(() => {});
    },
    //删除
    deleteitem() {
      if (this.selectList == "") {
        this.$message.error("请选择公司");
        return;
      }
      this.$confirm(`确定删除吗？`)
        .then(() => {
          apideleCompany({
            ids: JSON.stringify(this.selectList)
          }).then(() => {
            this.$message.success("删除成功");
            this.getCompanyInf();
          });
        })
        .catch(() => {});
    },
    getselect(val) {
      this.selectList = val.map(item => item.company_id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
