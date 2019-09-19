<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="供应商名称">
        <el-input placeholder="请输入" v-model="gysName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="querygys">搜索</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="settlementList"
      :header="header"
      :headle="headle"
      @checkleave="checkDetails"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog :visible.sync="isopen" title="项目列表" v-dialogDrag>
      <el-form inline size="mini">
        <el-form-item label="项目名称">
          <el-input
            placeholder="请输入"
            v-model="projectName"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryproject">搜索</el-button>
        </el-form-item>
      </el-form>
      <Ca-rule-table
        style="height:400px;overflow:auto;"
        :DataList="detailList"
        :header="detailHeader"
        :headle="detailHeadle"
        @checkleave="getList"
      ></Ca-rule-table>
      <paging
        :currentpage="currentpage2"
        :currentlimit="currentlimit2"
        :total="total2"
        @setpage="getpage2"
        @setlimit="getlimit2"
      ></paging>
    </el-dialog>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import {
  apibuild_settlements,
  apisettleConstructList,
  apisettlePayList
} from "@/request/api.js";
export default {
  name: "educationSettlement",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      currentlimit2: 15,
      currentpage2: 1,
      total: 15,
      total2: 15,
      gysName: "",
      header: [
        ["供应商编码", "construct_supplier_id"],
        ["供应商名称", "construct_supplier_name"],
        ["供应商地址", "construct_supplier_addr"],
        ["供应商联系方式", "construct_supplier_tel"],
        ["共欠款", "total"],
        ["已支付", ""],
        ["未支付", ""]
      ],
      settlementList: [],
      headle: ["明细"],
      isopen: false,
      detailList: [],
      detailHeader: [
        ["项目编号", "projectId"],
        ["项目名称", "construct_project_name"],
        ["工程地址", "construct_project_addr"],
        ["项目经理", "construct_project_leader"],
        ["项目经理电话", "construct_project_leaderTel", 120],
        ["共欠款", "total"],
        ["已支付", ""],
        ["未支付", ""]
      ],
      detailHeadle: ["付款列表"],
      projectName: "",
      id: ""
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    this.getsettlements();
  },
  methods: {
    getList(row) {
      console.log(row);
      let data = {
        rows: 15,
        page: 1,
        construct_project_id: row.projectId
      };
      apisettlePayList(data).then(res => {
        console.log(res);
      });
    },
    querygys() {
      this.getsettlements();
    },
    queryproject() {
      this.getproject();
    },
    getpage(e) {
      this.currentpage = e;
    },
    getlimit(e) {
      this.currentlimit = e;
    },
    getpage2(e) {
      this.currentpage2 = e;
    },
    getlimit2(e) {
      this.currentlimit2 = e;
    },
    getsettlements() {
      apibuild_settlements({
        limit: this.currentlimit,
        page: this.currentpage,
        gysName: this.gysName
      }).then(res => {
        console.log(res);
        this.settlementList = res.data;
      });
    },
    checkDetails(row) {
      this.isopen = true;
      this.id = row.construct_supplier_id;
      this.getproject();
    },
    getproject() {
      apisettleConstructList({
        rows: this.currentlimit2,
        page: this.currentpage2,
        construct_supplier_id: this.id,
        projectName: this.projectName
      }).then(res => {
        if (res.rows[0]) {
          this.detailList = res.rows;
        }
        console.log(this.detailList);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
