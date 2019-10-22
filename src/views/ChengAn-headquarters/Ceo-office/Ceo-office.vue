<template>
  <div>
    <el-form inline size="mini"
      ><el-form-item label="节点名字"
        ><el-input v-model="framework_name" clearable></el-input
      ></el-form-item>
      <el-form-item label="公司"
        ><el-input v-model="company_name" clearable></el-input
      ></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="success" @click="addFrameWork">添加</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      style="width:65%;"
      :DataList="tableData"
      :header="header"
      :headle="headle"
      @checkleave="modifyitem"
      @delete="deleteitem"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog :visible.sync="ismodify" width="20%" title="总裁办信息编辑" v-dialogDrag>
      <el-form :model="dialogForm" ref="dialogForm" label-width="80px">
        <el-form-item label="公司">
          <select-company @setCompanyName="getCompanyName"></select-company>
        </el-form-item>
        <el-form-item label="名字">
          <el-input v-model="dialogForm.uc_framework_name"></el-input>
        </el-form-item>
        <el-form-item label="上一级">
          <el-input
            v-model="dialogForm.lastLev"
            placeholder="请选择"
            @focus="selectLevel"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="dialogForm.uc_framework_describe"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="isopenSelect" title="选择上一级" v-dialogDrag>
      <select-level @setLevel="getLevel"></select-level>
    </el-dialog>
  </div>
</template>

<script>
import selectLevel from "@/components/Ca-select/select-level";
import selectCompany from "@/components/Ca-select/select-company";
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
      total: 0,
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
      companyList: [],
      isopenSelect: false
    };
  },
  components: {
    CaRuleTable,
    paging,
    selectCompany,
    selectLevel
  },
  created() {
    this.getDataList();
  },
  methods: {
    query() {
      this.currentlimit = 15;
      this.currentpage = 1;
      this.getDataList();
    },
    //从子组件获取上一级
    getLevel(row) {
      console.log(row);
      this.isopenSelect = false;
      this.dialogForm.lastLev = row.uc_framework_name;
    },
    selectLevel() {
      this.isopenSelect = true;
    },
    getCompanyName(val) {
      this.dialogForm.uc_framework_company = val.company_id;
    },
    submit() {
      console.log(this.dialogForm);
      apiaddframeWork(this.dialogForm).then(res => {
        console.log(res);
        this.$message.success(res.msg);
        this.ismodify = false;
        this.getDataList();
      });
    },
    getDataList() {
      apiframeWorkList({
        rows: this.currentlimit,
        page: this.currentpage,
        framework_name: this.framework_name,
        company: this.company_name
      }).then(res => {
        this.total = res.total;
        this.tableData = res.data;
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
      console.log(e.uc_framework_id);
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
