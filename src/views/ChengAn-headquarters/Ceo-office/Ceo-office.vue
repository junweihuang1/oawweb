<template>
  <div style="width:55%;">
    <el-form inline size="mini"
      ><el-form-item label="节点名字"
        ><el-input v-model="framework_name" clearable></el-input
      ></el-form-item>
      <el-form-item label="公司"
        ><el-input v-model="company_name" clearable></el-input
      ></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getDataList">查询</el-button>
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
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="50"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog :visible.sync="ismodify" width="20%" title="总裁办信息编辑">
      <el-form :model="dialogForm" ref="dialogForm" label-width="80px">
        <el-form-item label="公司">
          <el-select
            v-model="dialogForm.uc_framework_company"
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
          <el-button type="success" @click="submit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import {
  apiframeWorkList,
  apidelframeWork,
  apiaddframeWork,
  apigetAllCompanyInfo
} from "@/request/api.js";
export default {
  name: "CeoOffice",
  data() {
    return {
      framework_name: "",
      company_name: "",
      ismodify: false,
      dialogForm: {},
      tableData: [],
      currentlimit: 15,
      currentpage: 1,
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
    CaRuleTable,
    paging
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    submit() {
      apiaddframeWork(this.dialogForm).then(res => {
        console.log(res);
      });
    },
    getDataList() {
      apiframeWorkList({
        rows: this.currentlimit,
        page: this.currentpage,
        framework_name: this.framework_name,
        company: this.company_name
      })
        .then(res => {
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getDataList();
    },
    getpage(val) {
      this.currentpage = val;
      this.getDataList();
    },
    deleteitem(e) {
      this.$confirm("确定删除?")
        .then(() => {
          apidelframeWork({
            ids: e.uc_framework_id
          }).then(res => {
            console.log(res);
          });
        })
        .catch(() => {});
    },
    modifyitem(e) {
      if (this.companyList == "") {
        this.getCompanyList();
      }
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
