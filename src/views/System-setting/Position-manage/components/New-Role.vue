<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="Tree-line">
          <div class="Tree-line-label">职位名称</div>
          <el-input
            placeholder="请输入名称（必填）"
            clearable
            v-model="activeform.role_name"
            class="Tree-line-input"
          />
        </div>
        <div class="Tree-line">
          <div class="Tree-line-label">状态</div>
          <el-radio-group v-model="activeform.state">
            <el-radio-button :label="1">启用</el-radio-button>
            <el-radio-button :label="2">停用</el-radio-button>
          </el-radio-group>
        </div>
        <div class="Tree-line">
          <div class="Tree-line-button">
            <el-button type="success" @click="getCheckedKeys">提交</el-button>
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
  </div>
</template>

<script>
import { apisaveRole } from "@/request/api.js";
export default {
  name: "NewRole",
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  props: {
    TreeList: {
      type: Array
    },
    checkList: {
      type: Array
    },
    activeform: Object,
    rule_name: {
      type: String,
      default: ""
    },
    openType: String
  },
  mounted(){
    console.log(this.checkList)
  },
  methods: {
    getCheckedKeys() {
      let data = {};
      if (this.openType == "add") {
        data = {
          roleName: this.activeform.role_name,
          state: this.activeform.state,
          nodes: this.$refs.tree.getCheckedKeys().join(","),
          roleId: "",
          menuId: ""
        };
      } else {
        data = {
          roleName: this.activeform.role_name,
          state: this.activeform.state,
          nodes: this.$refs.tree.getCheckedKeys().join(","),
          roleId: this.activeform.role_id,
          menuId: ""
        };
      }
      console.log(this.TreeList)
      console.log(data);
      this.$confirm(
        `确定要${this.openType == "add" ? "增加角色" : "修改角色"}吗？`
      )
        .then(() => {
          apisaveRole(data).then(res => {
            this.$message.success(res.msg);
            this.$emit("close");
            console.log(res);
          });
        })
        .catch(() => {});
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
