<template>
  <div style="width:55%;">
    <el-form :model="form" label-width="80px" inline
      ><el-form-item label="节点名字" size="mini"
        ><el-input v-model="form.uc_framework_name"></el-input
      ></el-form-item>
      <el-form-item label="公司" size="mini"
        ><el-input v-model="form.uc_framework_name"></el-input
      ></el-form-item>
      <el-form-item size="mini">
        <el-button type="success">查询</el-button>
        <el-button type="success" @click="addFrameWork">添加</el-button>
      </el-form-item>
    </el-form>
    <div>
      <Ca-rule-table
        :DataList="tableData"
        :header="header"
        :headle="headle"
        @checkleave="modifyitem"
        @delete="deleteitem"
      ></Ca-rule-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[15, 30, 50, 100]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="200"
    >
    </el-pagination>
    <el-dialog :visible.sync="ismodify" width="20%" title="总裁办信息编辑">
      <el-form :model="dialogForm" ref="dialogForm" label-width="80px">
        <el-form-item label="公司">
          <el-select
            v-model="dialogForm.company_name"
            placeholder="请选择"
            clearable
            filterable
          >
            <el-option
              v-for="item in companyList"
              :key="item.company_id"
              :label="item.company_name"
              :value="item.company_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名字">
          <el-input v-model="dialogForm.uc_framework_name"></el-input>
        </el-form-item>
        <el-form-item label="上一级">
          <el-input v-model="dialogForm.lastLev"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="dialogForm.uc_framework_describe"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" plain>确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import {
  apiframeWorkList,
  apidelframeWork,
  apiaddframeWork,
  apigetAllCompanyInfo
} from "@/request/api.js";
import Axios from "axios";
export default {
  name: "CeoOffice",
  data() {
    return {
      form: {
        uc_framework_name: "",
        company_name: ""
      },
      ismodify: false,
      dialogForm: {},
      tableData: [],
      limit: 15,
      page: 1,
      header: [
        ["公司", "company_name", 120],
        ["名字", "uc_framework_name", 120],
        ["上一级", "lastLev", 120],
        ["描述", "uc_framework_describe"]
      ],
      headle: ["修改", "删除"],
      companyList: []
    };
  },
  components: {
    CaRuleTable
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      apiframeWorkList({
        rows: this.limit,
        page: this.page
      })
        .then(res => {
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getDataList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getDataList();
    },
    deleteitem(e) {
      // Axios.get("http://192.168.11.124:8081/casd2/admin/getAllCompanyInfo", {
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //     token: localStorage.getItem("token")
      //   }
      // }).then(res => {
      //   console.log(res);
      // });
      //   apigetAllCenterInfo().then(res => {
      //     console.log(res);
      //   });
      this.$confirm("确定删除").then(_ => {
        apidelframeWork({
          ids: e.uc_framework_id
        }).then(res => {
          console.log(res);
        });
      });
    },
    modifyitem(e) {
      if (this.companyList == "") {
        this.getCompanyList();
      }
      console.log(e);
      this.dialogForm = {
        company_name: e.company_name,
        company_id: e.company_id,
        lastLev: e.lastLev,
        uc_framework_id: e.uc_framework_id,
        uc_framework_company: e.uc_framework_company,
        uc_framework_describe: e.uc_framework_describe,
        uc_framework_name: e.uc_framework_name,
        uc_framework_parentId: e.uc_framework_parentId
      };
      this.ismodify = true;
    },
    addFrameWork() {
      if (this.companyList == "") {
        this.getCompanyList();
      }
      this.form = {};
      this.ismodify = true;
    },
    getCompanyList() {
      apigetAllCompanyInfo().then(res => {
        this.companyList = res.date;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
