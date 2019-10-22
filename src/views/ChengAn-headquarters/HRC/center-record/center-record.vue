<template>
  <div>
    <el-form label-width="80px" inline>
      <el-form-item label="中心名称">
        <el-input v-model="centerName" clearable />
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" size="mini" @click="query">查询</el-button>
          <el-button type="success" size="mini" @click="addCenterInf"
            >新增</el-button
          >
          <el-button type="danger" size="mini" @click="deleteitem"
            >删除</el-button
          >
        </el-button-group>
      </el-form-item>
    </el-form>

    <Ca-rule-table
      style="width:40%;"
      :DataList="centerList"
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
    <el-dialog :visible.sync="isopen" title="中心信息" width="25%" v-dialogDrag>
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="中心名称">
          <el-input v-model="form.center_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <select-company
            @setCompanyName="getCompanyName"
            :companyId="form.company_id"
          ></select-company>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.order" clearable type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="modify">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import selectCompany from "@/components/Ca-select/select-company";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import { apicenterHome, apisaveCenter, apideleCenter } from "@/request/api.js";
export default {
  name: "companyRecord",
  data() {
    return {
      centerName: "",
      isselect: true,
      centerList: [],
      companyList: [],
      headerList: [
        ["中心编号", "center_id", 100],
        ["中心名称", "center_name"],
        ["排序", "order"],
        ["所属公司", "company_name"]
      ],
      headleList: ["修改"],
      isopen: false,
      form: {},
      selectList: [],
      currentpage: 1,
      currentlimit: 15,
      total: 20,
      companyPage: 1,
      companyrows: 15
    };
  },
  components: {
    CaRuleTable,
    paging,
    selectCompany
  },
  created() {
    this.getCenterInf();
  },
  methods: {
    getCompanyName(row) {
      this.form.company_id = row.company_id;
    },
    getpage(e) {
      this.currentpage = e;
      this.getCenterInf();
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getCenterInf();
    },
    addCenterInf() {
      this.form = {
        company_id: "",
        company_name: "",
        center_name: "",
        order: 0,
        center_id: ""
      };
      this.isopen = true;
    },
    query() {
      this.currentlimit = 15;
      this.currentpage = 1;
      this.getCenterInf();
    },
    getCenterInf() {
      apicenterHome({
        rows: this.currentlimit,
        page: this.currentpage,
        center_name: this.centerName
      }).then(res => {
        console.log(res);
        this.total = res.total;
        this.centerList = res.data;
      });
    },
    openwindow(e) {
      console.log(e);
      this.form = {
        company_id: e.company_id,
        company_name: e.company_name,
        center_name: e.center_name,
        center_id: e.center_id,
        order: e.order
      };
      this.isopen = true;
    },
    modify() {
      let data = {
        center_id: this.form.center_id,
        center_name: this.form.center_name,
        center_companyId: this.form.company_id,
        order: this.form.order
      };
      console.log(data);
      this.$confirm(`确定提交吗？`)
        .then(() => {
          apisaveCenter(data).then(res => {
            this.$message.success(res.msg);
            this.getCenterInf();
            this.isopen = false;
          });
        })
        .catch(() => {});
    },
    deleteitem() {
      if (this.selectList == "") {
        this.$message.error("请选择中心");
        return;
      }
      console.log(JSON.stringify(this.selectList));
      this.$confirm(`确定删除吗？`)
        .then(() => {
          apideleCenter({
            ids: JSON.stringify(this.selectList)
          }).then(res => {
            this.$message.success(res.msg);
            this.getCenterInf();
            console.log(res);
          });
        })
        .catch(() => {});
    },
    getselect(val) {
      this.selectList = val.map(item => item.center_id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
