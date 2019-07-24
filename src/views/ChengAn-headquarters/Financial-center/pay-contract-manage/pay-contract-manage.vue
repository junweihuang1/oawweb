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
      <el-form-item>
        <el-button type="primary" @click="addcontract">新增</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="contractList"
      :header="header"
      @delete="delcontract"
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

    <el-dialog :visible.sync="isopen" title="合同信息" top="8vh">
      <echarts :setform="contractform"></echarts>
    </el-dialog>
  </div>
</template>

<script>
import Echarts from "./components/echarts";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import {
  apicontractPayLists,
  apicontractPayList,
  apidelete_Contract
} from "@/request/api.js";
export default {
  name: "payContractManage",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      currentlimit2: 15,
      currentpage2: 1,
      total: 15,
      total2: 15,
      header: [
        ["合同编号", "manage_contract_num", 100],
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
      headle: ["查看", "删除"],
      isopen: false,
      yearMon: "",
      yearMonList: [],
      companyName: "",
      projectName: "",
      contractform: {}
    };
  },
  components: {
    CaRuleTable,
    paging,
    Echarts
  },
  mounted() {
    this.getPayList();
    this.getyears();
  },
  methods: {
    //删除指定合同
    delcontract(e) {
      this.$confirm("确定删除" + e.manage_contract_num + "这份合同吗？").then(
        _ => {
          apidelete_Contract({
            manage_contract_id: e.manage_contract_id
          }).then(res => {
            this.$message.success(res.msg);
            this.contractList = this.contractList.filter(
              item => item.manage_contract_id != e.manage_contract_id
            );
          });
        }
      );
    },
    querygys() {
      this.getPayList();
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
        this.contractList = res.rows;
      });
    },
    getyears() {
      apicontractPayList().then(res => {
        this.yearMonList = res.yearMon.map(item => item.yearMon);
      });
    },
    checkDetails(row) {
      this.contractform = {
        manage_contract_num: row.manage_contract_num,
        company_name: row.company_name,
        manage_contract_name: row.manage_contract_name,
        manage_contract_firstParty: row.manage_contract_firstParty,
        manage_contract_address: row.manage_contract_address,
        manage_contract_startTime: row.manage_contract_startTime,
        manage_contract_endTime: row.manage_contract_endTime,
        manage_contract_amount: row.manage_contract_amount,
        manage_contract_visaAmount: row.manage_contract_visaAmount,
        manage_contract_remark: row.manage_contract_remark
      };
      this.isopen = true;
    },
    addcontract() {
      this.contractform = {
        manage_contract_num: "",
        company_name: "",
        manage_contract_name: "",
        manage_contract_firstParty: "",
        manage_contract_address: "",
        manage_contract_startTime: "",
        manage_contract_endTime: "",
        manage_contract_amount: 0,
        manage_contract_visaAmount: 0,
        manage_contract_remark: ""
      };
      this.isopen = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
