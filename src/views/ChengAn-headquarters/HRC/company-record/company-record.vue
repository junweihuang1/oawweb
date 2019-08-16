<template>
  <div>
    <el-form label-width="80px" inline>
      <el-form-item label="公司名称">
        <el-input v-model="companyName" />
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" size="mini" @click="queryCompanyInf"
            >查询</el-button
          >
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
      style="width:25%;"
      :DataList="companyList"
      :header="headerList"
      :headle="headleList"
      @checkleave="openwindow"
      :setselect="isselect"
      @setselect="getselect"
    ></Ca-rule-table>
    <el-dialog :visible.sync="isopen" title="公司信息" width="30%">
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item
          label="原公司名称"
          prop="old_name"
          v-if="form.old_name != ''"
        >
          <el-input v-model="form.old_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="新公司名称" prop="company_name">
          <el-input v-model="form.company_name" autofocus="true"></el-input>
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
import axios from "axios";
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
        ["公司名称", "company_name"]
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
  mounted() {
    this.getCompanyInf();
  },
  methods: {
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
        old_name: ""
      };
      this.isopen = true;
    },
    //查询公司信息
    queryCompanyInf() {
      this.getCompanyInf();
    },
    //获取所有公司信息
    getCompanyInf() {
      apicompanyList({
        rows: this.currentlimit,
        page: this.currentpage,
        companyname: this.companyName
      })
        .then(res => {
          console.log(res);
          this.companyList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //打开编辑窗口
    openwindow(e) {
      this.form = {
        company_id: e.company_id,
        company_name: e.company_name,
        old_name: e.company_name
      };
      this.isopen = true;
    },
    modify() {
      axios({
        url: "192.168.11.124:8081/casd2/admin/saveCompany",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: localStorage.getItem("token")
        },
        data: {
          company_id: this.form.company_id,
          company_name: this.form.company_name
        }
      }).then(res => {
        console.log(res);
      });
      //   apisaveCompany({
      //     company_id: this.form.company_id,
      //     company_name: this.form.company_name
      //   }).then(res => {
      //     console.log(res);
      //     this.companyList.forEach(item => {
      //       if (item.company_id == this.form.company_id) {
      //         item.company_name = this.form.company_name;
      //       }
      //     });
      //     this.$message.success("修改成功");
      //     setTimeout(() => {
      //       this.form.old_name = this.form.company_name;
      //       this.isopen = false;
      //     }, 1500);
      //   });
    },
    exit() {
      this.form.company_name = this.form.old_name;
      this.isopen = false;
    },
    deleteitem() {
      if (this.selectList == "") {
        this.$message.error("请选择公司");
        return;
      }
      axios({
        url: "192.168.11.124:8081/casd2/admin/deleCompany",
        method: "delete",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: localStorage.getItem("token")
        },
        data: {
          ids: this.selectList
        }
      }).then(res => {
        console.log(res);
      });
      //   apideleCompany({
      //     ids: this.selectList
      //   }).then(res => {
      //     console.log(res);
      //   });
    },
    getselect(val) {
      this.selectList = val.map(item => item.company_id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
