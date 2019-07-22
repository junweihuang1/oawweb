<template>
  <div>
    <el-dialog
      title="职称权限树"
      :visible.sync="myPerTree"
      @close="closePerRole"
    >
      <el-tree
        :data="TreeList"
        show-checkbox
        node-key="id"
        ref="tree"
        :default-checked-keys="checkList"
        :props="defaultProps"
      >
      </el-tree>
      <template v-if="TreeList != ''">
        <el-button type="primary" @click="test">修改</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PermissionTree",
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name"
      },
      myPerTree: this.isPerTree
    };
  },
  props: {
    isPerTree: {
      type: Boolean,
      default: false
    },
    TreeList: {
      type: Array
    },
    checkList: {
      type: Array
    }
  },
  watch: {
    isPerTree(newValue) {
      this.myPerTree = newValue;
    }
  },
  methods: {
    test() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    closePerRole() {
      this.$emit("closePerRole", false);
    }
  }
};
</script>

<style scoped></style>
