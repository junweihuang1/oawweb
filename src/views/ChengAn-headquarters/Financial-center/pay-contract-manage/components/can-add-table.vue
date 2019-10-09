<template>
  <div>
    <el-button-group
      v-if="Type == 'add' || Type == 'modify'"
      style="margin-bottom:10px;"
    >
      <el-button type="success" size="mini" @click="addline">添加</el-button>
      <el-button type="primary" size="mini" @click="undoadd"
        >撤销新增</el-button
      >
      <el-button type="danger" size="mini" @click="deleteall">删除</el-button>
    </el-button-group>
    <el-table
      :data="DataList"
      border
      :header-cell-style="getRowClass"
      show-summary
      :summary-method="computeSummary"
    >
      <el-table-column
        :label="item[0]"
        :width="item[3]"
        align="center"
        v-for="(item, index) in titleList"
        :key="index"
      >
        <template slot-scope="{ row }">
          <template v-if="item[2] == 'date'">
            <el-date-picker
              class="noneborder"
              style="width:100%;"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="row[item[1]]"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </template>
          <template v-else>
            <input v-model="row[item[1]]" class="inputbox" />
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "canAddTable",
  data() {
    return {
      titleList: [
        ["请款时间", "manage_reqfunds_time", "date"],
        ["请款金额", "manage_bank_account", ""],
        ["开票日期", "manage_reqfunds_ticketDate", "date"],
        ["开票金额", "manage_reqfunds_ticketAmount", ""],
        ["付款日期", "manage_reqfunds_receiveDate", "date"],
        ["付款金额", "manage_reqfunds_receiveAmount", ""],
        ["备注", "manage_reqfunds_remark", ""]
      ],
      DataList: this.rows
    };
  },
  props: {
    rows: {
      type: Array,
      default: () => {
        return [];
      }
    },
    Type: String
  },
  watch: {
    DataList(val) {
      this.$emit("setTableList", val);
      console.log(val);
    },
    rows(val) {
      this.DataList = val;
    }
  },
  methods: {
    deleteall() {
      this.DataList = [];
    },
    undoadd() {
      this.DataList.splice(this.DataList.length - 1);
    },
    addline() {
      let data = {
        gettime: "",
        manage_contract_amount: "",
        start_time: "",
        contract_amount: "",
        paymentdate: "",
        manage_reqfunds_receiveAmount: 0,
        payment_amount: "",
        remark: ""
      };
      this.DataList.push(data);
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return `background: ${
          this.$store.state.tableColor
        };color:#fff;height:40px;padding:0px;`;
      } else {
        return "height:40px;padding:0px;";
      }
    },
    //计算合计
    computeSummary({ columns, data }) {
      let data2 = ["", "", "", "", "收款合计", 0, ""];
      data.forEach(item => {
        data2[5] += item.manage_reqfunds_receiveAmount;
      });
      this.$emit("receiveAmount", data2[5]);
      return data2;
    }
  }
};
</script>

<style lang="scss">
.el-table--border td:first-child .cell {
  padding-left: 0;
}
.el-table td .cell {
  padding: 0;
  line-height: 30px;
}
.el-table--small td {
  padding: 0;
}
.noneborder {
  border: none;
}
</style>
