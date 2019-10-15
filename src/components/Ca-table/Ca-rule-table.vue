//
表格组件，传入header表头列表，DataList数据列表，有操作按钮就加入例如["查看","删除"]
<template>
  <div>
    <el-table
      :data="DataList"
      border
      highlight-current-row
      :height="maxHeight"
      :header-cell-style="getRowClass"
      size="mini"
      @current-change="handleCurrentChange"
      :span-method="objectSpanMethod"
      :row-style="getrowstyle"
      :cell-style="getcellstyle"
      :show-summary="issummary"
      @cell-click="cellClick"
      @row-click="rowClick"
      @selection-change="handleSelect"
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
        :show-overflow-tooltip="true"
        align="center"
        :key="index"
        :fixed="item[5]"
        :min-width="item[2]"
      >
        <template v-if="item[4] != ''">
          <el-table-column
            v-for="(item2, index2) in item[4]"
            :label="item2[0]"
            :prop="item2[1]"
            sortable
            :show-overflow-tooltip="true"
            align="center"
            :key="index2"
            :min-width="item2[2]"
          >
          </el-table-column>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        v-if="headle"
        fixed="right"
        :width="getwidth"
      >
        <template slot-scope="{ row }">
          <template v-for="(item, index) in headle">
            <el-button
              type="success"
              size="mini"
              :disabled="row[Judge_field] === 1 && Judge_field ? true : false"
              v-if="index == 0 && item != ''"
              @click="checkleave(row)"
              plain
              :key="index"
              >{{ item }}</el-button
            >
            <el-button
              type="warning"
              size="mini"
              v-if="index == 1 && item != ''"
              :key="index"
              @click="deleteflie(row)"
              plain
              >{{ item }}</el-button
            >
            <el-button
              v-if="index == 2 && item != ''"
              type="primary"
              size="mini"
              @click="edit(row)"
              plain
              :key="index"
              >{{ item }}</el-button
            >
            <el-button
              v-if="index == 3 && item != ''"
              type="success"
              size="mini"
              @click="modify(row)"
              plain
              :key="index"
              >{{ item }}</el-button
            >
            <el-button
              v-if="index == 4 && item != '' && row[judge] == null"
              type="primary"
              size="mini"
              @click="start(row)"
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
      maxHeight: document.documentElement.scrollHeight * this.setheight,
      isinput: false,
      selectarr: []
    };
  },
  props: {
    judge: String,
    DataList: Array,
    header: Array,
    headle: Array,
    setheight: {
      type: Number,
      default: 0.74
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
    },
    isSpan: {
      type: Boolean,
      default: false
    },
    iscellCilck: {
      type: Boolean,
      default: false
    },
    cellField: String,
    Judge_field: String //判断是否禁用的字段
  },
  computed: {
    getwidth() {
      let width = this.headle.filter(item => item != "");
      return width.length == 3
        ? "240"
        : width.length == 2
        ? "200"
        : width.length == 1
        ? "100"
        : "300";
    },
    span() {
      //listarr是分配每行中的每个键值的数量，例：[[3,2,1],[0,0,1],[0,1,1]]
      let listarr = [];
      //当前计数的下标的数组
      let keyarr = [];
      let valuearr = [];
      this.DataList.forEach((item, index) => {
        listarr[index] = [];
        for (let i in item) {
          //第一次给两个数组赋值为全部元素等于0
          listarr[index][i] = 0;
          if (index == 0) {
            keyarr[i] = 0;
            valuearr[i] = item[i];
          }
          //把keyarr中每个元素的值与item比较，相同则listarr中的值+1，不相同则
          if (item[i] == valuearr[i]) {
            listarr[keyarr[i]][i]++;
          } else {
            //否则，valuearr[i]=i,keyarr[i]=index
            listarr[index][i] = 1;
            valuearr[i] = item[i];
            keyarr[i] = index;
          }
        }
      });
      return listarr;
    }
  },
  watch: {
    setselect(val) {
      this.isselect = val;
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("oneselect", val);
    },
    //相同的元素进行合并列
    objectSpanMethod({ row, column, rowIndex }) {
      if (column.property && row[column.property] && this.isSpan) {
        return {
          rowspan: this.span[rowIndex][column.property],
          colspan: 1
        };
      } else {
        return {
          rowspan: 1,
          colspan: 1
        };
      }
    },
    getrowstyle() {
      return "height:35px;";
    },
    //改变单元格样色
    getcellstyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == this.columnIndex) {
        switch (row[this.field]) {
          case this.truestatus:
            return "color:#67C23A;padding:0px;";
          case this.falsestatus:
            return "color:#F56C6C;padding:0px;";
          case this.progressstatus:
            return "color:#E6A23C;padding:0px;";
        }
      }
      return "padding:0px;";
    },
    //给表单的表头添加背景颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return `background: ${
          this.$store.state.tableColor
        };color:#fff;height:40px;padding:0px;`;
      } else {
        return "height:40px;padding:0px;";
      }
    },
    //把选择的行返回给父组件
    handleSelect(val) {
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
    //第四个按钮事件传递给父组件
    modify(item) {
      this.$emit("modify", item);
    },
    //第五个按钮事件传递给父组件
    start(item) {
      this.$emit("start", item);
    },
    rowClick(row, event, column) {
      this.$emit("checkline", [row, event, column]);
    },
    cellClick(row, column, cell, event) {
      if (this.iscellCilck && column.label == this.cellField) {
        this.$emit("cellCilck", row);
      }
    },
    dblclick(row, event) {
      this.$emit("dblclick", row);
    }
  }
};
</script>

<style lang="scss">
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
.el-table__body tr.current-row > td {
  background-color: rgb(252, 233, 199);
}

.el-table--striped .el-table__body tr.hover-row.el-table__row--striped > td,
.el-table__body tr.hover-row > td {
  background-color: #d9ecff !important;
}
// 全局设置
body .el-table td.gutter th.gutter {
  display: table-cell !important;
}
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 40px;
}
.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 40px;
}
</style>
