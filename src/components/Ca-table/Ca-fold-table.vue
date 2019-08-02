// 折叠表格
<template>
  <el-table
    :data="dataList"
    style="width: 100%"
    :row-key="getrowkey"
    :expand-row-keys="expands"
    @cell-click="clickTable"
    ref="refTable"
    @expand-change="expandchange"
  >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form
          label-position="left"
          inline
          class="demo-table-expand"
          label-width="75px"
        >
          <el-row>
            <template v-for="(item, index) in clickDateList">
              <el-col
                :span="index < clickDateList.length - 1 ? 12 : 24"
                :key="index"
              >
                <el-form-item :label="item[0]" :key="index"
                  ><span>{{ item[1] }}</span></el-form-item
                >
              </el-col>
            </template>
            <el-form-item label="审批意见" v-if="isreasons">
              <span
                ><input
                  type="text"
                  v-model="reasons"
                  placeholder="请输入意见（必填）"
                  class="reasons-input"
              /></span>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="mini" @click="process(true)"
                >通过</el-button
              >
              <el-button type="danger" size="mini" @click="process(false)"
                >驳回</el-button
              >
            </el-form-item>
          </el-row>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      :label="item[0]"
      :prop="item[1]"
      v-for="(item, index) in header"
      :key="index"
    ></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "ToDoTable",
  props: {
    dataList: Array,
    header: Array,
    clickDateList: Array,
    expands: Array,
    isreasons: Boolean
  },
  data() {
    return {
      place: "",
      cause: "",
      newlist: [],
      reasons: ""
    };
  },
  watch: {
    clickDateList(newValue) {
      this.clickDateList = newValue;
    }
  },
  methods: {
    //获取要展开行的ID
    getrowkey(row) {
      return row.ID_;
    },
    expandchange(row, expandedRows) {
      this.$emit("setrow", [row, expandedRows]);
    },
    clickTable: function(row, column, cell, event) {
      this.$refs.refTable.toggleRowExpansion(row);
    },
    process(e) {
      this.$emit("process", [e, this.reasons]);
    }
  },
  mounted() {}
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 48%;
}
.reasons-input {
  width: 180%;
  border: 1px #d5d5d5 dotted;
  outline: none;
}
</style>
