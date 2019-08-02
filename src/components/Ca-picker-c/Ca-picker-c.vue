// 选择审核人组件
<template>
  <div>
    <el-cascader
      expand-trigger="hover"
      :options="options"
      :props="props"
      v-model="selectedOptions2"
      @change="handleChange"
      filterable
      :show-all-levels="isshowall"
      style="width:100%;"
    >
    </el-cascader>
  </div>
</template>

<script>
import { apiLeaveData } from "@/request/api.js";
export default {
  name: "picker",
  data() {
    return {
      isshowall: false,
      options: [],
      selectedOptions2: [],
      props: {
        value: "id",
        label: "name",
        children: "children"
      }
    };
  },
  props: {
    selected: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    selected(newValue) {
      if (newValue == false) {
        this.selectedOptions2 = [];
      }
    }
  },
  mounted() {
    let newid = -1;
    apiLeaveData().then(res => {
      this.options = res.userListCheck.map(item => {
        if (!item.children.id) {
          item.children.map(item2 => {
            if (!item2.id) {
              item2.id = newid;
              newid--;
            }
          });
        }
        return item;
      });
    });
  },
  methods: {
    handleChange(e) {
      this.$emit("setApprover", e[2]);
    }
  }
};
</script>

<style lang="scss" scoped></style>
