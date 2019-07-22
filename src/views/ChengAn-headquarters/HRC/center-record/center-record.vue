<template>
  <div>
    <el-form label-width="80px" inline>
      <el-form-item label="中心名称">
        <el-input v-model="centerName" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="queryCompanyInf"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="mini" @click="addCenterInf"
          >新增</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="danger" size="mini" @click="deleteitem"
          >删除</el-button
        >
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
    <el-dialog :visible.sync="isopen" title="中心信息" width="30%">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="中心名称" prop="center_name">
          <el-input v-model="form.center_name" autofocus="true"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="company_id">
          <el-select v-model="form.company_id" placeholder="请选择">
            <el-option
              v-for="item in companyList"
              :key="item.company_id"
              :label="item.company_name"
              :value="item.company_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="modify">提交</el-button>
          <el-button type="danger" @click="exit">取消</el-button>
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
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import {
  apicenterHome,
  apisaveCenter,
  apideleCenter,
  apicompanyList
} from "@/request/api.js";
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
    paging
  },
  mounted() {
    this.getCenterInf();
  },
  methods: {
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
        center_id: ""
      };
      this.isopen = true;
      if (this.companyList == "") {
        this.getCompanyInf();
      }
    },
    queryCompanyInf() {
      this.getCenterInf();
    },
    getCenterInf() {
      apicenterHome({
        rows: this.currentlimit,
        page: this.currentpage,
        center_name: this.centerName
      })
        .then(res => {
          this.centerList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    openwindow(e) {
      this.form = {
        company_id: e.company_id,
        company_name: e.company_name,
        center_name: e.center_name,
        center_id: e.center_id
      };
      this.isopen = true;
      if (this.companyList == "") {
        this.getCompanyInf();
      }
    },
    getCompanyInf() {
      apicompanyList({
        rows: this.companyrows,
        page: this.companyPage,
        companyname: ""
      }).then(res => {
        this.companyList = this.companyList.concat(res.data);
        if (res.data.length == this.companyrows) {
          this.companyPage++;
          this.getCompanyInf();
        }
      });
    },
    modify() {
      apisaveCenter({
        center_id: this.form.center_id,
        center_name: this.form.center_name,
        center_companyId: this.form.company_id
      }).then(res => {
        this.centerList.forEach(item => {
          if (item.center_id == this.form.center_id) {
            item.center_name = this.form.center_name;
          }
        });
        this.$message.success("修改成功");
        setTimeout(() => {
          this.isopen = false;
        }, 1500);
      });
    },
    exit() {
      this.form.company_name = this.form.old_name;
      this.isopen = false;
    },
    deleteitem() {
      if (this.selectList == "") {
        this.$message.error("请选择中心");
        return;
      }
      //   apideleCenter({
      //     ids: this.selectList
      //   }).then(res => {
      //     console.log(res);
      //   });
    },
    getselect(val) {
      this.selectList = val.map(item => item.center_id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
