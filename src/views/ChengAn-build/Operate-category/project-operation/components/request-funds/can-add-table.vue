<template>
  <div>
    <div>
      <el-button-group>
        <el-button type="success" size="mini" @click.once="addline"
          >添加</el-button
        >
        <el-button type="primary" size="mini" @click="undoadd"
          >撤销新增</el-button
        >
      </el-button-group>
    </div>
    <el-table
      :data="rows"
      border
      @row-click="rowClick"
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
        <template slot-scope="{ row }" v-if="ischeck">
          <el-date-picker
            v-if="item[2] == 'date' && row['ischeck'] == true"
            style="width:100%;"
            value-format="yyyy-MM-dd"
            v-model="row[item[1]]"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
          <input
            v-model="row[item[1]]"
            class="inputbox"
            v-else-if="row['ischeck'] == true"
          />
          <span v-else>{{ row[item[1]] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            class="el-icon-edit"
            @click="modify(row)"
          ></el-button>
          <el-button
            type="primary"
            class="el-icon-search"
            @click="checkitem(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ApplicationForm from "./Application-form";
export default {
  name: "canAddTable",
  data() {
    return {
      titleList: [
        ["请款时间", "manage_reqfunds_time", "date"],
        ["请款金额", "manage_reqfunds_amount", ""],
        ["开票日期", "manage_reqfunds_ticketDate", "date"],
        ["开票金额", "manage_reqfunds_ticketAmount", ""],
        ["付款日期", "manage_reqfunds_receiveDate", "date"],
        ["付款金额", "manage_reqfunds_receiveAmount", ""],
        ["备注", "manage_reqfunds_remark", ""]
      ],
      DataList: this.rows,
      ischeck: true,
      activeId: Number
    };
  },
  props: {
    rows: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    rows(val) {
      this.DataList = val;
    }
  },
  methods: {
    //查看
    checkitem(row) {
      console.log(row);
      this.$emit("openApplyForm", row.manage_reqfunds_id);
      // apigetreqfundsView({ manage_reqfunds_id: row.manage_reqfunds_id }).then(
      //   res => {
      //     console.log(res);
      //   }
      // );
    },
    modify(row) {
      this.$emit("setTableList", row);
    },
    //行被点击
    rowClick(row) {
      if (row.manage_reqfunds_id !== this.activeId) {
        this.activeId = row.manage_reqfunds_id;
        this.DataList = this.DataList.map(item => {
          if (row.manage_reqfunds_id == item.manage_reqfunds_id) {
            item.ischeck = !item.ischeck;
          } else {
            item.ischeck = false;
          }
          return item;
        });
        //刷新单元格类型
        this.ischeck = false;
        this.$nextTick(() => {
          this.ischeck = true;
        });
      }
    },
    undoadd() {
      this.DataList.pop();
    },
    addline() {
      this.$emit("reload");
      setTimeout(() => {
        this.DataList.push({});
      }, 100);
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
        if (item.manage_reqfunds_receiveAmount) {
          data2[5] += Number(item.manage_reqfunds_receiveAmount);
        }
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
</style>
