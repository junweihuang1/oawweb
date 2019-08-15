<template>
  <el-col
    :span="3"
    style="border:1px solid #E4E7ED;background:#E4E7ED;"
    :style="{ height: winheight }"
  >
    <div class="menu">
      <i class="el-icon-document"></i>
      菜单
    </div>
    <el-tree
      :data="TreeList"
      @node-click="nodeClick"
      accordion
      :props="defaultProps"
      style="padding:5px;background:#E4E7ED;"
    ></el-tree>
  </el-col>
</template>

<script>
import { apiworkerUserTreeList } from "@/request/api";
export default {
  name: "tree",
  data() {
    return {
      winheight: document.documentElement.scrollHeight - 126 + "px",
      defaultProps: {
        label: "name",
        children: "children"
      },
      TreeList: []
    };
  },
  props: {
    centerName: String
  },
  mounted() {
    this.getTreeList();
  },
  methods: {
    getTreeList() {
      apiworkerUserTreeList({
        center_name: this.centerName
      }).then(res => {
        this.TreeList = res.data;
      });
    },
    nodeClick(data) {
      this.$emit("nodeClick", data);
    }
  }
};
</script>
<style lang="scss" scoped>
.menu {
  padding: 10px;
  border-bottom: 1px solid #e4e7ed;
  font-weight: 700;
}
</style>
