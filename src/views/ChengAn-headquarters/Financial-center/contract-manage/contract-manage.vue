<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item>
        <el-input
          placeholder="合同编号"
          clearable
          v-model="form.manage_contract_num"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          clearable
          placeholder="项目名称"
          v-model="form.manage_contract_name"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          clearable
          placeholder="发包方"
          v-model="form.manage_contract_firstParty"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="form.manage_contract_startTime"
          type="year"
          style="width:100%;"
          placeholder="年份"
          value-format="yyyy"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query('')">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="addcontract">新增</el-button>
          <el-button
            type="primary"
            @click="query(item[0])"
            v-for="item in companyList"
            :key="item[0]"
            >{{ item[1] }}</el-button
          >
        </el-button-group>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="contractList"
      :header="header"
      :setheight="setheight"
      :headle="headle"
      @dblclick="dblclick"
      @checkleave="modifyitem"
      @delete="deleteitem"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="290"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog
      v-dialogDrag
      :visible.sync="isopen"
      title="合同信息"
      top="8vh"
      :append-to-body="true"
    >
      <echarts
        openType="manage"
        v-if="isopen"
        :Type="Type"
        :setform="contractform"
        :rows="rows"
        @setDate="submit"
      ></echarts>
    </el-dialog>
  </div>
</template>

<script>
import Echarts from "../pay-contract-manage/components/echarts";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import {
  apicontractLists,
  apisaveContract,
  apidelete_Contract,
  apicontractPayNew
} from "@/request/api.js";
export default {
  name: "contractManage",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      isopen: false,
      form: {
        manage_contract_num: "",
        manage_contract_name: "",
        manage_contract_firstParty: "",
        manage_contract_startTime: "",
        manage_contract_company: ""
      },
      contractform: {},
      companyList: [
        ["1", "建设公司"],
        ["2", "科技公司"],
        ["11", "教育公司"],
        ["3", "加盟合作"]
      ],
      header: [
        ["合同编号", "manage_contract_num", 100],
        ["发包方（甲方）", "manage_contract_firstParty"],
        ["项目名称", "manage_contract_name"],
        ["合同开始时间", "manage_contract_startTime", 120],
        ["合同金额", "manage_contract_amount", 100],
        ["签证金额", "manage_contract_visaAmount", 100],
        ["合同总金额", "totalAmount", 110],
        ["收款金额", "receiveAmount", 100],
        ["未收款金额", "unreceiveAmount", 110]
      ],
      headle: ["修改", "删除"],
      contractList: [],
      rows: [],
      Type: ""
    };
  },
  props: {
    setheight: {
      type: Number,
      default: 0.77
    }
  },
  components: {
    CaRuleTable,
    paging,
    Echarts
  },
  mounted() {
    this.getContractList();
  },
  methods: {
    //双击给父组件回调
    dblclick(row) {
      this.$emit("setSelectName", row);
    },
    addcontract() {
      this.contractform = {
        manage_contract_id: 0,
        manage_contract_num: "",
        company_name: "",
        manage_contract_name: "",
        manage_contract_firstParty: "",
        manage_contract_address: "",
        manage_contract_startTime: "",
        manage_contract_endTime: "",
        manage_contract_amount: 0,
        manage_contract_visaAmount: 0,
        manage_contract_remark: "",
        manage_contract_company: 1
      };
      this.rows = [];
      this.Type = "add";
      this.isopen = true;
    },
    submit(data) {
      apisaveContract(data).then(res => {
        this.$message.success(res.msg);
        this.isopen = false;
        this.getContractList();
      });
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getContractList();
    },
    getpage(e) {
      this.currentpage = e;
      this.getContractList();
    },
    //修改
    modifyitem(row) {
      apicontractPayNew({ manage_contract_id: row.manage_contract_id }).then(
        res => {
          console.log(res);
          this.contractform = res.data;
          this.rows = res.rows.rows;
        }
      );
      this.Type = "modify";
      this.isopen = true;
    },
    deleteitem(e) {
      this.$confirm("确定删除" + e.manage_contract_num + "这份合同吗？")
        .then(() => {
          apidelete_Contract({
            manage_contract_id: e.manage_contract_id
          }).then(res => {
            this.$message.success(res.msg);
            this.contractList = this.contractList.filter(
              item => item.manage_contract_id != e.manage_contract_id
            );
          });
        })
        .catch(() => {});
    },
    query(e) {
      this.form.manage_contract_company = e;
      this.getContractList();
    },
    getContractList() {
      let data = {
        limit: this.currentlimit,
        page: this.currentpage,
        manage_contract_num: this.form.manage_contract_num,
        manage_contract_name: this.form.manage_contract_name,
        manage_contract_firstParty: this.form.manage_contract_firstParty,
        manage_contract_startTime: this.form.manage_contract_startTime,
        manage_contract_company: this.form.manage_contract_company
      };
      apicontractLists(data).then(res => {
        this.contractList = res.data.map(item => {
          if (item.receiveAmount) {
            item.unreceiveAmount = (
              item.totalAmount - item.receiveAmount
            ).toFixed(2);
          } else {
            item.unreceiveAmount = item.totalAmount.toFixed(2);
          }
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
