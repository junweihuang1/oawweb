<template>
  <div>
    <el-button-group>
      <el-button type="success" size="mini" @click="addline">添加</el-button>
      <el-button type="primary" size="mini" @click="undoadd"
        >撤销新增</el-button
      >
      <el-button type="danger" size="mini" @click="deleteall">删除</el-button>
    </el-button-group>
    <el-table :data="DataList" border size="mini">
      <el-table-column
        :label="item[0]"
        :width="item[3]"
        v-for="(item, index) in titleList"
        :key="index"
      >
        <template slot-scope="{ row }">
          <template v-if="item[2] == 'date'">
            <el-date-picker
              style="width:100%;"
              format="MM-dd"
              v-model="row[item[1]]"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </template>
          <template v-else>
            <el-input v-model="row[item[1]]"> </el-input>
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
        ["请款时间", "gettime", "date"],
        ["请款金额", "manage_contract_amount", ""],
        ["开票日期", "start_time", "date"],
        ["开票金额", "contract_amount", ""],
        ["付款日期", "paymentdate", "date"],
        ["付款金额", "payment_amount", ""],
        ["备注", "remark", ""]
      ],
      DataList: []
    };
  },
  watch: {
    DataList(val) {
      this.$emit("setTableList", val);
      console.log(val);
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
        payment_amount: "",
        remark: ""
      };
      this.DataList.push(data);
    }
  }
};
</script>

<style lang="scss" scoped></style>
