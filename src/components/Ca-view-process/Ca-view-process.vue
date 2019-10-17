// form表单+流程table
<template>
  <div>
    <el-table
      :data="Approvaltable"
      border
      :header-cell-style="getRowClass"
      max-height="300px"
    >
      <el-table-column
        v-for="(item, index) in ApprovalHeaderList"
        :key="index"
        :label="item[0]"
        :prop="item[1]"
        :type="index == 0 ? 'index' : ''"
        :width="item[2]"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CaViewProcess",
  data() {
    return {
      // ApprovalHeaderList:
    };
  },
  props: {
    ApprovalHeaderList: {
      default: () => {
        return [
          ["序号", "index", 60],
          ["流程节点", "name_", 140],
          ["审核人", "username", 80],
          ["审核时间", "END_TIME_", 160],
          ["审核意见", "MESSAGE_"]
        ];
      }
    },
    Approvaltable: Array
  },
  watch: {
    isopen(value) {
      this.myopen = value;
    }
  },
  methods: {
    closeopen() {
      this.$emit("setclose");
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return `background: ${
          this.$store.state.tableColor
        };color:#fff;height:40px;padding:0px;`;
      } else {
        return "height:40px;padding:0px;";
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
