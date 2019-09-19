<template>
  <div>
    <el-form inline size="mini">
      <el-form-item>
        <el-select v-model="company_id" clearable>
          <el-option
            v-for="item in companyList"
            :value="item[0]"
            :key="item[0]"
            :label="item[1]"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="项目名称"
          v-model="projectName"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" class="el-icon-plus" @click="additem"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="approveList"
      :header="header"
      :headle="headle"
      @checkleave="checkitem"
      @delete="deleteitem"
      @edit="downfile"
      :columnIndex="8"
      field="manage_status"
      :truestatus="3"
      :progressstatus="1"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog title="合同信息" :visible.sync="isopen" v-dialogDrag>
      <add-contract-approve
        :history="history"
        :openType="openType"
        v-if="isopen"
        :contractapprove="contractapprove"
        @closewin="closewin"
      ></add-contract-approve>
    </el-dialog>
  </div>
</template>

<script>
import addContractApprove from "@/components/Ca-to-do/add-contract-approve";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import http from "@/request/http";
import { changetime } from "@/components/global-fn/global-fn";
import {
  apicontractapprove,
  apideleteContract,
  apicontractapproveNew
} from "@/request/api.js";
export default {
  name: "contractApprove",
  data() {
    return {
      isopen: false,
      currentlimit: 15,
      currentpage: 1,
      total: 0,
      company_id: "",
      companyList: [
        ["1", "建设公司"],
        ["2", "科技公司"],
        ["3", "加盟合作"],
        ["4", "教育公司"],
        ["5", "传诚管理"]
      ],
      projectName: "",
      approveList: [],
      header: [
        ["项目名称", "manage_contractapprove_name"],
        ["发包方（甲方）", "manage_contractapprove_firstParty"],
        ["项目地址", "manage_contractapprove_address"],
        ["合同开始时间", "manage_contractapprove_startTime", 120],
        ["合同结束时间", "manage_contractapprove_endTime", 120],
        ["合同金额", "manage_contractapprove_amount", 100],
        ["附件地址", "manage_contractapprove_attachAddress", 100, true],
        ["备注", "manage_contractapprove_remark", 100, true],
        ["状态", "manage_status2", 80]
      ],
      headle: ["查看", "删除", "下载"],
      contractapprove: {},
      history: []
    };
  },
  mounted() {
    this.getContractApprove();
  },
  components: {
    CaRuleTable,
    paging,
    addContractApprove
  },
  methods: {
    closewin() {
      this.isopen = false;
      this.getContractApprove();
    },
    additem() {
      this.history = [];
      this.openType = "add";
      this.contractapprove = {
        userid: "",
        manage_contractapprove_name: "",
        manage_contractapprove_company: "",
        manage_contractapprove_address: "",
        manage_contractapprove_firstParty: "",
        manage_contractapprove_amount: "",
        manage_contractapprove_secondParty: "",
        manage_contractapprove_startTime: "",
        manage_contractapprove_endTime: "",
        manage_contractapprove_payment: "",
        category: 1,
        manage_contractapprove_remark: "",
        manage_contractapprove_taxIncluded: 1
      };
      this.isopen = true;
    },
    query() {
      this.getContractApprove();
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getContractApprove();
    },
    getpage(e) {
      this.currentpage = e;
      this.getContractApprove();
    },
    checkitem(row) {
      this.openType = "check";
      apicontractapproveNew({
        manage_contractapprove_id: row.manage_contractapprove_id
      }).then(res => {
        console.log(res);
        this.contractapprove = res.contractapprove;
        this.history = res.history
          ? res.history.map(item => {
              item.START_TIME_ = item.START_TIME_
                ? changetime(item.START_TIME_.time)
                : "";
              item.END_TIME_ = item.END_TIME_
                ? changetime(item.END_TIME_.time)
                : "";
              return item;
            })
          : [];
        this.isopen = false;
        this.$nextTick(() => {
          this.isopen = true;
        });
      });
    },
    deleteitem(row) {
      this.$confirm("是否删除？")
        .then(() => {
          console.log(123);
          apideleteContract({
            manage_contractapprove_id: row.manage_contractapprove_id,
            filePath: ""
          }).then(res => {
            this.getContractApprove();
          });
        })
        .catch();
    },
    downfile(row) {
      if (row.manage_contractapprove_attachAddress) {
        window.open(row.manage_contractapprove_attachAddress);
      } else {
        this.$message.warning("此合同没有附件");
      }
    },
    getContractApprove() {
      console.log(this.company_id);
      let data = {
        limit: this.currentlimit,
        page: this.currentpage,
        manage_contractapprove_name: this.projectName,
        manage_contractapprove_company: this.company_id
      };
      apicontractapprove(data).then(res => {
        console.log(res);
        this.total = res.count;
        this.approveList = res.data.map(item => {
          switch (item.manage_status) {
            case 0:
              item.manage_status2 = "数据录入";
              break;
            case 1:
              item.manage_status2 = "审核中";
              break;
            case 3:
              item.manage_status2 = "审核通过";
              break;
            default:
              item.manage_status2 = "审核不通过";
              break;
          }
          return item;
        });
        console.log(this.approveList);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
