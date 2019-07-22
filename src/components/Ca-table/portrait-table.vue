<template>
  <div style="text-align:center;">
    <el-dialog :visible.sync="myopen" @close="closewin" width="40%">
      <h2>诚安时代绩效考核评定表</h2>
      <h3>{{ setDate }}</h3>
      <el-table :data="itemList">
        <el-table-column prop="name" width="180"></el-table-column>
        <el-table-column prop="value"> </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "portraitTable",
  data() {
    return {
      DataList: [],
      myopen: this.isopen
    };
  },
  props: {
    isopen: {
      type: Boolean,
      default: false
    },
    itemList: Array,
    setDate: String
  },
  watch: {
    isopen(val) {
      this.myopen = val;
    }
  },
  methods: {
    closewin() {
      this.$emit("closewin");
    }
  }
};
</script>

<style lang="scss" scoped></style>
