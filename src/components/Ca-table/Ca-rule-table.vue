<template>
  <div>
    <el-table
      :data="DataList"
      border
      :height="maxHeight"
      :header-cell-style="getRowClass"
      size="mini"
      :span-method="objectSpanMethod"
      :cell-style="getcellstyle"
      :show-summary="issummary"
      @row-click="clickline"
      @selection-change="handleSelectionChange"
      @row-dblclick="dblclick"
    >
      <template v-if="isselect == true">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
      </template>
      <el-table-column
        v-for="(item, index) in header"
        :label="item[0]"
        :prop="item[1]"
        sortable
        :show-overflow-tooltip="item[3]"
        align="center"
        :key="index"
        :width="item[2]"
      ></el-table-column>
      <el-table-column
        label="操作"
        align="center"
        v-if="headle"
        :width="getwidth"
      >
        <template slot-scope="scope">
          <template v-for="(item, index) in headle">
            <el-button
              type="success"
              size="mini"
              v-if="index == 0 && item != ''"
              @click="checkleave(scope.row)"
              plain
              :key="index"
              >{{ item }}</el-button
            >
            <el-button
              type="danger"
              size="mini"
              v-if="index == 1 && item != ''"
              @click="deleteflie(scope.row)"
              plain
              :key="index"
              >{{ item }}</el-button
            >
            <el-button
              v-if="index == 2 && item != ''"
              type="warning"
              size="mini"
              @click="edit(scope.row)"
              plain
              :key="index"
              >{{ item }}</el-button
            >
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ruleTable",
  data() {
    return {
      isselect: this.setselect,
      issummary: this.setsummary,
      maxHeight: document.documentElement.scrollHeight * this.setheight
    };
  },
  props: {
    DataList: Array,
    header: Array,
    headle: Array,
    setheight: {
      type: Number,
      default: 0.77
    },
    setselect: {
      type: Boolean,
      default: false
    },
    setsummary: {
      type: Boolean,
      default: false
    },
    columnIndex: {
      type: Number,
      default: null
    },
    field: {
      type: String,
      default: null
    },
    truestatus: {
      type: Number,
      default: null
    },
    falsestatus: {
      type: Number,
      default: null
    },
    progressstatus: {
      type: Number,
      default: null
    }
  },
  computed: {
    getwidth() {
      let width = this.headle.filter(item => item != "");
      return width.length * 100;
    }
  },
  watch: {
    setselect(val) {
      this.isselect = val;
    }
  },
  methods: {
    //合并列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(row);
    },
    //改变单元格样色
    getcellstyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == this.columnIndex) {
        switch (row[this.field]) {
          case this.truestatus:
            return "color:#67C23A;";
          case this.falsestatus:
            return "color:#F56C6C;";
          case this.progressstatus:
            return "color:#E6A23C;";
        }
      }
    },
    //给表单的表头添加背景颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #84C2B7;color:#fff; ";
      } else {
        return "";
      }
    },
    //把选择的行返回给父组件
    handleSelectionChange(val) {
      this.$emit("setselect", val);
    },
    //第一个按钮事件传递给父组件
    checkleave(item) {
      this.$emit("checkleave", item);
    },
    //第二个按钮事件传递给父组件
    deleteflie(item) {
      this.$emit("delete", item);
    },
    //第三个按钮事件传递给父组件
    edit(item) {
      this.$emit("edit", item);
    },
    clickline(row, event, column) {
      this.$emit("checkline", [row, event, column]);
    },
    dblclick(row, event) {
      this.$emit("dblclick", row);
    }
  }
};
</script>

<style lang="scss">
.el-tooltip__popper {
  max-width: 400px;
}
</style>
