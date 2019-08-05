<template>
  <div>
    <el-form inline size="mini">
      <el-form-item></el-form-item>
    </el-form>
  </div>
</template>

<script>
import { apiQuantityRecord } from "@/request/api.js";
export default {
  name: "ContractRecord",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1
    };
  },
  props: {
    type: String,
    projectid: Number
  },
  mounted() {},
  methods: {
    getQuantityRecord() {
      let data = {
        project_id: this.projectid,
        type: this.type,
        construct_material_seriesName: "",
        construct_material_name: "",
        construct_material_model_name: "",
        pageSize: this.currentlimit,
        limit: this.currentpage
      };
      apiQuantityRecord(data).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
