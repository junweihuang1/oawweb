<template>
  <div>
    <el-dialog title="新增职位" :visible.sync="myNewRole" @close="closeNewRole">
      <el-row>
        <el-col :span="12">
          <div class="Tree-line">
            <div class="Tree-line-label">职位名称</div>
            <el-input
              placeholder="请输入名称（必填）"
              clearable
              v-model="roleName"
              class="Tree-line-input"
            />
          </div>
          <div class="Tree-line">
            <div class="Tree-line-label">状态</div>
            <el-radio-group v-model="state">
              <el-radio-button label="1">启用</el-radio-button>
              <el-radio-button label="2">停用</el-radio-button>
            </el-radio-group>
          </div>
          <div class="Tree-line">
            <div class="Tree-line-button">
              <el-button type="success" @click="getCheckedKeys">新增</el-button>
              <el-button type="danger">取消</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          职称权限树：
          <el-tree
            :data="TreeList"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-checked-keys="checkList"
            :props="defaultProps"
          >
          </el-tree>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { apisaveRole } from "@/request/api.js";
export default {
  name: "NewRole",
  props: {
    isNewRole: {
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
  data() {
    return {
      state: "1",
      roleName: "",
      myNewRole: this.isNewRole,
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  watch: {
    isNewRole(newValue) {
      this.myNewRole = newValue;
    }
  },
  methods: {
    getCheckedKeys() {
      let data = {
        roleName: this.roleName,
        state: this.state,
        nodes: this.$refs.tree.getCheckedKeys(),
        roleId: "",
        menuId: ""
      };
      console.log(data);
      // apisaveRole({
      //   roleName: this.roleName,
      //   state: this.state,
      //   nodes: this.$refs.tree.getCheckedKeys(),
      //   roleId: "",
      //   menuId: ""
      // })
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    closeNewRole() {
      this.$emit("myNewRole", false);
      this.myNewRole = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.Tree-line {
  padding: 10px;
  height: $common-main-height;
  line-height: $common-main-height;
  &-label {
    float: left;
    width: 100px;
    text-align: left;
  }
  &-input {
    float: left;
    width: 60%;
  }
  &-button {
    margin-left: 100px;
  }
}
</style>
