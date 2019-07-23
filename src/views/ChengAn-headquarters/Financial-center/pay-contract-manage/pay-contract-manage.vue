<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="年度">
        <el-select v-model="yearMon" clearable>
          <el-option
            v-for="(item, index) in yearMonList"
            :key="index"
            :value="item"
            :label="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input
          placeholder="请输入"
          v-model="companyName"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input
          placeholder="请输入"
          v-model="projectName"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="querygys">搜索</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="contractList"
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
    <el-dialog :visible.sync="isopen" title="项目列表">
      <el-form inline size="mini">
        <el-form-item label="项目名称">
          <el-input placeholder="请输入" v-model="projectName"></el-input>
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
import { apicontractPayLists, apicontractPayList } from "@/request/api.js";
export default {
  name: "scienceSettlement",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      currentlimit2: 15,
      currentpage2: 1,
      total: 15,
      total2: 15,
      header: [
        ["合同编号", "manage_contract_num"],
        ["公司名称", "company_name"],
        ["项目名称", "manage_contract_name"],
        ["发包方（甲方）", "manage_contract_firstParty"],
        ["项目地址", "manage_contract_address"],
        ["合同开始时间", "manage_contract_startTime"],
        ["合同结束时间", "manage_contract_endTime"],
        ["合同金额", "manage_contract_amount"],
        ["签证金额", "manage_contract_visaAmount"],
        ["合同总金额", "manage_contract_amount"],
        ["备注", "manage_contract_remark"]
      ],
      contractList: [],
      headle: ["查看"],
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
      yearMon: "",
      yearMonList: [],
      companyName: "",
      projectName: ""
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    this.getPayList();
    this.getyears();
  },
  methods: {
    querygys() {
      this.getPayList();
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
    getPayList() {
      apicontractPayLists({
        rows: this.currentlimit,
        page: this.currentpage,
        company_name: this.companyName,
        manage_contract_name: this.projectName,
        yearMon: this.yearMon
      }).then(res => {
        console.log(res);
        this.contractList = res.rows;
      });
    },
    getyears() {
      apicontractPayList().then(res => {
        this.yearMonList = res.yearMon.map(item => item.yearMon);
        console.log(this.yearMonList);
      });
    },
    checkDetails(row) {
      this.isopen = true;
      this.id = row.construct_supplier_id;
      this.getproject();
    }
  }
};
</script>

<style lang="scss" scoped></style>
