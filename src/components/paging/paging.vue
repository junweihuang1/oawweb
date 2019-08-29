// 分页组件
<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="[15, 30, 50, 100]"
      :page-size="currentlimit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "paging",
  props: {
    total: Number,
    currentlimit: Number,
    currentpage: Number
  },
  methods: {
    //页显示数量方法
    handleSizeChange(size) {
      this.$emit("setlimit", size);
    },
    handleCurrentChange(page) {
      this.$emit("setpage", page);
    }
  }
};
</script>

<style lang="scss"></style>
