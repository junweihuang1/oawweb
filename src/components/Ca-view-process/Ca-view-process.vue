<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="myopen"
      @close="closeopen"
      width="35%"
    >
      <el-form ref="form" :model="setform" label-width="90px">
        <el-row>
          <template v-for="(item, index) in header">
            <el-col :span="index == header.length - 1 ? 24 : 12" :key="index">
              <el-form-item :label="item[0]" :key="index">
                <el-input
                  :value="setform[item[1]]"
                  :type="index == header.length - 1 ? 'textarea' : 'text'"
                  row="3"
                />
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>

      <h5>审批流程</h5>
      <el-table :data="Approvaltable" border="">
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
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CaViewProcess",
  data() {
    return {
      myopen: this.isopen
    };
  },
  props: {
    title: String,
    setform: Object,
    isopen: Boolean,
    header: Array,
    ApprovalHeaderList: Array,
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
    }
  }
};
</script>
<style lang="scss" scoped></style>
