<template>
  <div style="width:70%;margin:0 auto;">
    <table class="Application_form" border="0" cellspacing="1" cellpadding="0">
      <tr align="center">
        <th colspan="4" align="center">开发票申请表</th>
      </tr>
      <tr>
        <td align="center">申请部门</td>
        <td align="center" colspan="3">{{ ApplyForm.manage_department }}</td>
      </tr>
      <tr>
        <td align="center">甲方单位名称</td>
        <td align="center" colspan="3">{{ ApplyForm.manage_first_party }}</td>
      </tr>
      <tr>
        <td align="center">开票内容</td>
        <td align="center" colspan="3">
          {{ ApplyForm.manage_ticket_content }}
        </td>
      </tr>
      <tr>
        <td align="center">开票金额</td>
        <td align="center">{{ ApplyForm.manage_reqfunds_amount }}</td>
        <td align="center">甲方单位电话</td>
        <td align="center">{{ ApplyForm.manage_telephone }}</td>
      </tr>
      <tr>
        <td align="center">纳税人类别</td>
        <td align="center">
          <el-radio v-model="ApplyForm.manage_pay_taxes" :label="1"
            >一般纳税</el-radio
          >
          <el-radio v-model="ApplyForm.manage_pay_taxes" :label="2"
            >小规模纳税</el-radio
          >
        </td>
        <td align="center">增值税类别</td>
        <td align="center">
          <el-radio v-model="ApplyForm.manage_vat_category" :label="1"
            >增值税专票</el-radio
          >
          <el-radio v-model="ApplyForm.manage_vat_category" :label="2"
            >增值税普票</el-radio
          >
        </td>
      </tr>
      <tr>
        <td align="center">统一社会信用代码</td>
        <td align="center" colspan="3">{{ ApplyForm.manage_credit_code }}</td>
      </tr>
      <tr>
        <td align="center">公司地址</td>
        <td align="center" colspan="3">
          {{ ApplyForm.manage_company_address }}
        </td>
      </tr>
      <tr>
        <td align="center">开户行</td>
        <td align="center">{{ ApplyForm.manage_opening_bank }}</td>
        <td align="center">银行账号</td>
        <td align="center">{{ ApplyForm.manage_bank_account }}</td>
      </tr>
      <tr>
        <td align="center">备注</td>
        <td
          align="center"
          colspan="3"
          v-text="ApplyForm.manage_reqfunds_remark"
        ></td>
      </tr>
    </table>

    <div>
      说明：“统一社会信用代码、地址、电话、开户行、银行账号”四项只需在第一次开票的时候填写即可，即同一项目从第二次开票开始此四项可省略。
    </div>
    <el-divider content-position="left">审批记录</el-divider>
    <Ca-rule-table
      :DataList="historyList"
      :header="header"
      :setheight="0.2"
    ></Ca-rule-table>
  </div>
</template>

<script>
import { changetime } from "@/components/global-fn/global-fn";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apigetreqfundsView } from "@/request/api.js";
export default {
  name: "ApplicationForm",
  data() {
    return {
      ApplyForm: {},
      historyList: [],
      header: [
        ["审核人", "username"],
        ["步骤名称", "name_"],
        ["审核意见", "MESSAGE_"],
        ["审核时间", "END_TIME_"],
        ["中心", "center_name"]
      ]
    };
  },
  components: {
    CaRuleTable
  },
  props: {
    reqfundsId: Number
  },
  mounted() {
    this.getView();
  },
  methods: {
    getView() {
      apigetreqfundsView({ manage_reqfunds_id: this.reqfundsId }).then(res => {
        console.log(res);
        this.ApplyForm = res.data[0];
        this.historyList = res.historyList.map(item => {
          item.END_TIME_ = changetime(item.END_TIME_);
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.Application_form {
  width: 100%;
  background: #ccc;
}
.Application_form td:nth-child(n) {
  width: 20%;
}
.Application_form td:nth-child(2n) {
  width: 30%;
}
.Application_form td {
  height: 40px;
  background: #fff;
}
.Application_form th {
  height: 30px;
  background: #fff;
}
</style>
