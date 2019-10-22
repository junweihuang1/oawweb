<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="上传时间">
        <el-date-picker
          type="date"
          value-format="yyyy-MM-dd"
          v-model="query_time"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-upload
          :headers="{ token: token }"
          :on-error="headleError"
          :on-success="headleSuccess"
          :data="{ supplierform_id: '' }"
          class="upload-demo"
          name="pic"
          :action="upload_url"
          :limit="1"
        >
          <el-button size="mini" type="success">新增</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      style="width:45%;"
      :DataList="evaluateList"
      :header="header"
      :headle="headle"
      @checkleave="checkitem"
      :setselect="true"
      @setselect="getselect"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import http from "@/request/http";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apisupplierformList, apisupplierformView } from "@/request/api.js";
export default {
  name: "supplierContrast",
  data() {
    return {
      token: sessionStorage.getItem("token"),
      upload_url: http.base_url + "uup",
      query_time: "",
      currentpage: 1,
      currentlimit: 15,
      evaluateList: [],
      total: 15,
      header: [
        ["上传中心", "supplierform_loadcenter", 100],
        ["上传时间", "supplierform_date", 150],
        ["上传路径", "supplierform_fileway"]
      ],
      headle: ["查看"]
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  created() {
    this.getevaluateList();
  },
  methods: {
    headleError(err, file, fileList) {
      console.log(this.upload_url);
      console.log(err);
      console.log(file);
    },
    headleSuccess(res, file, fileList) {
      console.log(res);
      console.log(file);
    },
    query() {
      this.currentlimit = 15;
      this.currentpage = 1;
      this.getevaluateList();
    },
    getpage(e) {
      this.currentpage = e;
      this.getevaluateList();
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getevaluateList();
    },
    //查看
    checkitem(row) {
      apisupplierformView({
        supplierform_id: row.supplierform_id
      }).then(res => {
        console.log(res);
      });
    },
    getevaluateList() {
      apisupplierformList({
        rows: this.currentlimit,
        page: this.currentpage,
        supplierform_date: this.query_time
      }).then(res => {
        console.log(res);
        this.evaluateList = res.data;
      });
    },
    getselect(val) {
      this.selectList = val.map(item => item.supplierform_id);
      console.log(this.selectList);
    }
  }
};
</script>

<style lang="scss" scoped></style>
